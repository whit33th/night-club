"use client";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface ScrollingTextProps {
  text: string;
  speed?: number; // pixels per second
  mode?: "loop" | "pingpong"; // loop (circular) or forward/back (pingpong)
  className?: string;
  activateWidth?: number; // start animation only if text width exceeds container width (or this width if provided)
  gap?: number; // gap between duplicated texts for loop (px)
  pauseOnHover?: boolean;
  maxWidth?: number; // hard clip width (px)
  ellipsisWhenStatic?: boolean;
  reverseDelay?: number; // ms pause at each edge in pingpong mode
}

/**
 * ScrollingText: animates overflowing text horizontally.
 * - loop: continuous marquee (duplicated content)
 * - pingpong: back and forth inside container
 * Animation triggers only if actual text width > container width (or activateWidth if given).
 */
export function ScrollingText({
  text,
  speed = 50,
  mode = "pingpong",
  className,
  activateWidth,
  gap = 32,
  pauseOnHover = true,
  maxWidth,
  ellipsisWhenStatic = true,
  reverseDelay = 0,
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [cycleDuration, setCycleDuration] = useState(0); // seconds
  const [textWidth, setTextWidth] = useState(0);
  // Use paused only for pingpong mode (loop handled by pure CSS to avoid state-triggered rerenders on hover)
  const [paused, setPaused] = useState(false);
  const controls = useAnimation();

  // Measure widths
  const recalc = useCallback(() => {
    const container = containerRef.current;
    const span = textRef.current;
    if (!container || !span) return;
    const containerW = maxWidth ?? container.clientWidth;
    const textW = span.scrollWidth;
    setTextWidth(textW);
    const threshold = activateWidth ?? containerW;
    const willAnimate = textW > threshold;
    setShouldAnimate(willAnimate);
    if (willAnimate) {
      if (mode === "loop") {
        const dist = textW + gap; // travel full text plus gap
        setCycleDuration(dist / speed);
      } else {
        const dist = textW - containerW;
        setCycleDuration(dist / speed);
      }
    }
  }, [activateWidth, gap, mode, speed, maxWidth]);

  useLayoutEffect(() => {
    recalc();
  }, [recalc, text]);

  useEffect(() => {
    const handle = () => recalc();
    window.addEventListener("resize", handle);
    const ro = new ResizeObserver(handle);
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);
    return () => {
      window.removeEventListener("resize", handle);
      ro.disconnect();
    };
  }, [recalc]);

  // Start pingpong animation via framer-motion controls
  useEffect(() => {
    if (!shouldAnimate || mode !== "pingpong" || paused) {
      if (mode === "pingpong") controls.stop();
      return;
    }
    const container = containerRef.current;
    const span = textRef.current;
    if (!container || !span) return;
    const distance = span.scrollWidth - container.clientWidth;
    controls.start({
      x: [0, -distance],
      transition: {
        duration: cycleDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: reverseDelay / 1000,
      },
    });
  }, [shouldAnimate, mode, cycleDuration, controls, reverseDelay, paused]);

  const handleMouseEnter = useCallback(() => {
    if (!pauseOnHover) return;
    if (mode === "pingpong") setPaused(true);
  }, [pauseOnHover, mode]);
  const handleMouseLeave = useCallback(() => {
    if (!pauseOnHover) return;
    if (mode === "pingpong") setPaused(false);
  }, [pauseOnHover, mode]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden",
        maxWidth && "!w-full",
        className,
        pauseOnHover &&
          shouldAnimate &&
          mode === "loop" &&
          "[&:hover_.st-marquee]{animation-play-state:paused}",
        !shouldAnimate &&
          ellipsisWhenStatic &&
          "overflow-hidden text-ellipsis whitespace-nowrap",
      )}
      style={maxWidth ? { maxWidth } : undefined}
      title={text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mode === "loop" && shouldAnimate ? (
        <div
          className="st-marquee flex w-max flex-nowrap"
          style={{
            animationName: "st-marquee",
            animationDuration: `${cycleDuration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: "running",
            ["--marquee-distance" as string]: `${textWidth + gap}px`,
          }}
        >
          <span ref={textRef} style={{ marginRight: gap }}>
            {text}
          </span>
          <span style={{ marginRight: 0 }}>{text}</span>
        </div>
      ) : (
        <motion.span
          ref={textRef}
          animate={controls}
          className="block"
          style={{ willChange: shouldAnimate ? "transform" : undefined }}
        >
          {text}
        </motion.span>
      )}
      <style jsx>{`
        @keyframes st-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--marquee-distance)));
          }
        }
      `}</style>
    </div>
  );
}

export default memo(
  ScrollingText,
  (a, b) =>
    a.text === b.text &&
    a.speed === b.speed &&
    a.mode === b.mode &&
    a.activateWidth === b.activateWidth &&
    a.gap === b.gap &&
    a.pauseOnHover === b.pauseOnHover &&
    a.maxWidth === b.maxWidth &&
    a.ellipsisWhenStatic === b.ellipsisWhenStatic &&
    a.reverseDelay === b.reverseDelay &&
    a.className === b.className,
);

"use client";

import { useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverProps {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [
  React.RefObject<Element | null>,
  IntersectionObserverEntry | undefined,
  boolean
] {
  const elementRef = useRef<Element>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const [isVisible, setIsVisible] = useState(false);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return [elementRef, entry, isVisible];
}

/**
 * Hook to detect when an element enters the viewport
 */
export function useInView(options?: UseIntersectionObserverProps) {
  const [ref, entry, isVisible] = useIntersectionObserver(options);
  
  return {
    ref,
    inView: isVisible,
    entry,
  };
}

/**
 * Hook to detect when an element is near the viewport (for lazy loading)
 */
export function useLazyLoad(rootMargin = "200px") {
  return useInView({
    rootMargin,
    freezeOnceVisible: true,
  });
}

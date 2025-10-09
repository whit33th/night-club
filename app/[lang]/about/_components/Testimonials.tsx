"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Testimonial {
  company: string;
  logo: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

interface TestimonialReview {
  company: string;
  name: string;
  title: string;
  quote: string;
}

const testimonialImages = [
  {
    image: "/imgs/residents/1.webp",
    gradientFrom: "from-black/50",
    gradientTo: "to-rose-950",
  },
  {
    image: "/imgs/residents/2.webp",
    gradientFrom: "from-black/50",
    gradientTo: "to-red-950",
  },
  {
    image: "/imgs/residents/3.webp",
    gradientFrom: "from-black/50",
    gradientTo: "to-emerald-950",
  },
  {
    image: "/imgs/residents/4.webp",
    gradientFrom: "from-black/50",
    gradientTo: "to-cyan-950",
  },
];

export function TestimonialCarousel({
  reviews,
}: {
  reviews: TestimonialReview[];
}) {
  const testimonials: Testimonial[] = reviews.map((review, index) => ({
    ...review,
    logo: review.company.replace("@", ""),
    ...testimonialImages[index % testimonialImages.length],
  }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [cardWidth, setCardWidth] = useState(400);
  const [showArrows, setShowArrows] = useState(false);
  const [displayedCards, setDisplayedCards] = useState(testimonials);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 400;
        const maxCards = Math.floor(containerWidth / minCardWidth);
        const actualCardsPerView = Math.max(
          1,
          Math.min(maxCards, testimonials.length),
        );

        const actualCardWidth = containerWidth / actualCardsPerView;

        setCardsPerView(actualCardsPerView);
        setCardWidth(actualCardWidth);
        setShowArrows(testimonials.length > actualCardsPerView);
      }
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  const addMoreCards = () => {
    setDisplayedCards((prev) => [...prev, ...testimonials]);
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      if (carouselRef.current && !isAnimating) {
        setIsAnimating(true);
        const gapWidth = 2;
        const scrollPosition = index * (cardWidth + gapWidth);
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    },
    [cardWidth, isAnimating],
  );

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;

    const newIndex = currentIndex + 1;

    if (newIndex >= displayedCards.length - cardsPerView - 1) {
      addMoreCards();
    }

    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [
    displayedCards.length,
    cardsPerView,
    currentIndex,
    scrollToIndex,
    isAnimating,
  ]);

  const prevTestimonial = () => {
    if (isAnimating) return;

    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 4000);

    return () => clearInterval(autoScrollInterval);
  }, [
    currentIndex,
    displayedCards.length,
    cardWidth,
    nextTestimonial,
    isAnimating,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center"
    >
      {showArrows && (
        <>
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className={`absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 rounded-full bg-black/80 text-white transition-all duration-200 hover:scale-105 hover:bg-black ${
              isAnimating ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            <ChevronLeft className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className={`absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 rounded-full bg-black/80 text-white transition-all duration-200 hover:scale-105 hover:bg-black ${
              isAnimating ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            <ChevronRight className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
          </button>
        </>
      )}

      <div
        ref={carouselRef}
        className="scrollbar-hide h-full w-full overflow-x-hidden rounded-xl"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          width: `${Math.min(cardsPerView, testimonials.length) * cardWidth}px`,
        }}
      >
        <div
          className="grid h-full auto-rows-fr gap-[2px]"
          style={{
            width: `${displayedCards.length * cardWidth + (displayedCards.length - 1) * 2}px`,
            gridTemplateColumns: `repeat(${displayedCards.length}, ${cardWidth}px)`,
          }}
        >
          {displayedCards.map((testimonial, index) => (
            <div
              key={`${index}-${testimonial.name}`}
              className="flex flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <div
                className={`h-full w-full bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} relative grid grid-rows-[auto_auto_1fr] overflow-hidden`}
              >
                <div className="absolute inset-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="backdrop-invert-1 absolute w-full"
                      style={{
                        height: "1px",
                        top: `${i * 50 + 20}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="z-10 flex items-center justify-between p-4">
                  <div className="text-lg font-bold text-white">
                    {testimonial.company}
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <span>5.0</span>

                    <div className="*:h-4.5 *:w-4.5 flex *:fill-current">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="z-10 flex items-center justify-center border-y border-black py-4">
                  <div className="h-50 w-50 overflow-hidden rounded-full border border-white/5 lg:h-36 lg:w-36">
                    <Image
                      width={150}
                      height={150}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="z-10 flex items-center p-6">
                  <blockquote className="text-2xl font-medium leading-relaxed text-white">
                    {`"${testimonial.quote}"`}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  /** 動畫類型：fade-up（淡入上移）、fade-in（淡入） */
  animation?: "fade-up" | "fade-in";
  /** 延遲毫秒，可做 stagger 效果 */
  delay?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${animation} ${isVisible ? "animate-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

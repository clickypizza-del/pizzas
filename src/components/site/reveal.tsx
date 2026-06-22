"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Declarative scroll-reveal wrapper built on Framer Motion's `whileInView`.
 * Replaces the old IntersectionObserver + .fade-in CSS approach with a single
 * component that supports staggered children via `delay`.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: "div" | "section" | "li" | "article";
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

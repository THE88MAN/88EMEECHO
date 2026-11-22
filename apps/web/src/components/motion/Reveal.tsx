"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutSoft, fadeUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : as === "li"
          ? motion.li
          : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={{ ...easeOutSoft, delay }}
    >
      {children}
    </MotionTag>
  );
}

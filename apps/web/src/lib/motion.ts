"use client";

import type { Transition, Variants } from "framer-motion";

export const easeOutSoft: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const goldLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

export const revealImage: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

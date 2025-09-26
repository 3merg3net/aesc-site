// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn = "class name"
 * merges Tailwind classes intelligently so later classes win.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

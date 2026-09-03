import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberID(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatPercent(num: number): string {
  return `${Math.round(num)}%`;
}

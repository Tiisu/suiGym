import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatWeight(grams: number): string {
  const kg = grams / 1000
  return `${kg.toFixed(1)} kg`
}

export function getDaysSince(timestamp: number): number {
  const now = Date.now()
  const dayInMs = 24 * 60 * 60 * 1000
  return Math.floor((now - timestamp) / dayInMs)
}
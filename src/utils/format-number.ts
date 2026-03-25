/**
 * Format a number using Vietnamese locale (period as thousands separator).
 * Examples: 1000 → "1.000", 25 → "25", 1500000 → "1.500.000"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("vi-VN");
}

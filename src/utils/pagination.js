/**
 * Returns an array of page numbers to display with ellipsis.
 * @param {number} current - Current active page (1-indexed)
 * @param {number} total - Total number of pages
 * @param {number} maxVisible - Maximum number of page buttons to show (default: 5)
 * @returns {Array<number|string>} Array of numbers and '…' for ellipsis
 */
export const getVisiblePages = (current, total, maxVisible = 5) => {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, current + half);

  // Adjust if near the edges
  if (start === 1) {
    end = Math.min(total, maxVisible);
  } else if (end === total) {
    start = Math.max(1, total - maxVisible + 1);
  }

  const pages = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("…");
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total) {
    if (end < total - 1) pages.push("…");
    pages.push(total);
  }
  return pages;
};

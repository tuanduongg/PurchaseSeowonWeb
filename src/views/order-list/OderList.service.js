// const currentYear = new Date().getFullYear();
export const LIST_DAY = Array.from({ length: 31 }, (_, i) => i + 1);
export const LIST_MONTH = Array.from({ length: 12 }, (_, i) => i + 1);
// export const LIST_YEAR = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 });
const now = new Date().getUTCFullYear();
export const LIST_YEAR = Array(now - (now - 5))
  .fill('')
  .map((v, idx) => now - idx);

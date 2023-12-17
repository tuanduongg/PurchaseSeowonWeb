export const formattingVND = (num) => {
  return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace('VND', 'đ');
};

export const truncateText = (str, n) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

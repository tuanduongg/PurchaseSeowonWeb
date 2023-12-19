export const formattingVND = (num) => {
  return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace('VND', 'đ');
};

export const truncateText = (str, n) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

export const cssScrollBar = {
  '&::-webkit-scrollbar': {
    width: '2px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(52, 49, 76, 1)'
  }
};

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1366px)`).matches;
  }
  return false;
}

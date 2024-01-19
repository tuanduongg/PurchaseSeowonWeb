import { ConfigPath } from 'routes/DefinePath';
import config from '../config';
function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
export const formattingVND = (num) => {
  if (isString(num) && num?.includes('.')) {
    const rs = num + ' vnđ';
    return rs.replace(',', '.');
  }
  const number = parseFloat(num);
  console.log('number', number);
  if (isNaN(number)) {
    return 0 + ' vnđ';
  }
  return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace('VND', 'vnđ');
};

export const formattingVNDInput = (num) => {
  const number = parseFloat(num);
  return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace('VND', '');
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

export function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
export function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const delete_cookie = (name) => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const logout = () => {
  let assToken = getCookie(config.ASSET_TOKEN);
  localStorage.removeItem(config.DATA_USER);
  delete_cookie(config.ASSET_TOKEN);
};

export const getTotalPrice = (quantity, unitCost) => {
  if (isString(quantity) && quantity?.includes('.')) {
    quantity = quantity.replace('.', '');
  }
  if (isString(unitCost) && unitCost?.includes('.')) {
    unitCost = unitCost.replace('.', '');
  }
  const inQuan = parseFloat(quantity);
  const numCost = parseFloat(unitCost);
  return inQuan * numCost;
};
export const getSubTotal = (products = []) => {
  let sub = 0;
  products.map((item) => {
    sub += item?.price * item?.quantity;
  });
  return sub;
};
// export const getTotal = (products = []) => {
//   let sub = 0;
//   products.map((item) => {
//     sub += item?.price * item?.quantity;
//   });
//   return sub;
// };
export const OrderStatus = {
  NEW: 'NEW',
  STEP_ONE: 'STEP_ONE',
  STEP_TWO: 'STEP_TWO',
  STEP_THREE: 'STEP_THREE',
  DONE: 'DONE'
};

export const formatDateFromDB = (dateStr) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minus = date.getMinutes();

    return `${hour < 10 ? '0' + hour : hour}:${minus < 10 ? '0' + minus : minus} ${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  }
  return '';
};

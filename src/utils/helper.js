import { ConfigPath } from 'routes/DefinePath';
import config from '../config';
import { ShowQuestion } from './confirm';
import Logo from '../assets/images/logo/logo.png';
function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
export const formattingVND = (num) => {
  if (isString(num) && num?.includes('.')) {
    const rs = num + ' vnđ';
    return rs.replace(',', '.');
  }
  const number = parseFloat(num);
  if (isNaN(number)) {
    return 0 + ' vnđ';
  }
  let result = number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  return isMobile() ? result.replace('VND', 'đ') : result.replace('VND', 'vnđ');
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
    width: '1px'
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
  localStorage.removeItem(config.DATA_USER);
  localStorage.removeItem('CART');
  localStorage.removeItem(config.CUSTOMTHEME);
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

export const handleLogout = async () => {
  ShowQuestion({
    icon: 'warning',
    content: 'Do you want to logout?',
    titleProp: 'LOGOUT',
    onClickYes: async () => {
      await logout();
      window.location = ConfigPath.home;
    }
  });
};

export const checkIsApprover = () => {
  const dataStr = localStorage.getItem(config.DATA_USER);
  if (dataStr) {
    const dataObj = JSON.parse(dataStr);
    if (dataObj?.isApprover) {
      return true;
    }
  }
  return false;
};

export const hiddenRouteUser = [ConfigPath.userPage, ConfigPath.productPage];

export const isExcelFile = (file) => {
  // Get the MIME type of the file
  const fileType = file.type;

  // Check if the MIME type corresponds to Excel files
  return fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
};

export const stickyColumn = {
  position: 'sticky',
  left: 0,
  background: 'white',
  zIndex: 10
  // boxShadow: "5px 2px 5px grey",
  // borderRight: "2px solid black"
};

export const printPageArea = (order) => {
  if (!order) return;
  const orderDetail = order?.orderDetail;
  let html = ``;
  if (orderDetail?.length > 0) {
    orderDetail.map((item, index) => {
      html += `<tr>
      <td class="text-center" >${index + 1}</td>
      <td class="text-start">
      ${item?.product?.productName}
      </td>
      <td  class="text-end">${formattingVNDInput(item?.price)}</td>
      <td  class="text-center">${item?.quantity}</td>
      <td class="fw-bold text-end">${formattingVNDInput(getTotalPrice(item?.quantity, item?.price))}</td>
  </tr>`;
    });
  }
  // You can customize this function to generate and format your invoice
  const invoiceContent = `<table>
  <thead>
      <tr>
          <th width="100%" colspan="4">
              <h3 class="text-start">
                  <img src="${Logo}" height="70px" alt="" sizes="" srcset="">
              </h3>
          </th>
      </tr>
      <tr>
          <th width="100%" colspan="4">
              <h2 class="text-center">HOÁ ĐƠN MUA HÀNG</h2>
          </th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>Số hoá đơn: ${order?.code}</td>
      </tr>
      <tr>
          <td>Thời gian: ${formatDateFromDB(order?.created_at)}</td>
      </tr>
      <tr>
          <td>Họ và tên: ${order?.reciever}</td>
      </tr>
      <tr>
          <td>Bộ phận: ${order?.address}</td>
      </tr>
      <tr>
          <td>Ghi chú: ${order?.note}</td>
      </tr>
      <tr>
          <td></td>
      </tr>
  </tbody>
</table>

<table>
  <thead class="dotted-line-bottom dotted-line-top">
      <tr>
          <th class="text-center">STT</th>
          <th class="text-start">Tên sản phẩm</th>
          <th class="text-end">Giá</th>
          <th class="text-center">Số lượng</th>
          <th class="text-end">Thành tiền</th>
      </tr>
  </thead>
  <tbody class="">
  ${html}
      <tr class="dotted-line-top">
          <td colspan="5" class="total-heading text-end">Tổng tiền : ${formattingVND(order?.total)}</td>
      </tr>
  </tbody>
</table>
<br>
<table>
  <thead>
      <tr>
          <th class="text-center">Người mua</th>
          <th class="text-center">Người giao</th>
          <th class="text-center">Người duyệt</th>
      </tr>
  </thead>
</table>
</table>
`;

  // Open a new window and print the invoice
  const printWindow = window.open('', '_blank');

  // Include a style tag for print-specific styles
  printWindow.document.write(`
<html>
  <head>
    <title>Invoice</title>
    <style>
      @media print {
        @page {
          size: a4;
          margin: 0mm;
        }
        body {
          margin: 0;
          font-family: sans-serif;
        }
        h1,h2,h3,h4,h5,h6,p,span,label {
            font-family: sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0px !important;
        }
        table thead th {
            height: 28px;
            text-align: left;
            font-size: 16px;
            font-family: sans-serif;
        }
        table, th, td {
            padding: 8px;
            font-size: 14px;
        }
  
        .heading {
            font-size: 24px;
            margin-top: 12px;
            margin-bottom: 12px;
            font-family: sans-serif;
        }
        .small-heading {
            font-size: 18px;
            font-family: sans-serif;
        }
        .total-heading {
            font-size: 18px;
            font-weight: 700;
            font-family: sans-serif;
        }
        .text-start {
            text-align: left;
        }
        .text-end {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .company-data span {
            margin-bottom: 4px;
            display: inline-block;
            font-family: sans-serif;
            font-size: 14px;
            font-weight: 400;
        }
        .no-border {
            border: 1px solid #fff !important;
        }
        .bg-blue {
            background-color: #fff;
            color: #fff;
        }
        .dotted-line-bottom {
          border-bottom: 0.5px dotted #333; /* Adjust the width and color as needed */
      }
        .dotted-line-top {
          border-top: 0.5px dotted #333; /* Adjust the width and color as needed */
      }
      }
    </style>
  </head>
  <body>
`);

  printWindow.document.write('<pre>' + invoiceContent + '</pre>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};

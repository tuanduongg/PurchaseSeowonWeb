// project imports
import theme from 'themes';
import config from '../config';

// action - state management
import * as actionTypes from './actions';
let themeObj = {};
const themeStr = localStorage.getItem(config.CUSTOMTHEME);
if (themeStr) {
  themeObj = JSON.parse(themeStr);
}
export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: themeObj?.fontFamily ?? config.fontFamily,
  borderRadius: themeObj?.borderRadius ?? config.borderRadius,
  opened: true,
  isLogin: false,
  cart: [],
  afterSave: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      localStorage.setItem(
        config.CUSTOMTHEME,
        JSON.stringify({
          fontFamily: action.fontFamily,
          borderRadius: state.borderRadius
        })
      );
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      localStorage.setItem(
        config.CUSTOMTHEME,
        JSON.stringify({
          fontFamily: state.fontFamily,
          borderRadius: action.borderRadius
        })
      );
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    case actionTypes.CHECK_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      };
    case actionTypes.CART:
      return {
        ...state,
        cart: action.cart
      };
    case actionTypes.AFTER_SAVE:
      return {
        ...state,
        afterSave: action.afterSave
      };
    case actionTypes.UPDATE_CART_ITEM: {
      const product = action.product;
      if (product) {
        //nếu mà có product
        const index = state.cart.findIndex((it) => it.productID === product.productID);
        if (index !== -1) {
          // neeus co product -> tăng số lượng lênnn
          const cartArr = [...state.cart];
          cartArr[index].quantity = parseInt(cartArr[index].quantity) + parseInt(product.quantity);
          localStorage.setItem('CART', JSON.stringify(cartArr));
          return { ...state, cart: cartArr };
        } else {
          const cartNew = [...state.cart, product];
          localStorage.setItem('CART', JSON.stringify(cartNew));
          return { ...state, cart: cartNew };
        }
      }
      break;
    }

    default:
      return state;
  }
};

export default customizationReducer;

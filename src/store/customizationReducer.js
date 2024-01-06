// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  isLogin: false,
  cart: []
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
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
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
    case actionTypes.UPDATE_CART_ITEM: {
      const product = action.product;
      if (product) {
        //nếu mà có product
        const index = state.cart.findIndex((it) => it.productID === product.productID);
        if (index !== -1) {
          // neeus co product -> tăng số lượng lênnn
          const cartArr = [...state.cart];
          cartArr[index].quantity += product.quantity;
          localStorage.setItem('CART',JSON.stringify(cartArr));
          return { ...state, cart: cartArr };
        } else {
          const cartNew = [...state.cart, product];
          localStorage.setItem('CART',JSON.stringify(cartNew));
          return { ...state, cart: cartNew };
        }
      }
      break;
    }
    // return {
    //   ...state,
    //   cart: action.cart
    // };
    default:
      return state;
  }
};

export default customizationReducer;

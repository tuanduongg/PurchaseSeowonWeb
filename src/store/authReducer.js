// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  dataUser: {},
  isLogin: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.CHECK_LOGIN:
    //   return {
    //     ...state,
    //     dataUser: action.dataUser
    //   };
    // case actionTypes.DATA_USER:
    //   return {
    //     ...state,
    //     isLogin: action.isLogin
    //   };
    default:
      return state;
  }
};

export default authReducer;

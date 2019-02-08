import {
    USER_PAGE_LOADED,
    USER_PAGE_UNLOADED
  } from '../constants/actionTypes';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case USER_PAGE_LOADED:
        return {
          ...state,
          user: action.payload[0].users[0],
          currentPage: 0
        };
      case USER_PAGE_UNLOADED:
        return {};
      default:
        return state;
    }
  };
import {
    CHAT_LOADED,
    CHAT_UNLOADED
  } from '../constants/actionTypes';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case CHAT_LOADED:
        return {
          ...state,
          messages: action.payload[0].messages
        };
      case CHAT_UNLOADED:
        return {};
      default:
        return state;
    }
  };
  
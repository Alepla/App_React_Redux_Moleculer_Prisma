import {
    USER_PAGE_LOADED,
    USER_PAGE_UNLOADED,
    CREATE_REQUEST
  } from '../constants/actionTypes';
  import { toast } from "react-toastify";
  
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
      case CREATE_REQUEST:
        toast.success("✔ Success the request has sended correctly!");
      default:
        return state;
    }
  };
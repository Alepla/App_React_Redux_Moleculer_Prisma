import { NOTIFICATIONS_PAGE_LOADED  } from '../constants/actionTypes';
//import { toast } from "react-toastify";

export default (state = {}, action) => {
    switch (action.type) {
        case NOTIFICATIONS_PAGE_LOADED:
            return {
                ...state,
                notifications: action.payload[0].requestses
            }
        default:
            return state;
    }
};
  
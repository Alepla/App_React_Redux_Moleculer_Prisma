import { UPDATE_FIELD_LOGIN, REGISTER, LOGIN, UPDATE_FIELD_LOADING, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';
//import { toast } from "react-toastify";

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
                errors: action.error ? action.payload.errors : null
            }
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                loading: true,
                errors: action.error ? action.payload.errors : null
            };
        case UPDATE_FIELD_LOGIN:
            return { ...state, [action.key]: action.value };
        case UPDATE_FIELD_LOADING:
            return { ...state, loading: false};
        case LOGIN_PAGE_UNLOADED:
            break;
        default:
            return state;
    }
};
  
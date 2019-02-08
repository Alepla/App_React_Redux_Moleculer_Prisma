import { UPDATE_FIELD_CONTACT, SEND_EMAIL, UPDATE_FIELD_LOADING } from '../constants/actionTypes';
import { toast } from "react-toastify";

export default (state = {}, action) => {
    switch (action.type) {
        case SEND_EMAIL:
            if(action.payload === null) {
                toast.success("✔ Success youre message was sent correctly");
                return {
                    ...state,
                    button: true,
                    loading: true
                };
            }else{
                toast.error(" Something wrong was happened, try latter");
                return {
                    ...state,
                    button: false,
                    errors: action.error ? action.payload.errors : null,
                    loading: true
                };
            }
        case UPDATE_FIELD_CONTACT:
            return { ...state, [action.key]: action.value };
        case UPDATE_FIELD_LOADING:
            return { ...state, loading: false};
        default:
            return state;
    }
};
  
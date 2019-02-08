import { FIND_USERS } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FIND_USERS:
      return {
        ...state,
        users: action.payload.users
      };
    default:
      return state;
  }
};

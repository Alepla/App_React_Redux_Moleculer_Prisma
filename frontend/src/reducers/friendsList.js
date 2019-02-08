import { 
  USER_PAGE_LOADED,
  USER_PAGE_UNLOADED,
  SET_PAGE_LIST_FRIENDS,
  APPLY_FILTROS
} from '../constants/actionTypes';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case USER_PAGE_LOADED:
        return {
          ...state,
          friendsList: action.payload[0].users[0].friends,
          friendsCount: action.payload[1].users[0].friends.length,
          filtros: "",
          currentPage: 0
        };
      case SET_PAGE_LIST_FRIENDS:
        return {
          ...state,
          friendsList: action.payload.users[0].friends,
          filtros: action.filtros,
          currentPage: action.page
        };
      case APPLY_FILTROS:
          return {
            ...state,
            user: action.payload[0].users[0],
            friendsList: action.payload[0].users[0].friends,
            friendsCount: action.payload[1].users[0].friends.length,
            filtros: action.filtros,
            currentPage: 0
          }
      case USER_PAGE_UNLOADED:
      default:
        return state;
    }
  };
  
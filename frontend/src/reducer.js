import { combineReducers } from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import contact from './reducers/contact';
import friendsList from './reducers/friendsList';
import user from './reducers/user';
import findUsers from './reducers/findUsers';
import login from './reducers/login';
import chat from './reducers/chat';
import notifications from './reducers/notifications';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  common,
  home,
  settings,
  contact,
  friendsList,
  user,
  findUsers,
  login,
  chat,
  notifications,
  router: routerReducer
});

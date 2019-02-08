import article from './reducers/article';
import articleList from './reducers/articleList';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import contact from './reducers/contact';
import friendsList from './reducers/friendsList';
import user from './reducers/user';
import findUsers from './reducers/findUsers';
import login from './reducers/login';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  articleList,
  common,
  editor,
  home,
  profile,
  settings,
  contact,
  friendsList,
  user,
  findUsers,
  login,
  router: routerReducer
});

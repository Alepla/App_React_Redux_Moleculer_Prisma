import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, CHECKOUT_NOTIFICATIONS } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Settings from '../components/Settings';
import Contact from '../components/Contact';
import User from '../components/User';
import Login from '../components/Login/index';
import Chat from '../components/Chat/index';
import Notifications from '../components/Notifications/index';
import { store } from '../store';
import { push } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    notificationsCount: state.common.notificationsCount
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => 
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onReciveCurrentUser: (username) => 
    dispatch({ type: CHECKOUT_NOTIFICATIONS, payload: agent.Users.countNotifications(username) })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            notificationsCount={this.props.notificationsCount}
            currentUser={this.props.currentUser}
          />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/settings" component={Settings} />
            <Route path="/Chat" component={Chat} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/@:username" component={User} />
            <Route path="/user/:username" component={User} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          notificationsCount={this.props.notificationsCount}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);

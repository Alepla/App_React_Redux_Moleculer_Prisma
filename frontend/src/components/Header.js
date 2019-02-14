import React from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { Icon, Button, Label } from 'semantic-ui-react'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <SearchComponent />
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/notifications">
            <Button as='div' labelPosition='right'>
              <Button icon>
                <Icon name='envelope' size='large' />
              </Button>
              <Label basic pointing='left'>
                {props.notificationsCount.count}
              </Label>
            </Button>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} notificationsCount={this.props.notificationsCount} />

          <LoggedInView currentUser={this.props.currentUser} notificationsCount={this.props.notificationsCount} />
        </div>
      </nav>
    );
  }
}

export default Header;

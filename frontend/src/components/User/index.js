import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED, APPLY_FILTROS } from '../../constants/actionTypes';
import ProfileFriendsList from './ProfileFriendsList';
import { Link } from 'react-router-dom';
import Filtros from './Filtros';
import ButtonAddFriend from './buttonAddFriend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => ({
  ...state.user,
  ...state.friendsList,
  ...state.friendsCount,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED }),
  onClickFiltro: (payload, filtros) =>
    dispatch({ type: APPLY_FILTROS, payload, filtros, })
});

class User extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Users.findOne(this.props.match.params.username, 3, 0, {}),
      agent.Users.findAllFirends(this.props.match.params.username, {})
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.match.params.username}`}>
            My Friends
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    if(this.props.user.username !== this.props.match.params.username) window.location.reload();

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={this.props.user.image} className="user-img" alt={this.props.user.username} />
                <h4>{this.props.user.username}</h4>
                <p>{this.props.user.bio}</p>
                <ButtonAddFriend userApplicant={this.props.currentUser.username} userRequested={this.props.user.username} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <Filtros
                onClickFiltro={this.props.onClickFiltro}
                username={this.props.match.params.username} />

              <ProfileFriendsList 
                friends={this.props.friendsList}
                friendsCount={this.props.friendsCount}
                currentPage={this.props.currentPage}
                username={this.props.match.params.username}
                filtros={this.props.filtros}
              />
              <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

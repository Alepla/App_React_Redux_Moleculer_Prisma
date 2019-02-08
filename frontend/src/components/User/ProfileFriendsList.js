import React from 'react';
import { Link } from 'react-router-dom';
import ListPagination from './ListPagination';

const ProfileFriendsList = props => {

    let styles = {
      marginTop: "40px",
      borderRadius: "100px",
      width: "120px",
      display: "block"
    }

    if (!props.friends) {
      return (
        <div className="friends-preview">Loading...</div>
      );
    }

    if (props.friends.length === 0) {
      return (
        <div className="friends-preview">
          No one here...
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          {
            props.friends.map((x, i) => {
              return ( 
                  <div className="col-lg-4" key={i} onClick={this.seeDetails}>
                    <Link to={`/user/${x.username}`} className="preview-link">
                      <img src={x.image} style={styles} alt={x.name}/>
                      <h2 className="text-muted">{x.name + " " + x.lastName}</h2>
                      <p>{x.bio}</p>
                    </Link>
                  </div>
              );
            })
          }
        </div>
        <div className="row">
          <ListPagination 
            friendsCount={props.friendsCount}
            currentPage={props.currentPage}
            username={props.username}
            filtros={props.filtros}  />
        </div>
      </div>
    );
  }

  export default ProfileFriendsList;

import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { SET_PAGE_LIST_FRIENDS } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload, filtros) =>
    dispatch({ type: SET_PAGE_LIST_FRIENDS, page, payload, filtros })
});

const ListPagination = props => {
  if (props.friendsCount <= 1) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.friendsCount / 3); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.filtros) props.onSetPage(page, agent.Users.findOne(props.username, 3, 3*(page), props.filtros), props.filtros);
    else props.onSetPage(page, agent.Users.findOne(props.username, 3, 3*(page), {}));
  };

  let styles = {
    marginTop: "40px",
    top: "40px"
  }

  return (
    <nav style={styles}>
      <ul className="pagination pagination-lg">

        { 
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);

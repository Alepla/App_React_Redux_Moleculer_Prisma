import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CREATE_REQUEST } from '../../constants/actionTypes';
import { Button } from 'semantic-ui-react';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  createRequest: (userApplicant, userRequested) => 
    dispatch({ type: CREATE_REQUEST, payload: agent.Users.createRequest(userApplicant, userRequested) })
});

class ButtonAddFriend extends React.Component {

    onHandleClick(userApplicant, userRequested) {
        this.props.createRequest(userApplicant, userRequested)
    }

    render() {
        if(this.props.userApplicant === this.props.userRequested) {
            return null;
        }

        return (
            <Button type="button" color="blue" onClick={() => this.onHandleClick(this.props.userApplicant, this.props.userRequested)}>Add</Button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddFriend);

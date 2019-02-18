import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/*import { ToastContainer } from 'react-toastify'; */
import { NOTIFICATIONS_PAGE_LOADED, ON_REFUSE_USER, ON_ACCEPT_USER } from '../../constants/actionTypes';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Icon, Button } from 'semantic-ui-react';

const mapStateToProps = state => ({
    ...state.notifications,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: NOTIFICATIONS_PAGE_LOADED, payload }),
    onRefuse: (id) =>
        dispatch({ type: ON_REFUSE_USER, payload: agent.Users.refuseUser(id) }),
    onAccept: (idRequest, idUserApplicant, idUserRequested) => 
        dispatch({ type: ON_ACCEPT_USER, payload: agent.Users.acceptUser(idRequest, idUserApplicant, idUserRequested) })
}); 

class Notifications extends React.Component {

    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Users.findRequests(this.props.currentUser.username)
        ]))
    }

    accept = (idRequest, idUserApplicant, idUserRequested) => e => {
        e.preventDefault();
        console.log(idRequest, idUserApplicant, idUserRequested);
        this.props.onAccept(idRequest, idUserApplicant, idUserRequested);
    }

    refuse = (id) => e => {
        e.preventDefault();
        this.props.onRefuse(id);
    }

    render() {
        let styles = {
            marginTop: "40px",
            borderRadius: "100px",
            width: "120px",
            display: "block"
        }      
        if(!this.props.notifications) return <h2>Loading...</h2>;

        if(this.props.notifications) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                        <div>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='users' circular />
                                <Header.Content>Notifications</Header.Content>
                            </Header>
                        </div>
                            {
                                this.props.notifications.map((x, i) => {
                                    return(
                                        <div className="col-lg-4" key={i}>
                                            <Link to={`/user/${x.userApplicant.username}`} className="preview-link">
                                                <img src={x.userApplicant.image} style={styles} alt={x.userApplicant.name}/>
                                                <h2 className="text-muted">{x.userApplicant.name + " " + x.userApplicant.lastName}</h2>
                                                <p>{x.userApplicant.bio}</p>
                                            </Link>
                                            <div>
                                                <Button primary onClick={this.accept(x.id, x.userApplicant.id, this.props.currentUser.id)}>Accept</Button>
                                                <Button secondary onClick={this.refuse(x.id)}>Refuse</Button>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

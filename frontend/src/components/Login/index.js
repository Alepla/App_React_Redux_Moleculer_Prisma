import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Form, Button, Divider, Segment, Header } from 'semantic-ui-react';
import { UPDATE_FIELD_LOGIN, REGISTER, LOGIN, UPDATE_FIELD_LOADING, LOGIN_PAGE_UNLOADED } from '../../constants/actionTypes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => ({ ...state.login });

const mapDispatchToProps = dispatch => ({
    onChangeUserName: value => 
        dispatch({ type: UPDATE_FIELD_LOGIN, key: 'username', value }),
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_LOGIN, key: 'email', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_LOGIN, key: 'password', value }),
    onChangeLoadingState: value => 
        dispatch({type: UPDATE_FIELD_LOADING, value}),
    onLogin: (email, password) =>
        dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    onCreateUser: (username, email, password) => 
        dispatch({ type: REGISTER, payload: agent.Auth.create(username, email, password) }),
    onUnload: () =>
        dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            loading: false
        }
        const RegExpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const RegExpText = /^[0-9A-Za-z]{3,22}$/;
        const RegExpPass = /^[0-9A-Za-z]{6,32}$/;

        this.changeUserName = e => {
            this.props.onChangeUserName(e.target.value);
            if(RegExpText.test(e.target.value) && e.target.value !== undefined) {
                document.getElementById("form-input-control-username").setAttribute("style", "");
                document.getElementById("usernameError").innerHTML = "";
            }
        }

        this.ChangeEmail = e => {
            this.props.onChangeEmail(e.target.value);
            if(RegExpEmail.test(e.target.value) && e.target.value !== undefined) {
                document.getElementById("form-input-control-email").setAttribute("style", "");
                document.getElementById("emailError").innerHTML = "";
            }
        }

        this.ChangePassword = e => {
            this.props.onChangePassword(e.target.value);
            if(RegExpPass.test(e.target.value) && e.target.value !== undefined) {
                document.getElementById("form-input-control-pass").setAttribute("style", "");
                document.getElementById("passError").innerHTML = "";
            }
        }

        this.login = (email, password) => e => {
            e.preventDefault();
            if(!RegExpEmail.test(email) || email === undefined || !RegExpPass.test(password) || password === undefined) {

                if(!RegExpEmail.test(email) || email === undefined) {
                    document.getElementById("form-input-control-email").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("emailError").innerHTML = "<p style='color: #F44444; float:left;'> Email is invalid<p>";
                }

                if(!RegExpPass.test(password) | password === undefined) {
                    document.getElementById("form-input-control-pass").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("passError").innerHTML = "<p style='color: #F44444; float:left;'> Password is invalid<p>";
                }

                return;
            }
            this.setState({loading: true});
            this.props.onLogin(email, password);
        }

        this.createUser = (username, email, password) => e => {
            e.preventDefault();
            if(!RegExpText.test(username) || username === undefined || !RegExpEmail.test(email) || email === undefined || !RegExpPass.test(password) || password === undefined) {
                if(!RegExpText.test(username) || username === undefined) {
                    document.getElementById("form-input-control-username").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("usernameError").innerHTML = "<p style='color: #F44444; float:left;'> Username is invalid<p>";
                }

                if(!RegExpEmail.test(email) || email === undefined) {
                    document.getElementById("form-input-control-email").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("emailError").innerHTML = "<p style='color: #F44444; float:left;'> Email is invalid<p>";
                }

                if(!RegExpPass.test(password) | password === undefined) {
                    document.getElementById("form-input-control-pass").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("passError").innerHTML = "<p style='color: #F44444; float:left;'> Password is invalid<p>";
                }

                return;
            }
            this.setState({loading: true});
            this.props.onCreateUser(username, email, password);
        }
    }

    componentDidUpdate() {
        if(this.props.loading === true) {
            this.setState({loading: false});
            this.props.onChangeLoadingState(false);
        }   
    }
  
    render() {
        const username = this.props.username;
        const email = this.props.email;
        const password = this.props.password;
        const { login } = this.state
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <Header as='h2' textAlign='center'>
                        { login ? 'Login' : 'Sign Up' }
                    </Header>
                    <Segment basic textAlign='center'>
                        <Form onSubmit={ login? this.login(email, password): this.createUser(username, email, password) } loading={this.state.loading}>

                            <ListErrors errors={this.props.errors} />

                            {!login && (
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    id='form-input-control-username'
                                    value={username || ''}
                                    onChange={this.changeUserName}
                                    type="text"
                                    placeholder="Your username"
                                />
                                <span id='usernameError'></span>
                            </Form.Field>
                            )}
                            <Form.Field>
                                <label>Email</label>
                                <input
                                    id='form-input-control-email'
                                    value={email || ''}
                                    onChange={this.ChangeEmail}
                                    type="email"
                                    placeholder="Your email address"
                                />
                                <span id='emailError'></span>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input
                                    id='form-input-control-pass'
                                    value={password || ''}
                                    onChange={this.ChangePassword}
                                    type="password"
                                    placeholder="Choose a safe password"
                                />
                                <span id='passError'></span>
                            </Form.Field>
                            <br />
                            <Button content={login ? 'Login' : 'Create account'} icon='signup' size='big' />

                            <Divider horizontal>Or</Divider>
                            
                            <Button color='teal' content={login? 'Need to create an account?' : 'Already have an account?'} 
                                icon='add' labelPosition='left' onClick={(e) => { this.setState({ login: !login }), e.preventDefault() }} />
                        </Form>
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
                    </Segment>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

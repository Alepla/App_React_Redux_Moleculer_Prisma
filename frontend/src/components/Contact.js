import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
import { UPDATE_FIELD_CONTACT, SEND_EMAIL, UPDATE_FIELD_LOADING } from '../constants/actionTypes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => ({ ...state.contact });

const mapDispatchToProps = dispatch => ({
    changeContactEmail: value =>
        dispatch({ type: UPDATE_FIELD_CONTACT, key: 'contactEmail', value }),
    onChangeSubject: value =>
        dispatch({ type: UPDATE_FIELD_CONTACT, key: 'subject', value }),
    onChangeMessage: value =>
        dispatch({ type: UPDATE_FIELD_CONTACT, key: 'message', value }),
    onChangeLoadingState: value => 
        dispatch({type: UPDATE_FIELD_LOADING, value}),
    onSubmit: (contactEmail, subject, message) =>
        dispatch({ type: SEND_EMAIL, payload: agent.Contact.sendMail(contactEmail, subject, message) })
});

class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            redirect: false
        }
        const RegExpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const RegExpText = /^[0-9A-Za-z]{10,100}$/;
        this.changeContactEmail = e => {
            this.props.changeContactEmail(e.target.value);
            if(RegExpEmail.test(e.target.value) && e.target.value !== undefined) {
                document.getElementById("form-input-control-email").setAttribute("style", "");
                document.getElementById("emailError").innerHTML = "";
            }
        }
        this.changeSubject = (e, { value }) => {
            this.props.onChangeSubject(value);
            if(value !== undefined) {
                document.getElementById("form-select-control-subject").setAttribute("style", "");
                document.getElementById("subjectError").innerHTML = "";
            }
        } 
        this.changeMessage = e => {
            this.props.onChangeMessage(e.target.value);
            if(RegExpText.test(e.target.value) && e.target.value !== undefined) {
                document.getElementById("form-textarea-control-message").setAttribute("style", "");
                document.getElementById("messageError").innerHTML = "";
            }
        } 
        this.submitForm = (contactEmail, subject, message) => e => {
            e.preventDefault();
            if(!RegExpEmail.test(contactEmail) || contactEmail === undefined || subject === undefined || !RegExpText.test(message) || message === undefined) {
                if(!RegExpEmail.test(contactEmail) || contactEmail === undefined) {
                    document.getElementById("form-input-control-email").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("emailError").innerHTML = "<p style='color: #F44444; float:left;'> Email is invalid</p>";
                }

                if(subject === undefined) {
                    document.getElementById("form-select-control-subject").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("subjectError").innerHTML = "<p style='color: #F44444; margin-left:51%;'> Subject is required</p>";
                }

                if(!RegExpText.test(message) | message === undefined) {
                    document.getElementById("form-textarea-control-message").setAttribute("style", "background-color: #fff6f6; border-color: #e0b4b4;");
                    document.getElementById("messageError").innerHTML = "<p style='color: #F44444;'> Message is invalid</p>";
                }

                return;
            }
            this.setState({loading: true});
            this.props.onSubmit(contactEmail, subject, message);
        };
    }

    componentDidUpdate() {
        if(this.props.loading === true) {
            this.setState({loading: false});
            this.props.onChangeLoadingState(false);
        }   
    }

    render() {
        const contactEmail = this.props.contactEmail;
        const subject = this.props.subject;
        const message = this.props.message;
        const buttonState = this.props.button;
        const subjectOptions = [
            { key: '01', text: 'Have a problem with the app', value: 'Have a problem with the app' },
            { key: '02', text: 'I want to report user', value: 'I want to report user' },
            { key: '03', text: 'I need some help', value: 'I need some help' },
            { key: '04', text: 'Other...', value: 'Other...' }
        ];

        return (
            <Form onSubmit={this.submitForm(contactEmail, subject, message)} loading={this.state.loading}>

                <ListErrors errors={this.props.errors} />

                <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-email'
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        value={contactEmail || ''}
                        onChange={this.changeContactEmail}
                    />
                    <Form.Field
                        control={Select}
                        id='form-select-control-subject'
                        options={subjectOptions}
                        label={{ children: 'Subject', htmlFor: 'form-select-control-subject' }}
                        placeholder='Subject'
                        search
                        searchInput={{ id: 'form-select-control-subject' }}
                        value={subject || ''}
                        onChange={this.changeSubject}
                    />
                </Form.Group>
                    <span id='emailError'></span>
                    <span id='subjectError'></span>
                <Form.Field
                    id='form-textarea-control-message'
                    control={TextArea}
                    label='Message'
                    placeholder='Message'
                    value={message || ''}
                    onChange={this.changeMessage}
                />
                <span id='messageError'></span>
                <Form.Field
                    id='form-button-control-send'
                    control={Button}
                    content='Send'
                    disabled={buttonState}
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
            </Form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

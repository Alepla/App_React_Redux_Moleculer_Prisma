import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import MessageList from './messageList';
import SendMessage from './sendMessage';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: ""
        }
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(text) {
    }

    componentDidMount() {

    }

    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            },
            chatContainer: {
                display: 'flex',
                flex: 1
            },
                whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white'
            },
                chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column'
            }
        }
        console.log(this.state.messages);
        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                       <h2>Who's online PLACEHOLDER</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList messages={this.state.messages}  style={styles.chatList} />
                        <SendMessage onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/> 
                    </section>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

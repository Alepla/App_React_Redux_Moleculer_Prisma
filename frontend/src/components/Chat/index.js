import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import MessageList from './messageList';
import SendMessage from './sendMessage';
import { CHAT_LOADED, CHAT_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.chat,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: CHAT_LOADED, payload }),
    onUnload: () =>
        dispatch({ type: CHAT_UNLOADED }),
});

class Chat extends React.Component {
    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Chat.listMessages()
        ]))
    }

    render() {
        const styles = {
            container: {
                height: '96vh',
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

        if (!this.props.messages) {
            return null;
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                       <h2>Global chat</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList messages={this.props.messages}  style={styles.chatList} />
                        <SendMessage onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/> 
                    </section>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

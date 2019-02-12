import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
class MessageList extends React.Component {
    render() {
        const styles = {
            container: {
                overflowY: 'scroll',
                flex: 1
            },
            ul: {
                listStyle: 'none'
            },
            li: {
                marginTop: 13,
                marginBottom: 13
            },
            senderUsername: {
                fontWeight: 'bold'
            },
            message: { 
                fontSize: 15 
            }
        }
        return (
            <div style={{ ...this.props.style, ...styles.container }}>
                <ul style={styles.ul}>
                 {this.props.messages.map((x, i) => (
                      <li key={i} style={styles.li}>
                          <div>
                              <span style={styles.senderUsername}>{x.author}</span>{' '}
                          </div>
                          <p style={styles.message}>{x.content}</p>
                      </li>
                    ))}
                </ul>
          </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

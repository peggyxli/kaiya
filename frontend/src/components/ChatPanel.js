import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import { withStyles, createStyles } from '@material-ui/core/styles';
import './ChatPanel.css';


const styles = theme => createStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
    };
  }

  componentDidMount() {
    const pusher = new Pusher('903ccf96b48b053043df', {
      cluster: 'us2',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: 'human',
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    });

    this.setState({ userMessage: '' });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div className = {this.props.classes.root}>
        <div className="conversation-view">
          <div>{chat}</div>
        </div>
        <div className="message-box">
          <Tooltip title="Add" aria-label="Add">
            <Fab>
              <MicIcon />
            </Fab>
          </Tooltip>

          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.userMessage}
              onInput={this.handleChange}
              className="text-input"
              type="text"
              autoFocus
              placeholder="Type your message and hit Enter to send"
            />
          </form>
        </div>
      </div>
    );
  }
}


ChatPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPanel);

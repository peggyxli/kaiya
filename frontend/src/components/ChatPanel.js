import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import { withStyles, createStyles } from '@material-ui/core/styles';
import './ChatPanel.css';
import SpeechToText from 'speech-to-text';
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  AppBar,
  Toolbar
} from '@material-ui/core';

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
      error: '',
      interimText: '',
      finalisedText: [],
      listening: false
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

    //for speech
    const onAnythingSaid = text => {
      this.setState({ interimText: text });
    };

    const onEndEvent = () => {
      if (this.state.listening) {
        this.startListening();
      }
    };

    const onFinalised = text => {
      this.setState({
        finalisedText: [text, ...this.state.finalisedText],
        interimText: ''
      });
    };

    try {
      this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
    } catch (error) {
      this.setState({ error: error.message });
      //for speech ends
    }
  }


//for speech
startListening = () => {
  try {
    this.listener.startListening();
    this.setState({ listening: true });
  } catch (err) {
    console.log('yoyoy');
    console.log(err);
  }
};

stopListening = () => {
  this.listener.stopListening();
  this.setState({ listening: false });
};
//end for speech


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

    //for speech
    const { error, interimText, finalisedText, listening } = this.state;
    const { classes } = this.props;

    let content;
    if (error) {
      content = (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Paper>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            color="primary"
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={16}>
          <Grid item xs={12} sm={5}>
            <Paper className={this.props.classes.paper}>
              <Typography variant="overline" gutterBottom>
                Status: {listening ? 'listening...' : 'finished listening'}
              </Typography>
              {buttonForListening}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper className={this.props.classes.paper}>
              <Typography variant="overline" gutterBottom>
                Current utterances
              </Typography>
              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Finalised Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {finalisedText.map((str, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {str}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      );
    }
    //end
    //// id='microphone-btn' onClick={this.toggleListen}/> 

    return (
      <div className = {this.props.classes.root}>
        <div className="conversation-viewer">
          <div>{chat}</div>
        </div>
        <div className="conversation-input">
          <form className="conversation-textform" onSubmit={this.handleSubmit}>
            <input
              value={this.state.userMessage}
              onInput={this.handleChange}
              className="conversation-textinput"
              type="text"
              autoFocus
              placeholder="Type your message and hit Enter to send"
            />
          </form>
          <Tooltip title="Communicate by voice" aria-label="Communicate by voice">
            <Fab>
              <MicIcon />
              
            </Fab>
          </Tooltip>
        </div>

        <Grid container>
              {content}
        </Grid>
      </div>

      //for speech
      
    );    
  }
}


ChatPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPanel);

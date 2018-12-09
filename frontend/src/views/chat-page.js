import React, { Component } from 'react';
import { ChatPanel } from '../components'
import logo from '../logo.svg';
import codee from '../codee.png';
import '../App.css';
import './chat-page.css';

class ChatPage extends Component {



  render() {
    return (
      <div className="ChatPage">
        <div className="App">
          <header className="App-header">
            <img src={codee} className="pet" alt="logo" />
          </header>
        </div>
        < ChatPanel />
      </div>
    );
  }
}

export default ChatPage;

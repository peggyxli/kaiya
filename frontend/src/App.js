import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Chat } from './views';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Chat} />
      </Router>
    );
  }
}

export default App;

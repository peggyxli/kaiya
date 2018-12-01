import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Chat } from './views';
import NavBar from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;

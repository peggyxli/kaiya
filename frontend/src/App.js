import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ChatPage } from './views';
import { NavBar } from './components';
import './App.css';



class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#fff',
          main: '#eee',
        },
        secondary: {
          main: '#8e52c1',
        },
      },
    });

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <NavBar/>
          <div className="container">
            <Route exact path="/" component={ChatPage} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}



export default App;

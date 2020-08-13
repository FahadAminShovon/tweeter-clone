import React from 'react';
import './App.css';

// React router imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';


// Mui imports
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import customTheme from './util/theme';
// Component import
import Navbar from './components/Navbar';

// page imports
import {Home, Login, Signup} from './pages';


const theme = createMuiTheme(customTheme);

function App() {
  return (
    <div className="App">
    <ThemeProvider theme = {theme}>
      <Router>
        <Provider store = {store}>
        <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
              </Switch>
            </div>
        </Provider>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;

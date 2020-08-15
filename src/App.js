import React from 'react';
import './App.css';
//decoder import
import JwtDecode from 'jwt-decode';
// React router imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData,  authenticateUser} from './redux';
// Mui imports
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
// Uitl import
import customTheme from './util/theme';
import AuthRoute from './util/AuthRoute';
// Component import
import {Navbar} from './components';
// page imports
import {Home, Login, Signup, User} from './pages';
import axios from 'axios';

const theme = createMuiTheme(customTheme);
const token = localStorage.FBIdToken;
if(token){
  const decodeToken = JwtDecode(token);
  if(decodeToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
  else {
    store.dispatch(authenticateUser());
    axios.defaults.headers['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


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
                <AuthRoute exact path="/login" component={Login}/>
                <AuthRoute exact path="/signup" component={Signup}/>
                <Route exact path="/users/:handle" component={User}/>
              </Switch>
            </div>
        </Provider>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;

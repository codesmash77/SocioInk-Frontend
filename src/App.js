/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import AuthRoute from './util/authroute';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObject from './util/theme';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

const theme = createTheme(themeObject);


let authenticated;
const token = localStorage.getItem('FBIdToken');
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = '/login';
		authenticated = false;
		store.dispatch(logoutUser());
	} else {
		authenticated = true;
		store.dispatch({ type: SET_AUTHENTICATED });
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute exact path="/login" component={login} authenticated={authenticated} />
								<AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
								<Route exact path="/users/:handle" component={user} authenticated={authenticated}/>
								<Route exact path="/users/:handle/ink/:inkId" component={user} authenticated={authenticated}/>
							</Switch>
						</div>
					</Router>
				</Provider>
			</ThemeProvider>
		);
	}
}

export default App;

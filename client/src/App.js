import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/userpage/Dashboard';
import HomePage from './components/homepage/Dashboard';
import Login from './components/homepage/Login'
import CreateUser from './components/homepage/CreateUser'
import {
	Route,
	NavLink,
	BrowserRouter as Router,
	browserHistory,
	Switch,
} from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<Route exact path='/' component={() => <HomePage />}/>
			<Route exact path='/login' component={() => <Login /> }/>
			<Route exact path='/users' component={() => <CreateUser />}/>
			<Route exact path='/about' component={() => <About />}/>
			<Route exact path='/user-info' component={() => <Dashboard />}/>
		</Router>
	)
}

export default App;

function About(props) {
	return(
		<div>
			<h1> Welcome to about page</h1>
		</div>
	)
}


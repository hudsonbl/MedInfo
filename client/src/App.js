import React from 'react';
import './App.css';
import Dashboard from './components/userpage/Dashboard';
import HomePage from './components/homepage/Dashboard';
import Login from './components/homepage/Login'
import CreateUser from './components/homepage/CreateUser'
import ForgotPassword from './components/homepage/ForgotPassword'
import ResetPassword from './components/homepage/ResetPassword'
import FirstResponder from './components/userpage/FirstResponder'
import FourOhFour from './components/errorpage/FourOhFour'
import About from './components/homepage/About'
import WelcomScreen from './components/homepage/WelcomScreen';
import {
	Route,	
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={() => <HomePage page={WelcomScreen}/>}/>
				<Route exact path='/login' component={() => <Login /> }/>
				<Route exact path='/login/confirmation/:hash' component={() => <Login /> }/>
				<Route exact path='/users' component={() => <CreateUser />}/>
				<Route path='/user-info' component={() => <Dashboard />}/>
				<Route exact path='/forgot-password' component={() => <ForgotPassword />} />
				<Route exact path='/reset-password' component={() => <ResetPassword />} />
				<Route exact path='/first-responder/:userId' component={()=> <FirstResponder/>} />
				<Route exact path='/about' component={()=> <HomePage page={About}/> } />
				<Route component={FourOhFour} />
			</Switch>
		</Router>
	)
}

export default App;
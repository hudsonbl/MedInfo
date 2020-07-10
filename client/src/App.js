import React from 'react';
import './App.css';

// Backend API endpoints discluding home, home will not need to fetch any backend resources as of now: possible change in future if I want to consider dynamically changing Home menu resources
// home 
// users
// allergies
// doctor-visit
// chronic-health
// drug-prescription
// hospital-visit
// immunization-record
// lab-reports
// first-responder

import Home from './components/home/Home'
import CreateUser from './components/home/CreateUser'
import Login from './components/home/Login'
import User from './components/userview/User'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import FirstResponder from './components/firstresponder/FirstResponder';

// App Contains the main functionality of the website. 
// Works as a main html page, that calls components that are controlled by user experience.
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user : { 
        userId: '', // Gets extracted upon login
        bearerToken: '', // Gets extracted upon login
      },
      screen: { 
        homeScreen: true,
        createUserScreen: false,
        loginScreen: false,
        userScreen: false 
      }
    }
    this.setScreen = this.setScreen.bind(this)
    this.setClientSession = this.setClientSession.bind(this)
  }

  // This function changes what component gets rendered to the screen. Controlling user experience
  setScreen(screenName, props) {
    const home = 'home' // home screen
    const create = 'create' // create user screen
    const login = 'login' // login screen
    const user = 'user' // user screen

    if(screenName == home) { // Set rendered screen to Home page
      this.setState({
        screen: {
          homeScreen: true,
          createUserScreen: false,
          loginScreen: false,
          userScreen: false 
        }
      })
    } else if(screenName == create) { // Set rendered screen to Create User page
      this.setState({
        screen: {
          homeScreen: false,
          createUserScreen: true,
          loginScreen: false,
          userScreen: false 
        }
      })
    } else if(screenName == login) { // Set rendered screen to Login Screen. Extract bearer token and id for future client sessions.
      this.setState({
        screen: {
          homeScreen: false,
          createUserScreen: false,
          loginScreen: true,
          userScreen: false 
        }
      })
    } else if(screenName == user) { // Set rendered screen to User screen
      this.setClientSession(props)
      this.setState({ 
        screen: {
          homeScreen: false,
          createUserScreen: false,
          loginScreen: false,
          userScreen: true 
        }
      })
    }
  }

  // Logins will extract client credentials. And required authentication for future client requests.
  setClientSession(client) {
    this.setState({
      user: {
        userId: client.userId,
        bearerToken: client.bearerToken
      }
    })
  }
  
  // Conditionally check the state of user and see what screen they want rendered. That component is returned.
  screenRender(){
    if(this.state.screen.homeScreen) {
      return (<Home setScreen={this.setScreen}/>)
    } else if(this.state.screen.createUserScreen) {
      return (<CreateUser setScreen={this.setScreen}/>)
    } else if(this.state.screen.loginScreen) {
      return (<Login setScreen={this.setScreen} setClientSession={this.setClientSession}/>)
    } else if(this.state.screen.userScreen) {
      return (<User setScreen={this.setScreen} user={this.state.user}/>)
    }
  }

  render() {
  
    return (
      <div>
        
        <Router>
        <Switch>
            <Route exact path="/" >
              {this.screenRender()}
            </Route>
            <Route path="/first-responder/:userId" component={FirstResponder}/>
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App;

const UserId = ({match}) => (
  <div>
    <h1>Inside of first responder response</h1>
    <h2>For user: {match.params.userId}</h2>
  </div>
)
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
import Test from './components/home/Test'

// App Contains the main functionality of the website. 
// Works as a main html page, that calls components that are controlled by user experience.
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: '',
      bearerToken: '',
      screen: {
        homeScreen: true,
        createUserScreen: false,
        loginScreen: false,
        userScreen: false 
      }
    }
    this.setScreen = this.setScreen.bind(this)
  }

  setScreen(screenName, props) {
    console.log("Inside the fucntion call", screenName)
    const home = 'home'
    const create = 'create'
    const login = 'login'
    const user = 'user'

    if(screenName == home) {
      this.setState({
        screen: {
          homeScreen: true,
          createUserScreen: false,
          loginScreen: false,
          userScreen: false 
        }
      })
    } else if(screenName == create) {
      this.setState({
        screen: {
          homeScreen: false,
          createUserScreen: true,
          loginScreen: false,
          userScreen: false 
        }
      })
    } else if(screenName === login) {
      this.setState({
        userId: props.userId,
        bearerToken: props.bearerToken,
        screen: {
          homeScreen: false,
          createUserScreen: false,
          loginScreen: true,
          userScreen: false 
        }
      })
    } else if(screenName === user) {
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

  screenRender(){
    if(this.state.screen.homeScreen) {
      return (<Home setScreen={this.setScreen}/>)
    } else if(this.state.screen.createUserScreen) {
      return (<CreateUser setScreen={this.setScreen}/>)
    } else if(this.state.screen.loginScreen) {
      return (<Login setScreen={this.setScreen}/>)
    } else if(this.state.screen.userScreen) {
      return (<User setScreen={this.setScreen}/>)
    }
  }

  render() {
    console.log("path name: ", this.state.path);
    return (
      <div>
        {this.screenRender()}
      </div>
    )
  }
}

export default App;

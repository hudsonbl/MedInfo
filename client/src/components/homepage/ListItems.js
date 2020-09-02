import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Link from '@material-ui/core/Link';
import HomePage from './Dashboard'
import Login from './Login'
import CreateUser from './CreateUser'
import {logoutUser} from '../../cache/actions'

import {profileLink, medInfoLink} from '../userpage/listItems'


const loginLink = (
  <div>
    <Link color="inherit" style={{ textDecoration: 'none' }} href='/login'>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Login"/>
      </ListItem>
      </Link>
  </div>
);

const SignOutLink = (props) => {
  return (
    <div>
      <Link color="inherit" style={{ textDecoration: 'none' }} href='/' onClick={props.logoutUser}>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out"/>
        </ListItem>
      </Link>
    </div>
  )
} 

const createUserLink = (
  <div>
    <Link color="inherit" style={{ textDecoration: 'none' }} href='/users'>
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Create New User" />
      </ListItem>
      </Link>
  </div>
)

const mainListItems = (props) => {
 
  return (
    <div>
      <Link color="inherit" style={{ textDecoration: 'none' }} href='/'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItem>
      </Link>
      {props.isLoggedIn ? <div> 
                                {profileLink}
                                {medInfoLink}
                                <SignOutLink logoutUser={props.setLogout} />
                             </div> :
                             <div> 
                               {loginLink}
                               {createUserLink}
                             </div>
      }
    </div>
  );
} 

export default mainListItems

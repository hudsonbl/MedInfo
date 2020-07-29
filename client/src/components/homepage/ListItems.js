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
import {useDispatch} from 'react-redux'
const mainListItems = () => {

  return (
    <div>
      <Link href='/'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItem>
      </Link>
      <Link href='/login'>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Login"/>
      </ListItem>
      </Link>
      <Link href='/users'>
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Create New User" />
      </ListItem>
      </Link>
    </div>
  );
} 

export default mainListItems

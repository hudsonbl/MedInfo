import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
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

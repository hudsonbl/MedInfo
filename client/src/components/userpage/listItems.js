import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

export const profileLink = (
  <div>
    <Link color="inherit" style={{ textDecoration: 'none' }} href="/user-info/profile" >
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
  </div>
);

export const medInfoLink = (
  <div>
   <Link color="inherit" style={{ textDecoration: 'none' }} href="/user-info" >
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Medical Information" />
      </ListItem>
    </Link>
  </div>
);

export const homePageLink = (
  <div>
   <Link color="inherit" style={{ textDecoration: 'none' }} href="/" >
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
  </div>
);
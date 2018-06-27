import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components'
import { _helper } from '../Function/API';
import { Home, Email, Face, Cancel } from '@material-ui/icons'
const LinkWrapper = styled(Link) `
color: white;
margin-left: 20px;
&:hover {
  text-decoration: none;
  color: white;
   cursor: pointer
}
`;


export const mailFolderListItems = (
  <div>
    <LinkWrapper to='/home' >
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </LinkWrapper>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <LinkWrapper to='/' >
    <ListItem button onClick={() => (_helper.fetchAPI("/logout",{}))} >
      <ListItemIcon>
        <Cancel />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItem>
    </LinkWrapper  >

  </div>
);
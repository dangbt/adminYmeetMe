import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { Link, Redirect } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

export const LinkWrapper = styled(Link) `
    font-family:'Franklin Gothic', 'Arial Narrow', 'Arial','sans-serif' ,'Courier New', 'Courier', 'monospace';
    color: white;
    margin-left: 20px;
    &:hover {
      text-decoration: none;
      color: white;
      cursor: pointer
    }
  `;

export const AvatarWrapper = styled(IconButton) `    
    display: flex !important;
    width: 200px !important;
    flex-direction: row !important;
    justify-content: flex-end !important;
    outline: none !important;
    &:hover {
     background-color: #3F51B5 !important;
    }
`;

export const DrawerWrapper = styled(Drawer)`
    h3 {
    font-family:'Franklin Gothic', 'Arial Narrow', 'Arial','sans-serif' ,'Courier New', 'Courier', monospace !important;            
    }
`;
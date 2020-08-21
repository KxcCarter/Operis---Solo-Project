import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// --- MUI icons ---

import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InfoIcon from '@material-ui/icons/Info';
import WorkIcon from '@material-ui/icons/Work';
import HomeIcon from '@material-ui/icons/Home';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Paper, Typography } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.info.light,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Nav = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/projects';
    loginLinkData.text = 'Home';
  }

  return (
    <div>
      <div className="imageContainer">
        <div className="imageText">OPERIS</div>

        <div className="nav-bottom">
          <Link to="/home">
            {/* <h1 className="nav-title">OPERIS</h1> */}
            <Typography variant="h6" className="nav-title">
              Hey {props.store.user.username} <InsertEmoticonIcon />
            </Typography>
          </Link>
          {/* <div className="nav-center">
            <Typography variant="h6">
              Hey {props.store.user.username} <InsertEmoticonIcon />
            </Typography>
          </div> */}

          <div className="nav-link">
            <Button
              size="large"
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleClick}
            >
              <MenuIcon fontSize="large" />
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <StyledMenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <Link className="nav-link" to={loginLinkData.path}>
                  {loginLinkData.text}
                </Link>
              </StyledMenuItem> */}

              {/* Show the link to the info page and the logout button if the user is logged in */}
              {props.store.user.id && (
                <>
                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <WorkIcon fontSize="small" />
                    </ListItemIcon>
                    <Link className="nav-link" to="/projects">
                      Projects
                    </Link>
                  </StyledMenuItem>

                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AddBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <Link className="nav-link" to="/new">
                      New Project
                    </Link>
                  </StyledMenuItem>

                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <Link className="nav-link" to="/talent">
                      Talent Pool
                    </Link>
                  </StyledMenuItem>

                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <LogOutButton className="nav-link" />
                  </StyledMenuItem>
                </>
              )}
              {/* Always show this link since the about page is not protected */}

              <StyledMenuItem onClick={handleClose}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <Link className="nav-link" to="/info">
                  Info Page
                </Link>
              </StyledMenuItem>
            </StyledMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);

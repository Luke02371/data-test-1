import React, { useState } from "react";
import {
  Box,
  makeStyles,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";

import LoginButton from "../Auth0/LoginButton";
import LogoutButton from "../Auth0/LogoutButton";
import { useAuth0 } from "../../contexts/auth0context";
import { isMobile } from "../../globals/helpers";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: (props) => (props.isMobile ? 14 : 30),
    fontWeight: "bold",
    marginLeft: (props) => (props.isMobile ? 0 : 100),
  },
  logos: {
    width: (props) => (props.isMobile ? 50 : 100),
    cursor: "pointer",
  },
  logoLudian: {
    width: (props) => (props.isMobile ? 50 : 130),
    cursor: "pointer",
  },
}));

const MenuAppBar = (props) => {
  const { isAuthenticated } = useAuth0();
  const classes = useStyles({ isMobile });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {/* <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleMenu}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box> */}
        <Box>
          <Box
            component="img"
            src="/assets/rtcLogo.png"
            className={classes.logos}
            onClick={() => {
              navigate("/");
            }}
          />
        </Box>
        <Box fontSize={20} textAlign="center" className={classes.headerText}>
          Network Occupancy Management System
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src="/assets/Ludian-Logo.png"
            className={classes.logoLudian}
            onClick={() => {
              navigate("/");
            }}
          />
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;

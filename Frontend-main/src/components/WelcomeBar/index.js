import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import useSWR from "swr";
import { ENDPOINTS } from "../../api/endpoints";
import { navigate, useLocation } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  welcomeBox: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 50,
  },
  welcomeTitle: {
    textAlign: "right",
    fontSize: 20,
    paddingRight: 20,
  },
  homeLink: {
    textDecoration: "underline",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 20,
    cursor: "pointer",
    "&:hover": {
      color: "blue",
    },
  },
}));

const WelcomeBar = (props) => {
  const classes = useStyles();
  const { data: me } = useSWR(ENDPOINTS.USERS_ME);
  const { navigateLink, linkText } = props;

  const currentLocation = useLocation();
  const goHome = () => {
    if (navigateLink) {
      navigate(navigateLink);
    } else {
      navigate("/");
    }
  };
  return (
    <Box className={classes.welcomeBox}>
      {currentLocation.pathname === "/" ? (
        <Box />
      ) : (
        <Box className={classes.homeLink} onClick={() => goHome()}>
          &larr; {linkText ? linkText : "Home"}
        </Box>
      )}
      <Box className={classes.welcomeTitle}>Welcome, {me?.name} </Box>
    </Box>
  );
};

export default WelcomeBar;

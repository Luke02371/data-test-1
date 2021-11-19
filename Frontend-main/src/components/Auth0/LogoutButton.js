import React from "react";
import { useAuth0 } from "../../contexts/auth0context";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 10,
    width: "fit-content",
    color: "black",
    maxWidth: 300,
    height: 30,
    margin: 5,
    "&:hover": {
      backgroundColor: theme.palette.color.coolBlue,
      color: "white",
    },
  },
}));

const LogoutButton = () => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <Button
      variant="outlined"
      className={classes.button}
      onClick={() => logout({ returnTo: process.env.REACT_APP_ORIGIN })}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

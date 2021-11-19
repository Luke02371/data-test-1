import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useAuth0 } from "../../contexts/auth0context";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 10,
    width: "fit-content",
    color: "black",
    height: 30,
    margin: 5,
    maxWidth: 300,
    marginRight: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.coolBlue,
      color: "white",
    },
  },
}));

const LoginButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      className={classes.button}
      onClick={() => loginWithRedirect()}
      variant="outlined"
    >
      Login / Register
    </Button>
  );
};

export default LoginButton;

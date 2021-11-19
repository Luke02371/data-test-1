import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    background: theme.palette.primary.lighter,
    color: "black",
    fontSize: 13,
  },
  header: {},
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      Please note this is a pilot project by Ludian LLC. All fields are subject
      to changes. &copy; 2021
    </Box>
  );
};

export default Footer;

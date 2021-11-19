import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import MenuAppBar from "../AppBar";
import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: 80,
  },
  header: {},
}));

const PageWrapper = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <MenuAppBar />
      {children}
      <Footer />
    </Box>
  );
};

export default PageWrapper;

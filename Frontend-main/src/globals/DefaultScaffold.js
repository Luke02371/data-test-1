import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  header: {},
}));

const DefaultScaffold = (props) => {
  const {} = props;
  const classes = useStyles();
  return <Box className={classes.container}>Default Scaffold</Box>;
};

export default DefaultScaffold;

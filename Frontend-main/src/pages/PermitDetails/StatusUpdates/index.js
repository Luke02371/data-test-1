import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import StatusUpdateTable from "./StatusUpdateTable";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  header: {},
  permitDetails: {
    background: theme.palette.primary.main,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
}));

const StatusUpdates = (props) => {
  const { permit } = props;
  const classes = useStyles();
  return (
    <Box className={classes.permitDetails}>
      <StatusUpdateTable permit={permit} />
    </Box>
  );
};

export default StatusUpdates;

import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lineGroupItem: {
    padding: 20,
  },
  lineItemValue: {
    fontWeight: "bold",
    paddingLeft: 5,
  },
}));

const LineGroupItem = (props) => {
  const {
    permit,
    configObj: { lineTitle, lineItemValueKey },
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.lineGroupItem}>
      {lineTitle}:{" "}
      {permit && (
        <span className={classes.lineItemValue}>
          {permit[lineItemValueKey]}
        </span>
      )}
    </Box>
  );
};

export default LineGroupItem;

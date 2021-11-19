import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  permitLineItem: {
    fontSize: 16,
    padding: 5,
  },
  lineText: {
    fontWeight: "bold",
  },
}));

const PermitLineItem = (props) => {
  const { lineTitle, lineSpanValue } = props;
  const classes = useStyles();
  return (
    <Box className={classes.permitLineItem}>
      <span className={classes.lineText}>{lineTitle}</span>:{" "}
      <span className={classes.lineText}>{lineSpanValue}</span>
    </Box>
  );
};

export default PermitLineItem;

import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lineItem: {
    padding: 20,
    fontSize: 20,
  },
  lineItemValue: {
    fontWeight: "bold",
    paddingLeft: 5,
    whiteSpace: "nowrap",
  },
}));

const LineItem = (props) => {
  const {
    permit,
    configObj: { lineTitle, lineItemValueKey },
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.lineItem}>
      {lineTitle}
      {lineItemValueKey === "" ? "" : ":"}{" "}
      {permit && (
        <span className={classes.lineItemValue}>
          {lineItemValueKey === "permitType"
            ? "Barricade"
            : permit[lineItemValueKey]}
        </span>
      )}
    </Box>
  );
};

export default LineItem;

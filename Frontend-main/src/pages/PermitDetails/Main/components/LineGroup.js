import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import LineGroupItem from "./LineGroupItem";

const useStyles = makeStyles((theme) => ({
  lineGroup: {
    padding: 20,
    fontSize: 20,
    marginRight: 200,
  },
  lineItemValue: {
    fontWeight: "bold",
    paddingLeft: 5,
  },
}));

const LineGroup = (props) => {
  const {
    permit,
    configObj: {
      lineGroupHeadText,
      lineGroupHeadValueKey,
      groupLineItemConfigs,
    },
  } = props;
  console.log("PERMIT HERE In Line Group", permit);
  const classes = useStyles();
  return (
    <Box className={classes.lineGroup}>
      <Box className={classes.lineGroupHead}>
        {lineGroupHeadText}:{" "}
        {permit && (
          <span className={classes.lineItemValue}>
            {permit[lineGroupHeadValueKey]}
          </span>
        )}
      </Box>
      {groupLineItemConfigs.map((lineItem) => {
        return <LineGroupItem configObj={lineItem} permit={permit} />;
      })}
    </Box>
  );
};

export default LineGroup;

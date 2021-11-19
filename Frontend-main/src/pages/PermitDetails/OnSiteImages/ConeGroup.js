import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lineGroup: {
    padding: 20,
    fontSize: 20,
    marginRight: 200,
  },
  lineGroupItem: {
    padding: 20,
  },
  lineItemValue: {
    fontWeight: "bold",
    paddingLeft: 5,
  },
  onSiteGroup: {
    display: "flex",
  },
  imageBox: {
    width: 300,
    padding: 30,
  },
  outerBox: {
    padding: 30,
    minHeight: 150,
    background: theme.palette.color.otherBlue,
  },
  innerBox: {
    background: "white",
    padding: 10,
    textAlign: "center",
    fontSize: 18,
  },
  imageDate: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
}));

const ConeGroup = (props) => {
  const {
    permit,
    coneTextObj: { title, subTitle1, subTitle2 },
  } = props;

  const classes = useStyles();
  const isConeSetUp = title === "Cone Set-Up";
  return (
    <Box className={classes.onSiteGroup}>
      <Box className={classes.lineGroup}>
        <Box className={classes.lineGroupHead}>{title}</Box>
        <Box className={classes.lineGroupItem}>
          {subTitle1}:{" "}
          <span className={classes.lineItemValue}>
            {isConeSetUp ? permit.plannedStartTime : permit.plannedEndTime}
          </span>
        </Box>
        <Box className={classes.lineGroupItem}>
          {subTitle2}:{" "}
          <span className={classes.lineItemValue}>
            {isConeSetUp ? permit.actualStartTime : permit.actualEndTime}
          </span>
        </Box>
      </Box>
      <Box className={classes.imageBox}>
        <Box className={classes.outerBox}>
          <Box className={classes.innerBox}>
            May submit multiple images, grouped by set up/tear down, and in
            order (newest to oldest)
          </Box>
        </Box>
        <Box className={classes.imageDate}>Date and time taken</Box>
      </Box>
    </Box>
  );
};

export default ConeGroup;

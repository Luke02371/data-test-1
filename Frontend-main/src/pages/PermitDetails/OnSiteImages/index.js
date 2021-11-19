import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { coneSetUp, coneTearDown } from "./static";
import ConeGroup from "./ConeGroup";

const useStyles = makeStyles((theme) => ({
  permitDetails: {
    background: theme.palette.primary.main,
    padding: 10,
    textAlign: "left",
  },
  lineGroup: {
    padding: 20,
    fontSize: 20,
  },
  lineGroupItem: {
    padding: 20,
  },
}));

const OnSiteImages = (props) => {
  const { permit } = props;
  const classes = useStyles();
  return (
    <Box className={classes.permitDetails}>
      <ConeGroup permit={permit} coneTextObj={coneSetUp} />
      <ConeGroup permit={permit} coneTextObj={coneTearDown} />
    </Box>
  );
};

export default OnSiteImages;

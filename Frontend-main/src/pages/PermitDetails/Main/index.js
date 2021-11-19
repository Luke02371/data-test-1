import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SectionOne from "./SectionOne";
// import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

const useStyles = makeStyles((theme) => ({
  permitDetails: {
    background: theme.palette.primary.main,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
}));

const Main = (props) => {
  const { permit } = props;
  const classes = useStyles();
  return (
    <Box className={classes.permitDetails}>
      <SectionOne permit={permit} />
      {/* <SectionTwo permit={permit} /> */}
      <SectionThree permit={permit} />
    </Box>
  );
};

export default Main;

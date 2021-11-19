import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import LineItem from "./components/LineItem";
import { sectionOneLineItems } from "./components/static";

const useStyles = makeStyles((theme) => ({
  section: {},
}));

const SectionOne = (props) => {
  const { permit } = props;

  const classes = useStyles();
  return (
    <Box className={classes.section}>
      {sectionOneLineItems.map((lineItem) => {
        return (
          <LineItem
            configObj={lineItem}
            permit={permit}
            key={lineItem.lineTitle}
          />
        );
      })}
      {/* <LineGroup configObj={applicantLineGroupConfig} permit={permit} /> */}
    </Box>
  );
};

export default SectionOne;

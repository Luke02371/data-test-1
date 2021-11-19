import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { sectionThreeLineItems } from "./components/static";
import LineItem from "./components/LineItem";

const useStyles = makeStyles((theme) => ({
  section: {},
}));

const SectionThree = (props) => {
  const { permit } = props;
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      {sectionThreeLineItems.map((lineItem) => {
        return (
          <LineItem
            permit={permit}
            configObj={lineItem}
            key={lineItem.lineTitle}
          />
        );
      })}
    </Box>
  );
};

export default SectionThree;

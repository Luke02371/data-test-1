import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { sectionTwoLineItems } from "./components/static";
import LineItem from "./components/LineItem";

const useStyles = makeStyles((theme) => ({
  section: {},
}));

const SectionTwo = (props) => {
  const { permit } = props;
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      {/* <LineGroup configObj={primeContractorLineGroupConfig} permit={permit} />
      <LineGroup
        configObj={barricadeContractorLineGroupConfig}
        permit={permit}
      /> */}
      {sectionTwoLineItems.map((lineItem) => {
        return <LineItem permit={permit} configObj={lineItem} />;
      })}
    </Box>
  );
};

export default SectionTwo;

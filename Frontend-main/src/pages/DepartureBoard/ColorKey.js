import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { COLOR_KEYS } from "./static";

const useStyles = makeStyles((theme) => ({
  colorKeyBox: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    width: "fit-content",
    margin: "auto",
    marginBottom: 30,
  },
  singleBox: {
    width: 200,
    padding: 5,
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
  },
}));

const ColorKey = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.colorKeyBox}>
      {COLOR_KEYS.map((item, index) => (
        <Box
          className={classes.singleBox}
          style={{ backgroundColor: item.color }}
          key={index + "colorKey"}
        >
          {item.text}
        </Box>
      ))}
    </Box>
  );
};

export default ColorKey;

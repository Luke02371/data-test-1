import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: (props) => `url("${props.tile.backgroundImg}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    margin: 10,
    height: 100,
    fontSize: 18,
    fontFamily: "arial",
    textAlign: "left",
    position: "relative",
    color: "white",
    cursor: "pointer",
  },
  cover: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
  title: {
    padding: 10,
  },
}));

const Tile = (props) => {
  const { tile } = props;
  const classes = useStyles({ tile });
  const handleNavigation = () => {
    navigate(tile.link);
  };
  return (
    <Box className={classes.container} onClick={() => handleNavigation()}>
      <Box className={classes.cover}>
        <Box className={classes.title}>{tile.title}</Box>
      </Box>
    </Box>
  );
};

export default Tile;

import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Main from "./Main";
import StatusUpdates from "./StatusUpdates";
import WorkSchedule from "./WorkSchedule";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    maxWidth: "80%",
    margin: "auto",
  },
  mainTitle: {
    fontSize: 30,
    textAlign: "left",
    marginBottom: 5,
  },
  mainTitleSpan: {
    fontWeight: "bold",
  },
  buttons: {
    textAlign: "left",
  },
  button: {
    padding: 10,
    margin: 5,
    background: "transparent",
    border: "1px solid black",
    fontSize: 16,
  },
  activeButton: {
    padding: 10,
    margin: 5,
    fontSize: 16,
    background: "red",
    border: "1px solid black",
    fontWeight: "bold",
  },
}));

const Refactor = (props) => {
  const { permit } = props;
  const classes = useStyles();
  const [tabView, setTabView] = useState("General");

  return (
    <Box className={classes.container}>
      <Box className={classes.mainTitle}>
        Permit Number:{" "}
        <span className={classes.mainTitleSpan}>{permit?.permit_number}</span>
      </Box>
      <Box className={classes.buttons}>
        <button
          className={
            tabView === "General" ? classes.activeButton : classes.button
          }
          onClick={() => setTabView("General")}
        >
          General
        </button>
        <button
          className={
            tabView === "Status Updates" ? classes.activeButton : classes.button
          }
          onClick={() => setTabView("Status Updates")}
        >
          Status Updates
        </button>
        <button
          className={
            tabView === "Work Schedule" ? classes.activeButton : classes.button
          }
          onClick={() => setTabView("Work Schedule")}
        >
          Work Schedule
        </button>
      </Box>
      {tabView === "General" && <Main permit={permit} />}
      {tabView === "Status Updates" && <StatusUpdates permit={permit} />}
      {tabView === "Work Schedule" && <WorkSchedule permit={permit} />}
    </Box>
  );
};

export default Refactor;

import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import PageWrapper from "../../components/PageWrapper";
import WelcomeBar from "../../components/WelcomeBar";
import ColorKey from "./ColorKey";
import DepartTable from "./DepartTable";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.palette.color.coolBlue,
    marginTop: 30,
    marginBottom: 30,
  },
}));

const DepartureBoard = (props) => {
  const classes = useStyles();
  return (
    <PageWrapper>
      <WelcomeBar />
      <Box className={classes.header}>Departure Board</Box>
      <ColorKey />
      <DepartTable />
    </PageWrapper>
  );
};

export default DepartureBoard;

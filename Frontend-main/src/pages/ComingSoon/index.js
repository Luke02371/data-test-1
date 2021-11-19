import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import PageWrapper from "../../components/PageWrapper";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  goBack: {
    textDecoration: "underline",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    width: "fit-content",
    margin: "auto",
    "&:hover": {
      color: "blue",
    },
  },
}));

const ComingSoonPage = (props) => {
  const classes = useStyles();
  const goBack = () => {
    navigate("/");
  };
  return (
    <PageWrapper>
      <Box className={classes.container}>Coming Soon...</Box>
      <Box className={classes.goBack} onClick={() => goBack()}>
        Go Back
      </Box>
    </PageWrapper>
  );
};

export default ComingSoonPage;

import React from "react";
import { Grid, makeStyles, Box } from "@material-ui/core";
import PageWrapper from "../../components/PageWrapper";
import { TILES } from "./static";
import Tile from "./Tile";
import WelcomeBar from "../../components/WelcomeBar";

const useStyles = makeStyles((theme) => ({
  container: {},
  header: {},
  tiles: {
    margin: "auto",
    maxWidth: 1000,
  },
}));

const Home = (props) => {
  const { isAuthenticated } = props;
  const classes = useStyles();
  return (
    <PageWrapper>
      {isAuthenticated && (
        <Box>
          <WelcomeBar />
          <Grid container className={classes.tiles}>
            {TILES.map((tile, index) => (
              <Grid item xs={6} key={index + tile.title}>
                <Tile tile={tile} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </PageWrapper>
  );
};

export default Home;

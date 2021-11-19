import React from "react";
import { Box, makeStyles, CircularProgress, Grid } from "@material-ui/core";
import PageWrapper from "../../components/PageWrapper";
import WelcomeBar from "../../components/WelcomeBar";
// import { permits } from "./static";
import { navigate } from "@reach/router";
import useSWR from "swr";
import { ENDPOINTS } from "../../api/endpoints";
import PermitLineItem from "./PermitLineItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    border: "1px solid black",
    margin: "auto",
    marginTop: 30,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },
  permit: {
    textAlign: "left",
    padding: 10,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
  },
  permitLineItem: {
    fontSize: 16,
    padding: 5,
  },
  permitNumberSpan: {
    fontWeight: "bold",
    textDecoration: "underline",
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  lineText: {
    fontWeight: "bold",
  },
}));

const ExistingBookings = (props) => {
  //   const {} = props;
  const classes = useStyles();

  const handleNavigate = (permitNumber) => {
    navigate(`/permit-details/${permitNumber}`);
  };

  const { data: permitObject, error } = useSWR(ENDPOINTS.PERMITS);

  const permits = permitObject?.permits;

  return (
    <PageWrapper>
      <WelcomeBar />
      <Box className={classes.container}>
        <Box className={classes.mainTitle}>Existing Bookings</Box>
        {!permitObject && !error && <CircularProgress />}
        {error && (
          <Box>
            Server is having trouble responding. Please refresh the page and try
            again.
          </Box>
        )}
        {permits?.map((permit) => {
          return (
            <Grid
              container
              className={classes.permit}
              key={permit.permit_number}
            >
              <Grid item xs={3}>
                <Box className={classes.permitLineItem}>
                  <span style={{ fontWeight: "bold" }}>Permit Number</span>:{" "}
                  <span
                    className={classes.permitNumberSpan}
                    onClick={() => handleNavigate(permit.permit_number)}
                  >
                    {permit.permit_number}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <PermitLineItem
                  lineTitle={"Location"}
                  lineSpanValue={permit.description}
                />
              </Grid>
              <Grid item xs={3}>
                <PermitLineItem
                  lineTitle={"Permit Type"}
                  lineSpanValue={"Barricade"}
                />
              </Grid>
              <Grid item xs={3}>
                <PermitLineItem
                  lineTitle={"Issued Date"}
                  lineSpanValue={permit.issued_date}
                />
              </Grid>
              <Grid item xs={3}>
                <PermitLineItem
                  lineTitle={"Expiration Date"}
                  lineSpanValue={permit.expiration_date}
                />
              </Grid>
              <Grid item xs={2}>
                <PermitLineItem
                  lineTitle={"Status"}
                  lineSpanValue={permit.status}
                />
              </Grid>
              <Grid item xs={4}>
                <PermitLineItem
                  lineTitle={"Contact"}
                  lineSpanValue={permit.contact_name}
                />
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </PageWrapper>
  );
};

export default ExistingBookings;

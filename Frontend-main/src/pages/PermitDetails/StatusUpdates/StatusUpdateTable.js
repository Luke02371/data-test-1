import React from "react";
import { format } from "date-fns";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useSWR from "swr";
import { ENDPOINTS } from "../../../api/endpoints";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },
  header: {},
  tableHead: {
    background: "#aaa",
  },
  columnTitles: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid black",
  },
  noUpdates: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  columnCells: {
    border: "1px solid black",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
  },
  locationSpan: {
    fontWeight: "bold",
    paddingRight: 2,
  },
}));

const StatusUpdateTable = (props) => {
  const { permit } = props;
  const classes = useStyles();
  const { data: rows } = useSWR(
    `${ENDPOINTS.PERMIT_UPDATES}/${permit.permit_number}`
  );

  // const rows = [
  //   // {
  //   //   created_at: Date(),
  //   //   traffic_management_number: "1",
  //   //   status: "active",
  //   //   street_lanes: "3",
  //   //   bike_lanes: "4",
  //   //   signal_impacted: "yes",
  //   //   transit_stop_impacted: "no",
  //   //   gps_lat: "121.35343",
  //   //   picture_url: "some picture",
  //   //   user: "user 1",
  //   // },
  // ];
  return (
    <Box className={classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center" className={classes.columnTitles}>
                Time
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Traffic Management Number
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Status
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                No. Street Lanes
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                No. Bike Lanes
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Traffic Signal Affected
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Transit Stop Affected
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Site Image
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                GPS Location
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                User
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center" className={classes.columnCells}>
                  {format(new Date(row.timestamp), "PPpp")}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.version}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.status}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.street_lanes}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.bike_lanes}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.signal_impacted}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.transit_impacted}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.status !== "teardown" && row.status !== "update" ? (
                    <a href={row.image_url} target="_blank" rel="noreferrer">
                      Image
                    </a>
                  ) : (
                    <Box>N/A</Box>
                  )}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  <Box textAlign="center" whiteSpace="nowrap">
                    {/* <Box>
                      <span className={classes.locationSpan}>lat:</span>
                      {row.gps_lat}
                    </Box>
                    <Box>
                      <span className={classes.locationSpan}>long:</span>{" "}
                      {row.gps_long}
                    </Box> */}
                    <a
                      href={`https://maps.google.com/?q=${row.gps_lat}%20${row.gps_long}`}
                      target="_blank"
                      rel="noreferrer"
                      // style={{ color: "black" }}
                    >
                      Location
                    </a>
                  </Box>
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.username}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!rows?.length && (
          <Box className={classes.noUpdates}>No updates to display</Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default StatusUpdateTable;

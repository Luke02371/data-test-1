import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useSWR from "swr";
import { ENDPOINTS } from "../../api/endpoints";
import { Box } from "@material-ui/core";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    maxWidth: "80%",
    margin: "auto",
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    borderTop: "1px solid black",
  },
  columnTitles: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid black",
  },
  columnCells: {
    border: "1px solid black",
    whiteSpace: "nowrap",
  },
  columnCellsGreen: {
    border: "1px solid black",
    background: "green",
    whiteSpace: "nowrap",
  },
  columnCellsRed: {
    border: "1px solid black",
    background: "red",
    whiteSpace: "nowrap",
  },
  columnCellsOrange: {
    border: "1px solid black",
    background: "orange",
    whiteSpace: "nowrap",
  },
  tableCell: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  tableCellClickable: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    cursor: "pointer",
  },
  noUpdates: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  permitLink: {
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const DepartTable = () => {
  const classes = useStyles();
  const now = Date.now();
  const determineIfTimePassed = (timeToCheck) => {
    if (now > Date.parse(timeToCheck)) {
      return true;
    } else {
      return false;
    }
  };

  const determineIfWithinFifteen = (timeToCheck) => {
    const inFifteen = now + 15 * 60000;
    if (inFifteen > Date.parse(timeToCheck)) {
      return true;
    } else {
      return false;
    }
  };

  const { data: rows } = useSWR(ENDPOINTS.GET_DEPARTURE_BOARD, {
    refreshInterval: 60000,
  });
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell align="center" className={classes.columnTitles}>
              Permit Number
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Location
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Traffic Management Location
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Status
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Planned Start Time
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Actual Start Time
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Planned End Time
            </TableCell>
            <TableCell align="center" className={classes.columnTitles}>
              Actual End Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" className={classes.columnCells}>
                <span
                  onClick={() =>
                    navigate(`/permit-details/${row.permit_number}`)
                  }
                  className={classes.permitLink}
                >
                  {row.permit_number}
                </span>
              </TableCell>
              <TableCell align="center" className={classes.columnCells}>
                {/* Henderson, NV */}
                {row.location?.substring(0, 15)}
              </TableCell>
              <TableCell align="center" className={classes.columnCells}>
                <Box textAlign="center" whiteSpace="nowrap">
                  {row.gps_lat !== "" && (
                    <a
                      href={`https://maps.google.com/?q=${row.gps_lat}%20${row.gps_long}`}
                      target="_blank"
                      rel="noreferrer"
                      // style={{ color: "black" }}
                    >
                      Location
                    </a>
                  )}
                  {row.gps_lat === "" && "N/A"}
                </Box>
              </TableCell>
              <TableCell align="center" className={classes.columnCells}>
                {row.actual_start_time && !row.actual_end_time
                  ? "On-Site"
                  : "N/A"}
              </TableCell>
              <TableCell align="center" className={classes.columnCells}>
                {row.planned_start_time &&
                  format(new Date(row.planned_start_time), "PPpp")}
              </TableCell>
              <TableCell
                align="center"
                className={
                  row.actual_start_time && row.actual_end_time
                    ? classes.columnCells
                    : row.actual_start_time
                    ? classes.columnCellsGreen
                    : !row.actual_start_time &&
                      row.planned_start_time &&
                      determineIfTimePassed(row.planned_start_time)
                    ? classes.columnCellsRed
                    : !row.actual_start_time &&
                      row.planned_start_time &&
                      determineIfWithinFifteen(row.planned_start_time)
                    ? classes.columnCellsOrange
                    : classes.columnCells
                }
              >
                {row.actual_start_time &&
                  format(new Date(row.actual_start_time), "PPpp")}
              </TableCell>
              <TableCell align="center" className={classes.columnCells}>
                {row.planned_end_time &&
                  format(new Date(row.planned_end_time), "PPpp")}
              </TableCell>
              <TableCell
                align="center"
                className={
                  row.actual_end_time
                    ? classes.columnCells
                    : !row.actual_end_time &&
                      row.planned_end_time &&
                      determineIfTimePassed(row.planned_end_time)
                    ? classes.columnCellsRed
                    : !row.actual_end_time &&
                      row.planned_end_time &&
                      determineIfWithinFifteen(row.planned_end_time)
                    ? classes.columnCellsOrange
                    : classes.columnCells
                }
              >
                {row.actual_end_time &&
                  format(new Date(row.actual_end_time), "PPpp")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!rows?.length && (
        <Box className={classes.noUpdates}>
          No upcoming departures to display
        </Box>
      )}
    </TableContainer>
  );
};

export default DepartTable;

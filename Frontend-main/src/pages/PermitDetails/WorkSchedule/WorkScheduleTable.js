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
    width: "100%",
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
  columnCells: {
    border: "1px solid black",
  },
  noUpdates: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
}));

const WorkScheduleTable = (props) => {
  const { permit } = props;
  const classes = useStyles();
  const { data: rows } = useSWR(
    `${ENDPOINTS.WORK_LOGS}/${permit.permit_number}`
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
                Planned Setup
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Actual Setup
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Planned Tear Down
              </TableCell>
              <TableCell align="center" className={classes.columnTitles}>
                Actual Tear Down
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center" className={classes.columnCells}>
                  {row.planned_start_time &&
                    format(new Date(row.planned_start_time), "PPpp")}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.actual_start_time &&
                    format(new Date(row.actual_start_time), "PPpp")}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.planned_end_time &&
                    format(new Date(row.planned_end_time), "PPpp")}
                </TableCell>
                <TableCell align="center" className={classes.columnCells}>
                  {row.actual_end_time &&
                    format(new Date(row.actual_end_time), "PPpp")}
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

export default WorkScheduleTable;

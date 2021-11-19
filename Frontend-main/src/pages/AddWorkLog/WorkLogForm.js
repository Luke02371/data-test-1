import { useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useAddWorkLogApi from "../../api/workLogs";
import { format } from "date-fns";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    width: 300,
    margin: "auto",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.palette.color.coolBlue,
    marginTop: 30,
    textAlign: "left",
    padding: 20,
  },
  input: {
    padding: 20,
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  button: {
    textAlign: "left",
    padding: 20,
  },
}));

const WorkLogForm = (props) => {
  const [plannedStartDate, setPlannedStartDate] = useState(new Date());
  const [plannedEndDate, setPlannedEndDate] = useState(new Date());
  const [permitNumber, setPermitNumber] = useState("");
  const [result, setResult] = useState(undefined);
  const classes = useStyles();
  const { addWorkLog } = useAddWorkLogApi();

  const responseCallback = (responseObj) => {
    console.log("response obj", responseObj);
    if (responseObj.response?.data?.error) {
      setResult(responseObj.response.data?.message);
    } else if (responseObj.success) {
      setResult(responseObj.message);
    }
  };

  const submit = async () => {
    // format(new Date(row.planned_start_time), "PPpp")
    const data = {
      permit_number: permitNumber,
      planned_start_time: moment(plannedStartDate).format(
        "YYYY-MM-DD hh:mm:ss a"
      ),
      planned_end_time: moment(plannedEndDate).format("YYYY-MM-DD hh:mm:ss a"),
    };
    console.log("DATA FOR WORK LOG", data, Date.parse(data.planned_start_time));

    await addWorkLog(data, responseCallback);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>Add Work Log</Box>
      <Box className={classes.input}>
        <Box className={classes.label}>Permit Number</Box>
        <TextField
          placeholder="e.x. PBAR123"
          onChange={(e) => setPermitNumber(e.target.value)}
          value={permitNumber}
        />
      </Box>
      <Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box className={classes.input}>
            <Box className={classes.label}>Planned Start Date/Time</Box>
            <DateTimePicker
              ampm={false}
              value={plannedStartDate}
              onChange={setPlannedStartDate}
            />
          </Box>
          <Box className={classes.input}>
            <Box className={classes.label}>Planned End Date/Time</Box>
            <DateTimePicker
              ampm={false}
              value={plannedEndDate}
              onChange={setPlannedEndDate}
            />
          </Box>
        </MuiPickersUtilsProvider>
      </Box>
      <Box className={classes.button}>
        {!result && (
          <Button color="primary" variant="contained" onClick={() => submit()}>
            Submit
          </Button>
        )}
        {result && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setPermitNumber("");
              setResult(undefined);
            }}
          >
            Ok
          </Button>
        )}
        <Box className={classes.result}>{result}</Box>
      </Box>
    </Box>
  );
};

export default WorkLogForm;

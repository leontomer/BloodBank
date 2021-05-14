import { set } from "mongoose";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ReactToPdf from "react-to-pdf";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import { CSVLink } from "react-csv";

export default function GetLogs(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  let TempLogs = [];
  const ref = React.createRef();

  const handleGetLogs = async () => {
    const logsFromServer = await axios.get("/dam/getLogs", {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });

    logsFromServer.data.map((log) => {
      TempLogs.push({
        user: log.user,
        actionName: log.actionName,
        actionDate: Moment(log.actionDate).format("MMMM Do YYYY, h:mm:ss a"),
      });
    });
    setLogs(TempLogs);
  };
  const useStyles = makeStyles((theme) => ({
    table: {
      maxWidth: 650,
      marginTop: theme.spacing(3),
      width: "100%",
      overflowX: "auto",
      marginBottom: theme.spacing(2),
      margin: "auto",
    },
  }));
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center", minHeight: 650 }}>
      <br />
      <Typography variant="subtitle2" gutterBottom>
        enter the start date to get the log from:{" "}
      </Typography>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
      />
      <Typography variant="subtitle2" gutterBottom>
        enter the end date:{" "}
      </Typography>
      <DatePicker
        selected={endDate}
        showTimeSelect
        onChange={(date) => setEndDate(date)}
        value={endDate}
      />
      <div>
        <button onClick={handleGetLogs}>get logs!</button>
      </div>
      <br />
      {/* <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf> */}
      <TableContainer component={Paper} ref={ref} className={classes.table}>
        <div>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action Name</TableCell>
                <TableCell align="right">Action Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell component="th" scope="row">
                    {log.user}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {log.actionName}
                  </TableCell>
                  <TableCell align="right">{log.actionDate}</TableCell>
                </TableRow>
              ))}{" "}
            </TableBody>{" "}
          </Table>{" "}
        </div>
      </TableContainer>
      <CSVLink data={logs}>Download Logs</CSVLink>
    </div>
  );
}

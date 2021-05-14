import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ReactToPdf from "react-to-pdf";
import { makeStyles } from "@material-ui/core/styles";

const axios = require("axios");

export default function GetBlood(props) {
  const [blood, setBlood] = useState([]);
  const ref = React.createRef();

  useEffect(() => {
    (async function getFields() {
      const blood = await axios.get("/dam/getBlood");
      console.log(blood.data);
      setBlood(blood.data);
    })();
  }, []);

  const useStyles = makeStyles({
    table: {
      maxWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <div>
      <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <TableContainer component={Paper} ref={ref} className={classes.table}>
        <div>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Blood Type</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blood.map((row) => (
                <TableRow key={row.bloodType}>
                  <TableCell component="th" scope="row">
                    {row.bloodType}
                  </TableCell>
                  <TableCell align="right">{row.bloodAmount}</TableCell>
                </TableRow>
              ))}{" "}
            </TableBody>{" "}
          </Table>{" "}
        </div>
      </TableContainer>
    </div>
  );
}

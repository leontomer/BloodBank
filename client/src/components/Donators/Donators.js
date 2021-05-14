import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useLoader } from "../../Contexts/LoaderContext";
import { useModal } from "../../Contexts/ModalContext";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const { startLoading, finishLoading } = useLoader();
  const { openModal } = useModal();
  const [allDonators, setAllDonators] = useState([]);
  const clearDonators = async () => {
    try {
      startLoading();
      await axios.delete("/dam/deleteBank");
      openModal(
        "Delete was successfull",
        "All the donators were removed from the bank"
      );
      fetchData();
      finishLoading();
    } catch (error) {
      console.log("error", error);
      finishLoading();
      openModal("Error", "Something went wrong");
    }
  };
  const fetchData = async () => {
    try {
      startLoading();
      const res = await axios.get("/dam/getAllDonators");
      setAllDonators([...res.data.bloodbank]);
      finishLoading();
    } catch (error) {
      console.log("error", error);
      finishLoading();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const allData = allDonators.map((donator) =>
    createData(
      donator.name,
      donator._id,
      donator.phoneNumber,
      donator.bloodAmount,
      donator.bloodType
    )
  );

  return (
    <TableContainer style={{ width: 1000, marginLeft: 400, marginTop: 100 }}>
      <Button
        style={{
          background: "  #e74c3c  ",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={clearDonators}
      >
        Clear donators
      </Button>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Donators Name</StyledTableCell>
            <StyledTableCell align="right">id</StyledTableCell>
            <StyledTableCell align="right">phone</StyledTableCell>
            <StyledTableCell align="right">
              current blood amount
            </StyledTableCell>
            <StyledTableCell align="right">blood type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

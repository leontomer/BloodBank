import React, { useState } from "react";

import {
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Card,
  CardMedia,
} from "@material-ui/core";
import donateBloodImage from "../../images/donateBlood.jpg";
import "./DonateBlood.css";
import { useModal } from "../../Contexts/ModalContext";
import { useLoader } from "../../Contexts/LoaderContext";

const axios = require("axios");

const useStyles = makeStyles({
  media: {
    height: 300,
    width: 745,
  },
  root: {
    boxShadow: "0px 5px 34px -2px #000000",
    marginTop: 20,
    width: 745,
    height: 700,
    margin: "auto",
  },
});

export default function DonateBlood() {
  const { openModal } = useModal();
  const { startLoading, finishLoading } = useLoader();
  const classes = useStyles();

  const [bloodDonation, setBloodDonation] = useState({
    name: "",
    amount: null,
    phoneNumber: "",
    bloodType: "",
  });
  const setDefaultState = () => {
    setBloodDonation({
      name: "",
      amount: 0,
      phoneNumber: "",
      bloodType: "",
    });
  };
  const { name, amount, phoneNumber, bloodType } = bloodDonation;
  const onChange = (e) => {
    setBloodDonation({
      ...bloodDonation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount == 0) {
      openModal("Error", "Donation amount cannot be zero");
      return;
    }
    const phoneReg = new RegExp(/[0-9]{3}-[0-9]{7}/g);

    if (!phoneReg.test(phoneNumber)) {
      openModal("Error", "Phone must be valid phone number");
      return;
    }
    try {
      startLoading();
      const res = await axios.post("/dam/addBlood", {
        bloodType: bloodType,
        amount: parseInt(amount),
        name: name,
        phoneNumber: phoneNumber,
      });
      setDefaultState();
      openModal(res.data.title, res.data.msg);
      finishLoading();
    } catch (error) {
      console.log("error", error.response.data);
      if (error && error.response && error.response.data) {
        openModal(error.response.data.title, error.response.data.msg);
      } else {
        openModal(
          "Something went wrong",
          "Your response was not registered, please try again later"
        );
      }
      finishLoading();
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={donateBloodImage}
        title="Contemplative Reptile"
      />
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "30vh",
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Add blood to the bank
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ marginRight: 100 }}>
            <TextField
              type="text"
              label="First Name"
              name="name"
              onChange={onChange}
              required
              value={name}
            />
          </div>
          <div>
            <TextField
              type="tel"
              label="Phone number with -"
              name="phoneNumber"
              onChange={onChange}
              required
              value={phoneNumber}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 50,
            justifyContent: "center",
          }}
        >
          <div style={{ marginRight: 100 }}>
            <TextField
              type="number"
              label="Donation amount"
              name="amount"
              InputProps={{ inputProps: { min: 1 } }}
              onChange={onChange}
              required
              value={amount}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Select
              required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="bloodType"
              value={bloodType}
              onChange={onChange}
              labelWidth={50}
              style={{ width: "200px" }}
              required
            >
              <MenuItem value="" disabled>
                Select blood type
              </MenuItem>
              {["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"].map(
                (type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Button
            style={{
              background: "  #ec7063  ",
              color: "white",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}

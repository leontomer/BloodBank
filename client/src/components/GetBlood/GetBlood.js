import React, { useState } from "react";
import {
  CardMedia,
  Button,
  MenuItem,
  Select,
  TextField,
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import bloodImage from "../../images/blood.jpg";
import Donator from "./Donator/Donator";
import axios from "axios";
import { useLoader } from "../../Contexts/LoaderContext";

const useStyles = makeStyles({
  root: {
    boxShadow: "0px 5px 34px -2px #000000",
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const GetBlood = () => {
  const [requestedBloodType, setRequstedBloodType] = useState({
    bloodType: "",
    amount: "",
  });
  const { startLoading, finishLoading, isLoading } = useLoader();
  const [donatorList, setDonatorList] = useState([]);
  const [unableToCollectAmount, setUnableToCollectAmount] = useState(0);

  const onChange = (e) => {
    setRequstedBloodType({
      ...requestedBloodType,
      [e.target.name]: e.target.value,
    });
  };

  const setDefaultRequestData = () => {
    setRequstedBloodType({
      bloodType: "",
      amount: "",
    });
  };

  const sendRequestToExtract = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const { bloodType, amount } = requestedBloodType;
      const res = await axios.post("/dam/extractBloodDonation", {
        bloodType: bloodType,
        amount: amount,
      });
      if (res.data.remainsToCollect) {
        setUnableToCollectAmount(res.data.remainsToCollect);
      }
      setDonatorList([...res.data.allBloodDonations]);
      setDefaultRequestData();
      finishLoading();
    } catch (error) {
      console.log("error", error);
      finishLoading();
    }
  };

  const renderDonatorList = donatorList.map((donator) => (
    <Donator
      id={donator._id}
      amountToTake={donator.amountToTake}
      phoneNumber={donator.phoneNumber}
      name={donator.name}
      bloodType={donator.bloodType}
    />
  ));

  const { bloodType, amount } = requestedBloodType;
  const classes = useStyles();

  return (
    <div style={{ marginTop: 20, marginLeft: 30, display: "flex" }}>
      <div style={{ marginRight: 300 }}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={bloodImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <form id="getBlood" onSubmit={sendRequestToExtract}>
              <div style={{ marginTop: 5 }}>
                <Typography>Please enter the blood type you need:</Typography>
              </div>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="bloodType"
                value={bloodType}
                onChange={onChange}
                label="Type"
                labelWidth={50}
                required
                style={{ width: "200px" }}
              >
                {["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"].map(
                  (type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  )
                )}
              </Select>
              <div style={{ marginTop: 20 }}>
                <Typography>Please enter the amount you need:</Typography>
              </div>
              <TextField
                type="number"
                value={amount}
                min="1"
                name="amount"
                required
                onChange={onChange}
              />
            </form>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              disabled={isLoading}
              form="getBlood"
              type="submit"
            >
              <Typography>extract</Typography>
            </Button>
          </CardActions>
        </Card>
      </div>

      <div>
        {!!unableToCollectAmount && (
          <Typography component="h3" variant="h3" color="error">
            {" "}
            Unable to collect: {unableToCollectAmount}
          </Typography>
        )}
        {renderDonatorList}
      </div>
    </div>
  );
};

export default GetBlood;

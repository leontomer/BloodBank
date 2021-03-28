import React, { useState } from "react";
import {
  CardMedia,
  Button,
  TextField,
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import emergencyImage from "../../images/emergency.jpg";
import { useLoader } from "../../Contexts/LoaderContext";
import Donator from "../GetBlood/Donator/Donator";
const axios = require("axios");

const useStyles = makeStyles({
  root: {
    boxShadow: "0px 5px 34px -2px #000000",
    width: 445,
  },
  media: {
    height: 200,
  },
});

export default function GetUrgentBlood() {
  const [requestEmergencyBatch, setRequestEmergencyBatch] = useState({
    amount: "",
  });
  const { startLoading, finishLoading, isLoading } = useLoader();
  const [donatorList, setDonatorList] = useState([]);
  const [unableToCollectAmount, setUnableToCollectAmount] = useState(0);

  const classes = useStyles();

  const onChange = (e) => {
    setRequestEmergencyBatch({
      ...requestEmergencyBatch,
      [e.target.name]: e.target.value,
    });
  };
  const setDefaultRequestData = () => {
    setRequestEmergencyBatch({
      amount: "",
    });
  };
  const { amount } = requestEmergencyBatch;

  const renderDonatorList = donatorList.map((donator) => (
    <Donator
      id={donator._id}
      amountToTake={donator.amountToTake}
      phoneNumber={donator.phoneNumber}
      name={donator.name}
      bloodType={donator.bloodType}
    />
  ));

  const urgerntRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const { amount } = requestEmergencyBatch;
      const res = await axios.post("/dam/extractEmergency", {
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

  return (
    <div style={{ marginTop: 20, display: "flex" }}>
      <div style={{ marginLeft: 150 }}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={emergencyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <form id="getBlood" onSubmit={urgerntRequestSubmit}>
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
              style={{
                background: "  #ec7063  ",
                color: "white",
                fontWeight: "bold",
              }}
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

      <div style={{ marginLeft: 50 }}>
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
}

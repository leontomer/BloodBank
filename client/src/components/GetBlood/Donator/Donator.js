import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import donatorImage from "../../../images/donatorBlood.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "450px",
    display: "flex",
    boxShadow: "0px 5px 10px -2px #000000",
    margin: 30,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Donator({
  id,
  amountToTake,
  name,
  phoneNumber,
  bloodType,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${name} - Take ${amountToTake} portions`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`Serial #${id}`}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {`Blood Type ${bloodType}`}
          </Typography>
          <Typography>{`phone : ${phoneNumber}`}</Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={donatorImage} />
    </Card>
  );
}

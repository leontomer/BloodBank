import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { useModal } from "../../Contexts/ModalContext";
import ModalBloodImage from "../../images/modalBlood.jpg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    maxWidth: 345,
    border: "0.5px solid white",
  },
  media: {
    height: 140,
  },
  action: {
    margin: "auto",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();

  const { closeModal, isOpenModal, title, message } = useModal();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpenModal}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenModal}>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={ModalBloodImage} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {message}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.action}>
              <Button
                style={{
                  background: " #5499c7 ",
                  color: "white",
                  fontWeight: "bold",
                }}
                size="small"
                color="primary"
                onClick={closeModal}
              >
                OK
              </Button>
            </div>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

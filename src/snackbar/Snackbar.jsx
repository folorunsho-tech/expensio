import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "../styles/snackbarStyles";
const Snackbars = ({ open, setOpen }) => {
  const classes = useStyles();
  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration="3000"
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Transaction Succcesfully Created !!!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Snackbars;

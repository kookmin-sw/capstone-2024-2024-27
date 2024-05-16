import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

function PopupAlert({ alertOpen, title, handleClose }) {
  return (
    <div>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupAlert;

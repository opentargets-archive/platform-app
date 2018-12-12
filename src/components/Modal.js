import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '10% auto',
  },
});

const Modal = ({ classes, open, onClose, children }) => {
  return (
    <MuiModal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>{children}</Paper>
    </MuiModal>
  );
};

export default withStyles(styles)(Modal);

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
    padding: '10px',
  },
  modalCloseButton: {
    textAlign: 'center',
    cursor: 'pointer',
    float: 'right',
    '& span': {
      fontSize: '0.75em',
      display: 'block',
    },
  },
});

const Modal = ({ classes, open, onClose, children }) => {
  return (
    <MuiModal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <div className={classes.modalCloseButton} onClick={onClose}>
          <i class="far fa-times-circle fa-2x" />
          <span>Close</span>
        </div>
        {children}
      </Paper>
    </MuiModal>
  );
};

export default withStyles(styles)(Modal);

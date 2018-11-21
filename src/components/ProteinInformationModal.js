import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
});

const ProteinInformationModal = ({ classes, open, symbol, onClose }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>
          General information about {symbol} protein from UniProt.
        </Typography>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(ProteinInformationModal);

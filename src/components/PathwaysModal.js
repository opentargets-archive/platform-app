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

const PathwaysModal = ({ classes, open, symbol, onClose }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>Pathway information for {symbol} from Reactome</Typography>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(PathwaysModal);

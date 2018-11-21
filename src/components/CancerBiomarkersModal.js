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

const CancerBiomarkersModal = ({ classes, open, onClose }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>
          Genomic biomarkers of drug responses, and their levels of clinical
          significance as described by Tamborero et al. (2018). This data is
          manually curated by clinical and scientific communities in the field
          of precision oncology.
        </Typography>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(CancerBiomarkersModal);

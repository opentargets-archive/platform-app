import React from 'react';
import { Link } from 'ot-ui';

import MuiModal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '10% auto',
    padding: '10px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  modalCloseButton: {
    textAlign: 'center',
    cursor: 'pointer',
    color: '#5A5F5F',
    marginLeft: '10px',
    '& span': {
      fontSize: '0.65em',
      display: 'block',
      paddingTop: '2px',
    },
    '&:hover': {
      color: '#000',
    },
  },
  modalTitle: {
    fontWeight: 500,
  },
  description: {
    fontStyle: 'italic',
  },
});

const Modal = ({ classes, open, onClose, children, header }) => {
  return (
    <MuiModal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <div className={classes.modalHeader}>
          <div>
            <Typography variant="h5" className={classes.modalTitle}>
              {header.title}
            </Typography>
            <Typography className={classes.description}>
              {header.description}
            </Typography>
            <Typography variant="caption">
              Source{header.sources.length > 1 ? 's' : null}:{' '}
              {header.sources.map((d, i) => (
                <React.Fragment key={d.name}>
                  {i > 0 ? ' ' : null}
                  <Link external to={d.url}>
                    {d.name}
                  </Link>
                </React.Fragment>
              ))}
            </Typography>
          </div>
          <div className={classes.modalCloseButton} onClick={onClose}>
            <i className="far fa-times-circle fa-lg" />
            <span>Close</span>
          </div>
        </div>

        {children}
      </Paper>
    </MuiModal>
  );
};

export default withStyles(styles)(Modal);

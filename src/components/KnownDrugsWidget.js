import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

import KnownDrugsDetail from './KnownDrugsDetail';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  modal: {
    backgroundColor: 'red',
  },
});

class KnownDrugsWidget extends Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { symbol, classes, ensgId } = this.props;
    const { isOpen } = this.state;

    return (
      <Grid item md={6}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Know drugs
            </Typography>
            <Typography variant="h4" align="center">
              43
            </Typography>
            <Typography>
              number of drugs associated with {symbol} with these modalities:
            </Typography>
          </CardContent>
        </Card>
        <Modal open={isOpen} onClose={this.handleClose}>
          <div className={classes.modal}>
            Know Drugs Modal
            <KnownDrugsDetail ensgId={ensgId} />
          </div>
        </Modal>
      </Grid>
    );
  }
}

export default withStyles(styles)(KnownDrugsWidget);

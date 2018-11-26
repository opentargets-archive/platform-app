import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import TrialsHistogram from './TrialsHistogram';
import KnownDrugsModal from './KnownDrugsModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

class KnownDrugsWidget extends Component {
  static widgetName = 'known drugs';

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
    const {
      ensgId,
      symbol,
      drugs: { count, trialsByPhase },
      classes,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <Grid item md={6}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Known drugs
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="h4" align="center">
                  {count}
                </Typography>
                <Typography align="center">
                  number of drugs associated with {symbol} with these
                  modalities:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <TrialsHistogram trialsByPhase={trialsByPhase} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <KnownDrugsModal
          open={isOpen}
          onClose={this.handleClose}
          ensgId={ensgId}
          symbol={symbol}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(KnownDrugsWidget);

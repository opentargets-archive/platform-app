import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import KnownDrugsModal from './KnownDrugsModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

class ChemicalProbesWidget extends Component {
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
    const { ensgId, symbol, chemicalProbes, classes } = this.props;
    const { isOpen } = this.state;

    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Chemical probes
            </Typography>
            <Typography variant="h4" align="center">
              {chemicalProbes.portalProbeCount}
            </Typography>
            <Typography variant="body2" align="center">
              number of chemical probes developed for {symbol}
            </Typography>
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

export default withStyles(styles)(ChemicalProbesWidget);

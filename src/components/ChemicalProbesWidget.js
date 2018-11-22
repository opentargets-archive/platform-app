import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import ChemicalProbesModal from './ChemicalProbesModal';

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

            {chemicalProbes.portalProbeCount > 0 ? (
              <div>
                <Typography variant="h4" align="center">
                  {chemicalProbes.portalProbeCount}
                </Typography>
                <Typography variant="body2" align="center">
                  number of chemical probes developed for {symbol}
                </Typography>
              </div>
            ) : (
              <Typography variant="body2" align="center">
                Potential chemical probes for {symbol} can be explored with{' '}
                <a
                  href={chemicalProbes.probeMinerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Probe Miner
                </a>
                .
              </Typography>
            )}

            <Typography variant="caption" align="center">
              Chemical probes information from{' '}
              <a
                href="https://www.thesgc.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Structural Genomics Consortium
              </a>
              , the{' '}
              <a
                href="http://www.chemicalprobes.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chemical Probes Portal
              </a>
              , and{' '}
              <a
                href="http://www.sgc-ffm.uni-frankfurt.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Science Probes
              </a>
              .
            </Typography>
          </CardContent>
        </Card>

        <ChemicalProbesModal
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

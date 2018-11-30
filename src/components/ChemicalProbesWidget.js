import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
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
  handleClick = e => {
    // if the click is coming from a link, stop it to prevent opening the modal
    if (e.target.tagName.toLowerCase() === 'a') {
      e.stopPropagation();
      return;
    }

    if (this.props.chemicalProbes.portalProbeCount) {
      const { history, match } = this.props;
      history.push(`${match.url}/chemical-probes`);
    }
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { ensgId, symbol, chemicalProbes, classes, match } = this.props;

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
                <Typography variant="body2" align="center" gutterBottom>
                  Number of chemical probes developed for {symbol}
                </Typography>
              </div>
            ) : chemicalProbes.hasProbeMinerLink ? (
              <Typography variant="body2" align="center" gutterBottom>
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
            ) : (
              <Typography variant="body2" align="center">
                No information available for&nbsp;{symbol}
              </Typography>
            )}

            <Typography variant="caption" gutterBottom>
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
        <Route
          path={`${match.path}/chemical-probes`}
          render={() => {
            return (
              <ChemicalProbesModal
                open
                onClose={this.handleClose}
                ensgId={ensgId}
                symbol={symbol}
              />
            );
          }}
        />
      </Grid>
    );
  }
}

ChemicalProbesWidget.widgetName = 'chemical probes';

export default withStyles(styles)(withRouter(ChemicalProbesWidget));

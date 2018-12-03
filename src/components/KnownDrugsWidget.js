import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import TrialsHistogram from './TrialsHistogram';
import KnownDrugsModal from './KnownDrugsModal';
import AntibodyIcon from '../icons/AntibodyIcon';
import OligonucleotideIcon from '../icons/OligonucleotideIcon';
import ProteinIcon from '../icons/ProteinIcon';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

class KnownDrugsWidget extends Component {
  static widgetName = 'known drugs';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/known-drugs`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const {
      ensgId,
      symbol,
      drugs: { count, modalities, trialsByPhase },
      classes,
      match,
    } = this.props;

    console.log('modalities', modalities);

    return (
      <Grid item md={9}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Known drugs
            </Typography>
            <Grid container>
              <Grid item md={4}>
                <Typography>Modalities</Typography>
                <AntibodyIcon />
                <OligonucleotideIcon />
                <ProteinIcon />
              </Grid>
              <Grid item md={4}>
                <Typography variant="h4" align="center">
                  {count}
                </Typography>
                <Typography align="center">
                  number of drugs associated with {symbol} with these
                  modalities:
                </Typography>
              </Grid>
              <Grid item md={4}>
                <TrialsHistogram trialsByPhase={trialsByPhase} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/known-drugs`}
          render={() => {
            return (
              <KnownDrugsModal
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

export default withStyles(styles)(withRouter(KnownDrugsWidget));

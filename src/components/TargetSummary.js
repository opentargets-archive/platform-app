import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Button } from 'ot-ui';

import TargetIcon from '../icons/TargetIcon';
import AssociationsIcon from '../icons/AssociationsIcon';

const summaryStyles = theme => ({
  targetIcon: {
    width: '40px',
    height: '65px',
    fill: '#7b196a',
    marginRight: '12px',
  },
  symbol: {
    color: '#7b196a',
    fontWeight: 500,
  },
  associatedIcon: {
    marginRight: '6px',
    fill: 'white',
  },
  associatedDiseases: {
    height: '40px',
  },
});

const TargetSummary = ({ classes, symbol, name, synonyms, description }) => (
  <Fragment>
    <Grid container justify="space-between">
      <Grid item>
        <Grid container>
          <Grid item>
            <TargetIcon className={classes.targetIcon} />
          </Grid>
          <Grid item>
            <Typography className={classes.symbol} variant="h4">
              {symbol}
            </Typography>
            <Typography variant="subtitle2">{name}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button gradient className={classes.associatedDiseases}>
          <AssociationsIcon className={classes.associatedIcon} />
          View associated diseases
        </Button>
      </Grid>
    </Grid>
    <Grid container>
      <Typography variant="body2">{description}</Typography>
    </Grid>
    <Grid>Synonyms: {synonyms.join(', ')}</Grid>
  </Fragment>
);

export default withStyles(summaryStyles)(TargetSummary);

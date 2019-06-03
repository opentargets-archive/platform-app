import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

import TargetIcon from '../icons/TargetIcon';

const summaryStyles = theme => ({
  titleContainer: {
    marginBottom: '10px',
  },
  targetIcon: {
    width: '40px',
    height: '65px',
    fill: theme.palette.primary.main,
    marginRight: '12px',
  },
  symbol: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  name: {
    display: 'flex',
    paddingLeft: '5px',
    alignItems: 'center',
  },
  geneticsLink: {
    alignItems: 'center',
    display: 'flex',
    height: '35px',
    // borderRadius: '3px',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '0 10px',
    textDecoration: 'none',
  },
});

const TargetHeader = ({ classes, ensgId, symbol, name, uniprotId }) => (
  <Fragment>
    <Grid className={classes.titleContainer} container justify="space-between">
      <Grid item>
        <Grid container>
          <Grid item>
            <TargetIcon className={classes.targetIcon} />
          </Grid>
          <Grid item>
            <Grid container>
              <Typography className={classes.symbol} variant="h4">
                {symbol}
              </Typography>
              <Typography className={classes.name} variant="subtitle2">
                {name}
              </Typography>
            </Grid>
            <Grid container>
              <Typography>
                Ensembl:{' '}
                <Link
                  external
                  to={`http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${ensgId}`}
                >
                  {ensgId}
                </Link>{' '}
                | UniProt:{' '}
                <Link
                  external
                  to={`https://www.uniprot.org/uniprot/${uniprotId}`}
                >
                  {uniprotId}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <a
          className={classes.geneticsLink}
          href={`https://genetics.opentargets.org/gene/${ensgId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View {symbol} profile in Open Targets Genetics
        </a>
      </Grid>
    </Grid>
  </Fragment>
);

export default withStyles(summaryStyles)(TargetHeader);

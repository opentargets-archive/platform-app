import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import TargetIcon from '../../icons/TargetIcon';
import Ensembl from './externalLinks/Ensembl';
import UniProt from './externalLinks/UniProt';
import GeneCards from './externalLinks/GeneCards';
import HGNC from './externalLinks/HGNC';
import TEP from './externalLinks/TEP';
import CRISPRdepmap from './externalLinks/CRISPRdepmap';

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
                <Ensembl ensgId={ensgId} first />
                <UniProt uniprotId={uniprotId} />
                <GeneCards symbol={symbol} />
                <HGNC symbol={symbol} />
                <CRISPRdepmap symbol={symbol} />
                <TEP ensgId={ensgId} symbol={symbol} />
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

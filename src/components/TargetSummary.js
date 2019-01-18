import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Button } from 'ot-ui';

import LongText from './LongText';
import TargetIcon from '../icons/TargetIcon';
import AssociationsIcon from '../icons/AssociationsIcon';

const summaryStyles = theme => ({
  titleContainer: {
    marginBottom: '30px',
  },
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
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  geneticsLink: {
    alignItems: 'center',
    display: 'flex',
    height: '35px',
    borderRadius: '3px',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: '#7b196a',
    color: 'white',
    padding: '0 10px',
    textDecoration: 'none',
  },
  associatedIcon: {
    marginRight: '6px',
    fill: 'white',
  },
  associatedDiseases: {
    backgroundColor: '#7b196a',
    color: 'white',
    position: 'relative',
    top: '14px',
    height: '40px',
  },
  description: {
    marginBottom: '30px',
  },
  synonymText: {
    display: 'inline-block',
  },
  synonym: {
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '10px',
    marginRight: '5px',
    marginBottom: '4px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
});

const TargetSummary = ({
  classes,
  ensgId,
  symbol,
  name,
  synonyms,
  description,
}) => (
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
                <a
                  href={`http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${ensgId}`}
                >
                  {ensgId}
                </a>{' '}
                | UniProt:
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
          <AssociationsIcon className={classes.associatedIcon} />
          View {symbol} profile in Open Targets Genetics
        </a>
      </Grid>
    </Grid>
    <Grid className={classes.description} container>
      <Typography variant="body2">
        <LongText lineLimit={3}>{description}</LongText>
      </Typography>
    </Grid>
    <Grid container>
      <Grid item md={1}>
        <Typography className={classes.synonymText} variant="subtitle2">
          Synonyms:
        </Typography>
      </Grid>
      <Grid item md={10}>
        {synonyms.map(synonym => {
          return (
            <Typography
              key={synonym}
              className={classes.synonym}
              variant="caption"
            >
              {synonym}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  </Fragment>
);

export default withStyles(summaryStyles)(TargetSummary);

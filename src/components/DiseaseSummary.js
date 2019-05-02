import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

import LongText from './LongText';
import TargetIcon from '../icons/TargetIcon';

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
  titleLink: {
    color: theme.palette.primary.main,
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

const DiseaseSummary = ({ classes, efoId, name, synonyms, description }) => (
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
                {name}
              </Typography>
              {/* <Typography className={classes.name} variant="subtitle2">
                {name}
              </Typography> */}
            </Grid>
            <Grid container>
              <Typography>
                EFO:{' '}
                <Link
                  external
                  to={`https://www.ebi.ac.uk/ols/ontologies/efo/terms?iri=http%3A%2F%2Fwww.ebi.ac.uk%2Fefo%2F${efoId}`}
                >
                  {efoId}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item>
        <a
          className={classes.geneticsLink}
          href={`https://genetics.opentargets.org/gene/${ensgId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View {symbol} profile in Open Targets Genetics
        </a>
      </Grid> */}
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

export default withStyles(summaryStyles)(DiseaseSummary);

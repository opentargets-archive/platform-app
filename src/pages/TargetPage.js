import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import BasePage from './BasePage';
import TargetIcon from '../icons/TargetIcon';
import TargetTabs from '../components/TargetTabs';

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    targetSummary(ensgId: $ensgId) {
      id
      name
      symbol
      description
      synonyms
    }
  }
`;

const summaryStyles = theme => ({
  targetIcon: {
    width: '38px',
    height: '55px',
    fill: '#7b196a',
  },
  symbol: {
    color: '#7b196a',
  },
});

let TargetSummary = ({ classes, symbol, name, synonyms, description }) => (
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
        <button>View associated diseases</button>
      </Grid>
    </Grid>
    <Grid container>
      <Typography variant="body2">{description}</Typography>
    </Grid>
    <Grid>Synonyms: {synonyms.join(', ')}</Grid>
  </Fragment>
);

TargetSummary = withStyles(summaryStyles)(TargetSummary);

const TargetPage = ({ match }) => {
  const { ensgId } = match.params;
  return (
    <BasePage>
      <Query query={targetQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          const { symbol, name, synonyms, description } = data.targetSummary;
          return (
            <Fragment>
              <TargetSummary
                symbol={symbol}
                name={name}
                synonyms={synonyms}
                descript={description}
              />
              <TargetTabs />
            </Fragment>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default TargetPage;

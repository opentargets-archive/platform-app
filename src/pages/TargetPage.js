import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import BasePage from './BasePage';
import TargetIcon from '../icons/TargetIcon';

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

const styles = theme => ({
  targetIcon: {
    width: '38px',
    height: '55px',
  },
});

const TargetPage = ({ match, classes }) => {
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
              <Grid container justify="space-between">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <TargetIcon className={classes.targetIcon} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">{symbol}</Typography>
                      <Typography variant="subtitle2">{name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <button>View associated diseases</button>
                </Grid>
              </Grid>
              <Grid container>{description}</Grid>
              <Grid>Synonyms: {synonyms.join(', ')}</Grid>
            </Fragment>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default withStyles(styles)(TargetPage);

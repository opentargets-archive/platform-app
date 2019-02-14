import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';

import FilterTable from './FilterTable';

const query = gql`
  query KnownDrugsQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        drugs {
          rows {
            disease {
              id
              name
            }
            target {
              id
              symbol
            }
            drug {
              id
              name
              type
              activity
            }
            clinicalTrial {
              phase
              status
              sourceUrl
              sourceName
            }
            mechanismOfAction {
              name
              sourceName
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
  dcChartContainer: {
    padding: '8px',
  },
});

const KnownDrugsDetail = ({ ensgId, symbol, sources }) => {
  return (
    <React.Fragment>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.drugs;
          return <FilterTable rows={rows} symbol={symbol} />;
        }}
      </Query>
    </React.Fragment>
  );
};

export default withStyles(styles)(KnownDrugsDetail);

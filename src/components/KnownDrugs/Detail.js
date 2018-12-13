import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
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
      <Typography variant="h5">{symbol} - Known Drugs</Typography>
      <Typography>Drugs in clinical trials or approved for {symbol}</Typography>
      <Typography variant="caption">
        Source{sources.length > 1 ? 's' : null}:{' '}
        {sources.map((d, i) => (
          <React.Fragment key={d.name}>
            {i > 0 ? ' ' : null}
            <a href={d.url} target="_blank" rel="noopener noreferrer">
              {d.name}
            </a>
          </React.Fragment>
        ))}
      </Typography>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.drugs;
          return <FilterTable rows={rows} />;
        }}
      </Query>
    </React.Fragment>
  );
};

export default withStyles(styles)(KnownDrugsDetail);

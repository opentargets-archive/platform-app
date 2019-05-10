import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';

const query = gql`
  query CancerHallmarksQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        cancerHallmarks {
          publicationsByHallmark {
            name
            promotes
            suppresses
            publications {
              pmId
              description
            }
          }
          roleInCancer {
            name
          }
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'hallmark',
    label: 'Hallmark',
  },
  {
    id: 'sources',
    label: 'Sources',
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

const CancerHallmarksDetail = ({ ensgId, symbol, sources }) => {
  return (
    <React.Fragment>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          return (
            <React.Fragment>
              <Typography>Cancer hallmarks</Typography>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default CancerHallmarksDetail;

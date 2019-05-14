import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';
import HallmarksTable from './HallmarksTable';

const query = gql`
  query CancerHallmarksQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        cancerHallmarks {
          roleInCancer {
            name
          }
          rows {
            name
            promotes
            suppresses
            pmId
            description
            activity
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

const CancerHallmarksDetail = ({ ensgId, symbol, roleInCancer }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const { rows } = data.target.details.cancerHallmarks;
        return (
          <React.Fragment>
            <Typography>
              Role in cancer:{' '}
              {roleInCancer.map(r => (
                <React.Fragment key={r.pmId}>
                  <Link
                    external
                    to={'http://europepmc.org/search?query=EXT_ID:$' + r.pmId}
                  >
                    {r.name}
                  </Link>
                  &nbsp;
                </React.Fragment>
              )) || 'No data'}
            </Typography>
            <HallmarksTable rows={rows} symbol={symbol} />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default CancerHallmarksDetail;

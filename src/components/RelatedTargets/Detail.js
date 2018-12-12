import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { OtTable } from 'ot-ui';

const query = gql`
  query RelatedTargetsQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        relatedTargets {
          rows {
            A {
              id
              symbol
            }
            B {
              id
              symbol
            }
            diseaseCountA
            diseaseCountB
            diseaseCountAAndB
            diseaseCountAOrB
          }
        }
      }
    }
  }
`;

const columns = symbol => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => <Link to={`target/${d.B.id}`}>{d.B.symbol}</Link>,
  },
  {
    id: 'diseaseCountAAndB',
    label: 'Number of shared disease associations',
  },
  {
    id: 'diseaseCountANotB',
    label: `Number of diseases associated with ${symbol} but not the related target`,
  },
  {
    id: 'diseaseCountBNotA',
    label: `Number of diseases associated with the related target but not ${symbol}`,
  },
];

const RelatedTargetsDetail = ({ ensgId, symbol }) => {
  return (
    <React.Fragment>
      <Typography>
        Other targets related to {symbol} based on common associated diseases
      </Typography>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.relatedTargets;
          const rowsMapped = rows.map(d => ({
            ...d,
            diseaseCountANotB: d.diseaseCountA - d.diseaseCountAAndB,
            diseaseCountBNotA: d.diseaseCountB - d.diseaseCountAAndB,
          }));
          return (
            <OtTable
              loading={loading}
              error={error}
              columns={columns(symbol)}
              data={rowsMapped}
            />
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default RelatedTargetsDetail;

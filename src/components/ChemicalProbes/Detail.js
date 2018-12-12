import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { OtTable } from 'ot-ui';

const query = gql`
  query ChemicalProbesQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        chemicalProbes {
          rows {
            chemicalProbe
            note
            sources {
              url
              name
            }
          }
          probeMinerUrl
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'chemicalProbe',
    label: 'Probe',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => (
      <React.Fragment>
        {rowData.sources.map((d, i, a) => (
          <React.Fragment key={i}>
            <a href={d.url} target="_blank" rel="noopener noreferrer">
              {d.name}
            </a>
            {i < a.length - 1 ? ' / ' : ''}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

const ChemicalProbesDetail = ({ ensgId, symbol }) => {
  return (
    <React.Fragment>
      <Typography component="h2">ChemicalProbes for {symbol}</Typography>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.chemicalProbes;
          return (
            <OtTable
              loading={loading}
              error={error}
              columns={columns}
              data={rows}
            />
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default ChemicalProbesDetail;

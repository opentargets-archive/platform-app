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

const ChemicalProbesDetail = ({ ensgId, symbol, sources }) => {
  return (
    <React.Fragment>
      <Typography variant="h5">{symbol} - Chemical Probes</Typography>
      <Typography>
        Information on chemical probes that have been developed for {symbol}
      </Typography>
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

          const { rows, probeMinerUrl } = data.target.details.chemicalProbes;
          return (
            <React.Fragment>
              {rows.length > 0 ? (
                <OtTable
                  loading={loading}
                  error={error}
                  columns={columns}
                  data={rows}
                />
              ) : null}

              {probeMinerUrl ? (
                <React.Fragment>
                  Further chemical probes available at{' '}
                  <a
                    href="https://europepmc.org/articles/PMC5875005"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ProbeMiner
                  </a>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default ChemicalProbesDetail;

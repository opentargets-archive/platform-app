import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';

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
            <Link external to={d.url}>
              {d.name}
            </Link>
            {i < a.length - 1 ? ' / ' : ''}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    export: rowData => rowData.sources.map(d => d.url).join(', '),
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

const ChemicalProbesDetail = ({ ensgId, symbol, sources }) => {
  return (
    <React.Fragment>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows, probeMinerUrl } = data.target.details.chemicalProbes;
          return (
            <React.Fragment>
              {rows.length > 0 ? (
                <React.Fragment>
                  <DataDownloader
                    tableHeaders={columns}
                    rows={rows}
                    fileStem={`${symbol}-chemical-probes`}
                  />
                  <OtTableRF columns={columns} data={rows} />
                </React.Fragment>
              ) : null}

              {probeMinerUrl ? (
                <React.Fragment>
                  <Typography>
                    Potential chemical probes can be explored with{' '}
                    <Link external to={probeMinerUrl}>
                      ProbeMiner
                    </Link>
                    .
                  </Typography>
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

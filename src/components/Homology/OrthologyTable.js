import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { DataDownloader, OtTableRF, Link, significantFigures } from 'ot-ui';

const query = gql`
  query OrthologyTableQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        homology {
          rows {
            dNdS
            species
            speciesId
            homologyType
            queryPercentageIdentity
            targetPercentageIdentity
            targetGeneId
            targetGeneSymbol
          }
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'species',
    label: 'Species',
  },
  {
    id: 'homologyType',
    label: 'Homology type',
  },
  {
    id: 'targetGeneSymbol',
    label: 'Orthologue and ID',
    renderCell: d => (
      <React.Fragment>
        {d.targetGeneSymbol} (
        <Link
          external
          to={`http://www.ensembl.org/${d.speciesId}/Gene/Summary?g=${
            d.targetGeneId
          }`}
        >
          {d.targetGeneId}
        </Link>
        )
      </React.Fragment>
    ),
  },
  {
    id: 'dNdS',
    label: `dN/dS`,
    renderCell: d => (d.dNdS ? significantFigures(d.dNdS) : 'N/A'),
  },
  {
    id: 'queryPercentageIdentity',
    label: `Query %id`,
    renderCell: d =>
      d.queryPercentageIdentity
        ? significantFigures(d.queryPercentageIdentity)
        : 'N/A',
  },
  {
    id: 'targetPercentageIdentity',
    label: `Target %id`,
    renderCell: d =>
      d.targetPercentageIdentity
        ? significantFigures(d.targetPercentageIdentity)
        : 'N/A',
  },
];

const downloadColumns = [
  {
    id: 'species',
    label: 'Species',
  },
  {
    id: 'homologyType',
    label: 'Homology type',
  },
  {
    id: 'targetGeneSymbol',
    label: 'Orthologue symbol',
  },
  {
    id: 'targetGeneId',
    label: 'Orthologue ID',
  },
  {
    id: 'dNdS',
    label: `dN/dS`,
  },
  {
    id: 'queryPercentageIdentity',
    label: `Query %id`,
  },
  {
    id: 'targetPercentageIdentity',
    label: `Target %id`,
  },
];

const OrthologyTable = ({ ensgId, symbol }) => (
  <Query query={query} variables={{ ensgId }}>
    {({ loading, error, data }) => {
      if (loading || error) return null;

      const { rows } = data.target.details.homology;
      return (
        <React.Fragment>
          <DataDownloader
            tableHeaders={downloadColumns}
            rows={rows}
            fileStem={`${symbol}-orthologues`}
          />
          <OtTableRF
            loading={loading}
            error={error}
            columns={columns}
            data={rows}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

export default OrthologyTable;

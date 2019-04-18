import React, { Fragment } from 'react';
import Select from 'react-select';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { OtTableRF, DataDownloader, Link } from 'ot-ui';

const query = gql`
  query GeneOntologyQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        geneOntology {
          rows {
            id
            term
            category
          }
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'category',
    label: 'Category',
    renderCell: row => _.capitalize(row.category.replace(/_/g, ' ')),
    renderFilter: () => <Select isClearable placeholder="None" />,
  },
  {
    id: 'term',
    label: 'GO term',
    renderCell: row => {
      return (
        <Link external to={`https://www.ebi.ac.uk/QuickGO/GTerm?id=${row.id}`}>
          {row.term}
        </Link>
      );
    },
    renderFilter: () => <Select isClearable placeholder="None" />,
  },
  {
    id: 'view',
    label: 'View GO term in graph',
    renderCell: row => {
      return (
        <Fragment>
          <Link
            external
            to={`https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/${
              row.id
            }/chart`}
          >
            EBI QuickGO
          </Link>{' '}
          |{' '}
          <Link
            external
            to={`http://amigo.geneontology.org/visualize?inline=false&term_data=${
              row.id
            }&format=png&mode=amigo&term_data_type=string`}
          >
            AMIGO
          </Link>
        </Fragment>
      );
    },
  },
];

const downloadColumns = [
  { id: 'id', label: 'GO code' },
  { id: 'category', label: 'Category' },
  { id: 'term', label: 'GO term' },
];

const GeneOntologyDetail = ({ symbol, ensgId }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const { rows } = data.target.details.geneOntology;
        return (
          <Fragment>
            <DataDownloader
              tableHeaders={downloadColumns}
              rows={rows}
              fileStem={`${symbol}-gene-ontology`}
            />
            <OtTableRF columns={columns} data={rows} filters />
          </Fragment>
        );
      }}
    </Query>
  );
};

export default GeneOntologyDetail;

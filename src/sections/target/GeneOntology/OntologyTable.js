import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Link from '../../../components/Link';
import ColumnFilteringDataTable from '../../../components/ColumnFilteringDataTable';

const capitalizeSnakeCase = term => {
  return _.capitalize(term.replace(/_/g, ' '));
};

const getColumns = uniprotId => {
  return [
    {
      id: 'category',
      label: 'Category',
      renderCell: row => capitalizeSnakeCase(row.category),
      filterable: true,
      dropdownFilterValue: row => capitalizeSnakeCase(row.category),
      sortable: true,
    },
    {
      id: 'term',
      label: 'GO term',
      renderCell: row => {
        return (
          <Link
            external
            to={`https://www.ebi.ac.uk/QuickGO/GTerm?id=${row.id}`}
          >
            {row.term}
          </Link>
        );
      },
      filterable: true,
      sortable: true,
    },
    {
      id: 'id',
      label: 'Annotation references',
      renderCell: row => {
        const quickGoLink = uniprotId
          ? `https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=${uniprotId}&goId=${
              row.id
            }`
          : `https://www.ebi.ac.uk/QuickGO/annotations?goId=${row.id}`;
        return (
          <Link external to={quickGoLink}>
            EBI Quick GO
          </Link>
        );
      },
      exportLabel: 'GO code',
    },
  ];
};

class OntologyTable extends Component {
  render() {
    const { symbol, rows, uniprotId } = this.props;

    const columns = getColumns(uniprotId);

    return (
      <Fragment>
        <ColumnFilteringDataTable
          columns={columns}
          rows={rows}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-gene-ontology`}
        />
      </Fragment>
    );
  }
}

export default OntologyTable;

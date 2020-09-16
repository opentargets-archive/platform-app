import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import { OtTableRF, DataDownloader, Link } from 'ot-ui';

const capitalizeSnakeCase = term => {
  return _.capitalize(term.replace(/_/g, ' '));
};

const getColumns = (
  categoryOptions,
  categoryFilterHandler,
  termOptions,
  termFilterHandler,
  uniprotId
) => {
  return [
    {
      id: 'category',
      label: 'Category',
      renderCell: row => capitalizeSnakeCase(row.category),
      renderFilter: () => (
        <Select
          isClearable
          options={categoryOptions}
          onChange={categoryFilterHandler}
        />
      ),
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
      renderFilter: () => (
        <Select
          isClearable
          options={termOptions}
          onChange={termFilterHandler}
        />
      ),
    },
    {
      id: 'references',
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
    },
  ];
};

const downloadColumns = [
  { id: 'id', label: 'GO code' },
  { id: 'category', label: 'Category' },
  { id: 'term', label: 'GO term' },
];

const getCategoryOptions = rows => {
  return _.uniqBy(rows, 'category').map(row => ({
    label: capitalizeSnakeCase(row.category),
    value: row.category,
  }));
};

const getTermOptions = rows => {
  return _.uniqBy(rows, 'term').map(row => ({
    label: row.term,
    value: row.term,
  }));
};

class OntologyTable extends Component {
  state = {
    filteredRows: this.props.rows,
  };

  categoryFilterHandler = selection => {
    const { ontologyXf, categoryDim } = this;

    if (selection) {
      categoryDim.filter(d => d === selection.value);
    } else {
      categoryDim.filterAll();
    }

    this.setState({ filteredRows: ontologyXf.allFiltered() });
  };

  termFilterHandler = selection => {
    const { ontologyXf, termDim } = this;

    if (selection) {
      termDim.filter(d => d === selection.value);
    } else {
      termDim.filterAll();
    }

    this.setState({ filteredRows: ontologyXf.allFiltered() });
  };

  componentDidMount() {
    this.ontologyXf = crossfilter(this.props.rows);
    this.categoryDim = this.ontologyXf.dimension(row => row.category);
    this.termDim = this.ontologyXf.dimension(row => row.term);
  }

  render() {
    const { symbol, rows, uniprotId } = this.props;
    const { filteredRows } = this.state;
    const categoryOptions = getCategoryOptions(rows);
    const termOptions = getTermOptions(rows);

    const columns = getColumns(
      categoryOptions,
      this.categoryFilterHandler,
      termOptions,
      this.termFilterHandler,
      uniprotId
    );

    return (
      <Fragment>
        <DataDownloader
          tableHeaders={downloadColumns}
          rows={filteredRows}
          fileStem={`${symbol}-gene-ontology`}
        />
        <OtTableRF columns={columns} data={filteredRows} filters />
      </Fragment>
    );
  }
}

export default OntologyTable;

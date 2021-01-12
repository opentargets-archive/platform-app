import React, { Component, Fragment } from 'react';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import { TextField } from '@material-ui/core';
import _ from 'lodash';

import DataDownloader from '../../../components/DataDownloader';
import Link from '../../../components/Link';
import OtTableRF from '../../../components/OtTableRF';

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
        <Autocomplete
          options={categoryOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={categoryFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
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
        <Autocomplete
          options={termOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={termFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
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

  categoryFilterHandler = (e, selection) => {
    const { ontologyXf, categoryDim } = this;

    if (selection) {
      categoryDim.filter(d => d === selection.value);
    } else {
      categoryDim.filterAll();
    }

    this.setState({ filteredRows: ontologyXf.allFiltered() });
  };

  termFilterHandler = (e, selection) => {
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

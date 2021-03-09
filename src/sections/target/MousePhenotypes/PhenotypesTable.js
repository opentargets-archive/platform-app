import React, { Component, Fragment } from 'react';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import { TextField } from '@material-ui/core';
import _ from 'lodash';

import DataDownloader from '../../../components/DataDownloader';
import Link from '../../../components/Link';
import OtTableRF from '../../../components/OtTableRF';

import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';

const getColumns = (
  mouseGeneOptions,
  mouseGeneFilterHandler,
  categoryOptions,
  categoryFilterHandler,
  phenotypeOptions,
  phenotypeFilterHandler
) => {
  return [
    {
      id: 'mouseGeneSymbol',
      label: 'Mouse gene',
      renderCell: row => (
        <Link
          external
          to={`http://www.informatics.jax.org/marker/${row.mouseGeneId}`}
        >
          {row.mouseGeneSymbol}
        </Link>
      ),
      renderFilter: () => (
        <Autocomplete
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={mouseGeneFilterHandler}
          options={mouseGeneOptions}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
    },
    {
      id: 'categoryLabel',
      label: 'Phenotype category',
      renderFilter: () => (
        <Autocomplete
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          options={categoryOptions}
          onChange={categoryFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
    },
    {
      id: 'phenotypeLabel',
      label: 'Phenotype label',
      renderFilter: () => (
        <Autocomplete
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          options={phenotypeOptions}
          onChange={phenotypeFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
    },
    {
      id: 'subjectAllelicComposition',
      label: 'Allelic composition',
      renderCell: row => (
        <MouseModelAllelicComposition
          allelicComposition={row.subjectAllelicComposition}
          geneticBackground={row.subjectBackground}
        />
      ),
    },
    {
      id: 'pmIds',
      label: 'Sources',
      renderCell: row => {
        const query = row.pmIds.map(pmId => `EXT_ID:${pmId}`).join(' OR ');
        return (
          <Link external to={`https://europepmc.org/search?query=${query}`}>
            {row.pmIds.length} publications
          </Link>
        );
      },
    },
  ];
};

const getMouseGeneOptions = rows => {
  return _.uniqBy(rows, 'mouseGeneId').map(row => ({
    label: row.mouseGeneSymbol,
    value: row.mouseGeneId,
  }));
};

const getCategoryOptions = rows => {
  return _.uniqBy(rows, 'categoryLabel').map(row => ({
    label: row.categoryLabel,
    value: row.categoryLabel,
  }));
};

const getPhenotypeOptions = rows => {
  return _.uniqBy(rows, 'phenotypeLabel').map(row => ({
    label: row.phenotypeLabel,
    value: row.phenotypeLabel,
  }));
};

const downloadColumns = [
  { id: 'mouseGeneSymbol', label: 'Mouse gene' },
  { id: 'categoryLabel', label: 'Phenotype category' },
  { id: 'phenotypeLabel', label: 'Phenotype label' },
  { id: 'subjectAllelicComposition', label: 'Allelic composition' },
  { id: 'subjectBackground', label: 'Subject background' },
  { id: 'pmIds', label: 'Sources' },
];

const getDownloadRows = rows => {
  return rows.map(row => {
    const query = row.pmIds.map(pmId => `EXT_ID:${pmId}`).join(' OR ');

    return {
      mouseGeneSymbol: row.mouseGeneSymbol,
      categoryLabel: row.categoryLabel,
      phenotypeLabel: row.phenotypeLabel,
      subjectAllelicComposition: row.subjectAllelicComposition,
      subjectBackground: row.subjectBackground,
      pmIds: `https://europepmc.org/search?query=${query}`,
    };
  });
};

class PhenotypesTable extends Component {
  state = {
    filteredRows: this.props.rows,
  };

  mouseGeneFilterHandler = (e, selection) => {
    const { phenotypesXf, mouseGeneDim } = this;

    if (selection) {
      mouseGeneDim.filter(d => d === selection.value);
    } else {
      mouseGeneDim.filterAll();
    }

    this.setState({ filteredRows: phenotypesXf.allFiltered() });
  };

  categoryFilterHandler = (e, selection) => {
    const { phenotypesXf, categoryDim } = this;
    if (selection) {
      categoryDim.filter(d => d === selection.value);
    } else {
      categoryDim.filterAll();
    }

    this.setState({ filteredRows: phenotypesXf.allFiltered() });
  };

  phenotypeFilterHandler = (e, selection) => {
    const { phenotypesXf, phenotypeDim } = this;

    if (selection) {
      phenotypeDim.filter(d => d === selection.value);
    } else {
      phenotypeDim.filterAll();
    }
    this.setState({ filteredRows: phenotypesXf.allFiltered() });
  };

  componentDidMount() {
    this.phenotypesXf = crossfilter(this.props.rows);
    this.mouseGeneDim = this.phenotypesXf.dimension(row => row.mouseGeneId);
    this.categoryDim = this.phenotypesXf.dimension(row => row.categoryLabel);
    this.phenotypeDim = this.phenotypesXf.dimension(row => row.phenotypeLabel);
  }

  render() {
    const { symbol, rows, classes } = this.props;
    const { filteredRows } = this.state;
    const mouseGeneOptions = getMouseGeneOptions(rows);
    const categoryOptions = getCategoryOptions(rows);
    const phenotypeOptions = getPhenotypeOptions(rows);

    const downloadRows = getDownloadRows(rows);

    const columns = getColumns(
      mouseGeneOptions,
      this.mouseGeneFilterHandler,
      categoryOptions,
      this.categoryFilterHandler,
      phenotypeOptions,
      this.phenotypeFilterHandler,
      classes
    );

    return (
      <Fragment>
        <DataDownloader
          tableHeaders={downloadColumns}
          rows={downloadRows}
          fileStem={`${symbol}-mouse-phenotypes`}
        />
        <OtTableRF filters columns={columns} data={filteredRows} />
      </Fragment>
    );
  }
}

class PhenotypesTableAdapter extends Component {
  render() {
    const { symbol, data, classes } = this.props;
    return (
      <PhenotypesTable
        rows={transformToRows(data)}
        symbol={symbol}
        classes={classes}
      />
    );
  }
}

const transformToRows = mousePhenotypes => {
  const rows = [];
  if (!mousePhenotypes) {
    return rows;
  }
  for (const mousePhenotype of mousePhenotypes) {
    for (const phenotype of mousePhenotype.phenotypes) {
      for (const phenotypeGenotype of phenotype.genotypePhenotype) {
        rows.push({
          //mousePhenotypes
          mouseGeneId: mousePhenotype.id,
          mouseGeneSymbol: mousePhenotype.symbol,

          //phenotypes
          categoryLabel: phenotype.categoryLabel,

          //phenotypeGenotype
          phenotypeLabel: phenotypeGenotype.label,
          //FIXME splitting has to be removed after updating the graphql backend
          subjectAllelicComposition: phenotypeGenotype.subjectAllelicComposition.split(
            ','
          ),
          subjectBackground: phenotypeGenotype.subjectBackground,
          //FIXME splitting has to be removed after updating the graphql backend
          pmIds: phenotypeGenotype.pubmedId.split(','),
        });
      }
    }
  }

  return rows;
};

export default PhenotypesTableAdapter;

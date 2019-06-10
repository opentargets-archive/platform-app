import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { DataDownloader, OtTableRF, Link } from 'ot-ui';

const styles = () => ({
  allelicColumn: {
    float: 'left',
  },
});

const getColumns = (
  mouseGeneOptions,
  mouseGeneFilterHandler,
  categoryOptions,
  categoryFilterHandler,
  phenotypeOptions,
  phenotypeFilterHandler,
  classes
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
        <Select
          isClearable
          placeholder="None"
          options={mouseGeneOptions}
          onChange={mouseGeneFilterHandler}
        />
      ),
    },
    {
      id: 'categoryLabel',
      label: 'Phenotype category',
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={categoryOptions}
          onChange={categoryFilterHandler}
        />
      ),
    },
    {
      id: 'phenotypeLabel',
      label: 'Phenotype label',
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={phenotypeOptions}
          onChange={phenotypeFilterHandler}
        />
      ),
    },
    {
      id: 'subjectAllelicComposition',
      label: 'Allelic composition',
      renderCell: row => {
        return (
          <div className={classes.allelicColumn}>
            <Typography align="center">
              {row.subjectAllelicComposition
                .replace(/</g, '')
                .replace(/>/g, '')}
            </Typography>
            <Typography align="center">{row.subjectBackground}</Typography>
          </div>
        );
      },
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

  mouseGeneFilterHandler = selection => {
    const { phenotypesXf, mouseGeneDim } = this;

    if (selection) {
      mouseGeneDim.filter(d => d === selection.value);
    } else {
      mouseGeneDim.filterAll();
    }

    this.setState({ filteredRows: phenotypesXf.allFiltered() });
  };

  categoryFilterHandler = selection => {
    const { phenotypesXf, categoryDim } = this;
    if (selection) {
      categoryDim.filter(d => d === selection.value);
    } else {
      categoryDim.filterAll();
    }

    this.setState({ filteredRows: phenotypesXf.allFiltered() });
  };

  phenotypeFilterHandler = selection => {
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

export default withStyles(styles)(PhenotypesTable);

import React, { Component } from 'react';
import _ from 'lodash';
import crossfilter from 'crossfilter2';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link, DataDownloader, OtTableRF } from 'ot-ui';

import AssociationSummary from '../../../common/AssociationSummary';

const styles = () => ({
  panelTitle: {
    marginTop: '10px',
    marginBottom: '14px',
  },
});

const getColumns = (
  pathwayOptions,
  pathwayFilterHandler,
  idOptions,
  idFilterHandler,
  parentOptions,
  parentFilterHandler
) => {
  const columns = [
    {
      id: 'name',
      label: 'Pathway',
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={pathwayOptions}
          onChange={pathwayFilterHandler}
        />
      ),
    },
    {
      id: 'id',
      label: 'Pathway ID',
      renderCell: d => (
        <Link external to={`https://reactome.org/content/detail/${d.id}`}>
          {d.id}
        </Link>
      ),
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={idOptions}
          onChange={idFilterHandler}
        />
      ),
    },
    {
      id: 'parents',
      label: 'Top-level parent pathway',
      renderCell: d => (
        <React.Fragment>
          {d.parents.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <br /> : null}
              {p.name}
            </React.Fragment>
          ))}
        </React.Fragment>
      ),
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={parentOptions}
          onChange={parentFilterHandler}
        />
      ),
    },
    {
      id: 'diagram',
      label: 'View diagram',
      renderCell: d => (
        <React.Fragment>
          <Link
            external
            to={`https://reactome.org/ContentService/exporter/diagram/${
              d.id
            }.svg`}
          >
            SVG
          </Link>{' '}
          |{' '}
          <Link
            external
            to={`https://reactome.org/ContentService/exporter/diagram/${
              d.id
            }.png`}
          >
            PNG
          </Link>
        </React.Fragment>
      ),
    },
  ];

  return columns;
};

const getDownloadRows = rows => {
  return rows.map(row => ({
    name: row.name,
    id: row.id,
    parents: row.parents.map(parent => parent.name).join(', '),
    diagram: `https://reactome.org/ContentService/exporter/diagram/${
      row.id
    }.png`,
  }));
};

const getPathwayOptions = pathways => {
  return pathways.map(row => ({
    label: row.name,
    value: row.name,
  }));
};

const getIdOptions = pathways => {
  return pathways.map(row => ({
    label: row.id,
    value: row.id,
  }));
};

const getParentOptions = pathways => {
  return _.uniqBy(
    pathways.reduce((acc, pathway) => {
      pathway.parents.forEach(parent => {
        acc.push({
          label: parent.name,
          value: parent.id,
        });
      });
      return acc;
    }, []),
    'value'
  );
};

class OverviewTab extends Component {
  state = {
    filteredRows: this.props.lowLevelPathways,
  };

  pathwayFilterHandler = selection => {
    const { pathwayXf, pathwayDim } = this;

    if (selection) {
      pathwayDim.filter(d => d === selection.value);
    } else {
      pathwayDim.filterAll();
    }

    this.setState({ filteredRows: pathwayXf.allFiltered() });
  };

  idFilterHandler = selection => {
    const { pathwayXf, idDim } = this;

    if (selection) {
      idDim.filter(d => d === selection.value);
    } else {
      idDim.filterAll();
    }

    this.setState({ filteredRows: pathwayXf.allFiltered() });
  };

  parentFilterHandler = selection => {
    const { pathwayXf, parentDim } = this;

    if (selection) {
      parentDim.filter(d => {
        const index = d.findIndex(parent => parent.id === selection.value);
        return index !== -1;
      });
    } else {
      parentDim.filterAll();
    }

    this.setState({ filteredRows: pathwayXf.allFiltered() });
  };

  componentDidMount() {
    this.pathwayXf = crossfilter(this.props.lowLevelPathways);
    this.pathwayDim = this.pathwayXf.dimension(row => row.name);
    this.idDim = this.pathwayXf.dimension(row => row.id);
    this.parentDim = this.pathwayXf.dimension(row => row.parents);
  }

  render() {
    const { symbol, classes, topLevelPathways, lowLevelPathways } = this.props;
    const { filteredRows } = this.state;
    const pathwayOptions = getPathwayOptions(lowLevelPathways);
    const idOptions = getIdOptions(lowLevelPathways);
    const parentOptions = getParentOptions(lowLevelPathways);
    const columns = getColumns(
      pathwayOptions,
      this.pathwayFilterHandler,
      idOptions,
      this.idFilterHandler,
      parentOptions,
      this.parentFilterHandler
    );

    return (
      <React.Fragment>
        <Typography className={classes.panelTitle} variant="h6">
          Top-level parent pathways
        </Typography>
        <AssociationSummary data={topLevelPathways} />
        <DataDownloader
          tableHeaders={columns}
          rows={getDownloadRows(lowLevelPathways)}
          fileStem={`${symbol}-pathways`}
        />
        <OtTableRF
          filters
          loading={false}
          error={null}
          columns={columns}
          data={filteredRows}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(OverviewTab);

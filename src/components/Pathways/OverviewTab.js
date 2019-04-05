import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import { DataDownloader, OtTableRF } from 'ot-ui';

const styles = () => ({
  panelTitle: {
    marginTop: '10px',
  },
  topLevel: {
    marginTop: '10px',
  },
  topLevelPathwayContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    minHeight: '1.8rem',
    height: '100%',
  },
  topLevelPathwayContainerHighlight: {
    backgroundColor: '#891C76',
    color: 'white',
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://reactome.org/content/detail/${d.id}`}
        >
          {d.id}
        </a>
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://reactome.org/ContentService/exporter/diagram/${
              d.id
            }.svg`}
          >
            SVG
          </a>{' '}
          |{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://reactome.org/ContentService/exporter/diagram/${
              d.id
            }.png`}
          >
            PNG
          </a>
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
    value: row.id,
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
    const { filteredRows } = this.state;
    this.setState({
      filteredRows: selection
        ? filteredRows.filter(row => row.id === selection.value)
        : this.props.lowLevelPathways,
    });
  };

  idFilterHandler = selection => {
    const { filteredRows } = this.state;
    this.setState({
      filteredRows: selection
        ? filteredRows.filter(row => row.id === selection.value)
        : this.props.lowLevelPathways,
    });
  };

  parentFilterHandler = selection => {
    const { filteredRows } = this.state;
    this.setState({
      filteredRows: selection
        ? filteredRows.filter(row =>
            row.parents.map(parent => parent.id).includes(selection.value)
          )
        : this.props.lowLevelPathways,
    });
  };

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
        <Grid
          container
          alignItems="stretch"
          spacing={8}
          className={classes.topLevel}
        >
          {topLevelPathways.map(d => (
            <Grid item xs={4} md={2} key={d.id}>
              <Typography
                className={classNames(classes.topLevelPathwayContainer, {
                  [classes.topLevelPathwayContainerHighlight]: d.isAssociated,
                })}
              >
                {d.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
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

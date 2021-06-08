import React, { Component } from 'react';
import { Paper, Box, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import BasePage from '../../components/BasePage';
import Link from '../../components/Link';
import DataDownloader from '../../components/DataDownloader';
import OtTableRF from '../../components/OtTableRF';
import RelevantIcon from '../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../components/RMTL/NonRelevantIcon';
import UnspecifiedIcon from '../../components/RMTL/UnspecifiedIcon';
import RMTLData from './RMTL.json';

function getRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      ensemblID: mapping.Ensembl_ID,
      targetSymbol: mapping.Approved_Symbol,
      designation: mapping.FDA_Designation,
      version: mapping.Version + '',
    });
  });
  return rows;
}
function getColumns(
  targetSymbolOption,
  targetSymbolFilterHandler,
  designationOption,
  designationFilterHandler,
  versionOption,
  versionFilterHandler
) {
  const columns = [
    {
      id: 'targetSymbol',
      label: 'Target Symbol',
      renderCell: row => {
        const ensemblID = row.ensemblID;
        const url = '/target/' + ensemblID;
        return (
          <Link to={url} external>
            {row.targetSymbol}
          </Link>
        );
      },
      renderFilter: () => (
        <Autocomplete
          options={targetSymbolOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={targetSymbolFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Search..." margin="normal" />
          )}
        />
      ),
    },
    {
      id: 'designation',
      label: 'Designation',
      renderCell: row => {
        let RMTLIcon = <NonRelevantIcon />;
        if (row.designation === 'Relevant Molecular Target') {
          RMTLIcon = <RelevantIcon />;
        }
        return (
          <p>
            {RMTLIcon} {row.designation}
          </p>
        );
      },
      renderFilter: () => (
        <Autocomplete
          options={designationOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={designationFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
    },
    {
      id: 'version',
      label: 'Version',
      renderFilter: () => (
        <Autocomplete
          options={versionOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={versionFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
    },
  ];
  return columns;
}

function getDownloadRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      ensemblID: mapping.Ensembl_ID,
      targetSymbol: mapping.Approved_Symbol,
      designation: mapping.FDA_Designation,
      version: mapping.Version,
    });
  });
  return rows;
}

const downloadColumns = [
  { id: 'ensemblID', label: 'Ensembl_ID' },
  { id: 'targetSymbol', label: 'Approved_Symbol' },
  { id: 'designation', label: 'FDA_Designation' },
  { id: 'version', label: 'Version' },
];

const getTargetSymbolOptions = rows => {
  return _.uniqBy(rows, 'targetSymbol').map(row => ({
    label: row.targetSymbol,
    value: row.targetSymbol,
  }));
};

const getDesignationOptions = rows => {
  return _.uniqBy(rows, 'designation').map(row => ({
    label: row.designation,
    value: row.designation,
  }));
};

const getVersionOptions = rows => {
  return _.uniqBy(rows, 'version').map(row => ({
    label: row.version + '',
    value: row.version + '',
  }));
};

class RMTLPage extends Component {
  state = {
    filteredRows: getRows(RMTLData),
    pageSize: 25,
  };

  targetSymbolFilterHandler = (e, selection) => {
    const { rmtlXf, targetSymbolDim } = this;

    if (selection) {
      targetSymbolDim.filter(d => d === selection.value);
    } else {
      targetSymbolDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  designationFilterHandler = (e, selection) => {
    const { rmtlXf, designationDim } = this;

    if (selection) {
      designationDim.filter(d => d === selection.value);
    } else {
      designationDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  versionFilterHandler = (e, selection) => {
    const { rmtlXf, versionDim } = this;

    if (selection) {
      versionDim.filter(d => d === selection.value);
    } else {
      versionDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  componentDidMount() {
    this.rmtlXf = crossfilter(getRows(RMTLData));
    this.designationDim = this.rmtlXf.dimension(row => row.designation);
    this.versionDim = this.rmtlXf.dimension(row => row.version);
    this.targetSymbolDim = this.rmtlXf.dimension(row => row.targetSymbol);
  }
  handleRowsPerPageChange = newPageSize => {
    this.setState({ pageSize: newPageSize });
  };

  render() {
    const rows = getRows(RMTLData);
    // Download Data will be coming from getDownloadRows()
    const downloadRows = getDownloadRows(RMTLData);
    const { filteredRows, pageSize } = this.state;

    const loading = false,
      error = false;
    const targetSymbolOptions = getTargetSymbolOptions(rows);
    const designationOptions = getDesignationOptions(rows);
    const versionOptions = getVersionOptions(rows);

    const columns = getColumns(
      targetSymbolOptions,
      this.targetSymbolFilterHandler,
      designationOptions,
      this.designationFilterHandler,
      versionOptions,
      this.versionFilterHandler
    );
    const rowsPerPageOptions = [10, 25, 50];
    const FDA_RMTL_DocumentationUrl = '/rmtl';
    const FDA_Publication =
      'https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target';

    return (
      <BasePage>
        <Typography variant="h4" component="h1" paragraph>
          US Food & Drug Administration Relevant Molecular Target List (FDA
          RMTL)
        </Typography>
        <br />
        <hr />
        <br />
        <Typography paragraph>
          Targets in this list are important for studies of pediatric cancer,
          and have special legal requirements associated with drug development.
          See our
          <Link to={FDA_RMTL_DocumentationUrl}> FDA RMTL Documentation </Link>
          or the official{' '}
          <Link external to={FDA_Publication} external>
            FDA publication{' '}
          </Link>
          for details.
        </Typography>
        <Typography paragraph>
          Each target in the list is designated as either a <RelevantIcon />{' '}
          <b> Relevant Molecular Target </b> or <NonRelevantIcon />{' '}
          <b> Non-Relevant Molecular Target</b>. Any target not in this list is
          considered an <UnspecifiedIcon /> <b> Unspecified Target</b> by
          default.
        </Typography>
        <br />
        <hr />
        <br />
        <Paper variant="outlined" elevation={0}>
          <Box m={2}>
            {loading || error ? null : (
              <>
                <DataDownloader
                  tableHeaders={downloadColumns}
                  rows={downloadRows}
                  fileStem={`rmtl`}
                />
                <OtTableRF
                  filters
                  columns={columns}
                  data={filteredRows}
                  pageSize={pageSize}
                  onRowsPerPageChange={this.handleRowsPerPageChange}
                  rowsPerPageOptions={rowsPerPageOptions}
                />
              </>
            )}
          </Box>
        </Paper>
      </BasePage>
    );
  }
}
export default RMTLPage;

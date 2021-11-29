import React, { Component } from 'react';
import { Paper, Box, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import BasePage from '../../components/BasePage';
import Link from '../../components/Link';
import DataDownloader from '../../components/DataDownloader';
import CHOPTable from '../../components/RMTLTable';
import CHOPData from './chopTargetDiseaseData-EXAMPLE.json';

function getDownloadRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      geneEnsemblId: mapping.targetFromSourceId,
      EFO: mapping.diseaseFromSourceMappedId,
      geneSymbol: mapping.Gene_symbol,
      Disease: mapping.Disease,
      SNV: mapping.SNV,
      CNV: mapping.CNV,
      Fusion: mapping.Fusion,
      GeneExpression: mapping.GeneExpression,
    });
  });
  return rows;
}

function getRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      geneEnsemblId: mapping.targetFromSourceId,
      EFO: mapping.diseaseFromSourceMappedId,
      geneSymbol: mapping.Gene_symbol,
      Disease: mapping.Disease,
      SNV: mapping.SNV + "",
      CNV: mapping.CNV + "",
      Fusion: mapping.Fusion + "",
      GeneExpression: mapping.GeneExpression + "",
    });
  });
  return rows;
}
/*
 * genericComparator: comparing row1 and row2 using the input keyName.
 * return: -1 if first string is lexicographically less than second property
 *          1 if first string is lexicographically greater than second property
 *          0 if both property are equal
 */
function genericComparator(row1, row2, keyName) {
  const a =
    typeof row1[keyName] === 'string'
      ? row1[keyName].toLowerCase()
      : row1[keyName];
  const b =
    typeof row2[keyName] === 'string'
      ? row2[keyName].toLowerCase()
      : row2[keyName];

  return a < b ? -1 : a > b ? 1 : 0;
}

/*
{ 
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000174",
  "Gene_symbol": "TSPAN6",
  "Disease": "Ewing sarcoma",
  "SNV": 1,
  "CNV": 1,
  "Fusion": 1,
  "GeneExpression": 1
} */
function getColumns(
  geneSymbolOptions,
  geneSymbolFilterHandler,
  DiseaseOptions,
  DiseaseFilterHandler,
  SNVOptions,
  SNVFilterHandler,
  CNVOptions,
  CNVFilterHandler,
  FusionOptions,
  FusionFilterHandler,
  GeneExpressionOptions,
  GeneExpressionFilterHandler
) {
  const columns = [
    {
      id: 'geneSymbol',
      label: 'Gene symbol',
      renderCell: row => {
        const ensemblID = row.geneEnsemblId;
        const url = '/target/' + ensemblID;
        return ensemblID !== "Symbol_Not_Found" ? 
        ( <Link to={url}>{row.geneSymbol}</Link>):
         (<p> {row.geneSymbol} </p>)
      },
      renderFilter: () => (
        <Autocomplete
          options={geneSymbolOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={geneSymbolFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'geneSymbol'),
    },
    {
      id: 'Disease',
      label: 'Disease',
      renderCell: ({ EFO, Disease }) => 
        <Link to={`/disease/${EFO}`}>{Disease}</Link>,
      renderFilter: () => (
        <Autocomplete
          options={DiseaseOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={DiseaseFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'Disease'),
    },
    {
      id: 'geneEnsemblId',
      label: 'Evidence',
      renderCell: ({ geneEnsemblId, EFO }) => 
        <Link to={`/evidence/${geneEnsemblId}/${EFO}`} external>Evidence Page</Link>,
    },
    {
      id: 'SNV',
      label: 'SNV',
      renderFilter: () => (
        <Autocomplete
          options={SNVOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={SNVFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'SNV'),
    },
    {
      id: 'CNV',
      label: 'CNV',
      renderFilter: () => (
        <Autocomplete
          options={CNVOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={CNVFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'CNV'),
    },
    {
      id: 'Fusion',
      label: 'Fusion',
      renderFilter: () => (
        <Autocomplete
          options={FusionOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={FusionFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'Fusion'),
    },
    {
      id: 'GeneExpression',
      label: 'GeneExpression',
      renderFilter: () => (
        <Autocomplete
          options={GeneExpressionOptions}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={GeneExpressionFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'GeneExpression'),
    },
  ];
  return columns;
}

const downloadColumns = [
  { id: 'geneSymbol', label: 'geneSymbol' },
  { id: 'Disease', label: 'Disease' },
  { id: 'geneEnsemblId', label: 'geneEnsemblId' },
  { id: 'EFO', label: 'EFO' },
  { id: 'evidencePage', label: 'evidenceURL', 
    export: ({geneEnsemblId, EFO}) => `/evidence/${geneEnsemblId}/${EFO}`,
  },
  { id: 'SNV', label: 'SNV' },
  { id: 'CNV', label: 'CNV' },
  { id: 'Fusion', label: 'Fusion' },
  { id: 'GeneExpression', label: 'GeneExpression' },
];

const getGeneSymbolOptions = rows => {
  return _.uniqBy(rows, 'geneSymbol').map(row => ({
    label: row.geneSymbol,
    value: row.geneSymbol,
  }));
};

const getDiseaseOptions = rows => {
  return _.uniqBy(rows, 'Disease').map(row => ({
    label: row.Disease,
    value: row.Disease,
  }));
};

const getSNVOptions = rows => {
  return _.uniqBy(rows, 'SNV').map(row => ({
    label: row.SNV,
    value: row.SNV,
  }));
};

const getCNVOptions = rows => {
  return _.uniqBy(rows, 'CNV').map(row => ({
    label: row.CNV,
    value: row.CNV,
  }));
};

const getFusionOptions = rows => {
  return _.uniqBy(rows, 'Fusion').map(row => ({
    label: row.Fusion,
    value: row.Fusion,
  }));
};

const getGeneExpressionOptions = rows => {
  return _.uniqBy(rows, 'GeneExpression').map(row => ({
    label: row.GeneExpression,
    value: row.GeneExpression,
  }));
};

class CHOPPage extends Component {
  state = {
    filteredRows: getRows(CHOPData),
    pageSize: 25,
  };
  // Generic Function to handle column filtering
  columnFilterHandler = (e, selection, rmtlXf, columnDim) => {
    if (selection) {
      columnDim.filter(d => d === selection.value);
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  geneSymbolFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.geneSymbolDim);
  };

  DiseaseFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.DiseaseDim);
  };

  SNVFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.SNVDim);
  };

  CNVFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.CNVDim);
  };

  FusionFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.FusionDim);
  };

  GeneExpressionFilterHandler = (e, selection) => {
    this.columnFilterHandler(e, selection, this.rmtlXf, this.GeneExpressionDim);
  };

  componentDidMount() {
    this.rmtlXf = crossfilter(getRows(CHOPData));
    this.geneSymbolDim = this.rmtlXf.dimension(row => row.geneSymbol);
    this.DiseaseDim = this.rmtlXf.dimension(row => row.Disease);

    this.SNVDim = this.rmtlXf.dimension(row => row.SNV);
    this.CNVDim = this.rmtlXf.dimension(row => row.CNV);
    this.FusionDim = this.rmtlXf.dimension(row => row.Fusion);
    this.GeneExpressionDim = this.rmtlXf.dimension(row => row.GeneExpression);

  }

  handleRowsPerPageChange = newPageSize => {
    this.setState({ pageSize: newPageSize });
  };

  render() {
    const rows = this.state.filteredRows;
    // Download Data will be coming from getDownloadRows()
    const downloadRows = getDownloadRows(CHOPData);
    const { filteredRows, pageSize } = this.state;

    const loading = false,
      error = false;
    const geneSymbolOptions = getGeneSymbolOptions(rows);
    const DiseaseOptions = getDiseaseOptions(rows);

    const SNVOptions = getSNVOptions(rows);
    const CNVOptions = getCNVOptions(rows);
    const FusionOptions = getFusionOptions(rows);
    const GeneExpressionOptions = getGeneExpressionOptions(rows);

    const columns = getColumns(
      geneSymbolOptions,
      this.geneSymbolFilterHandler,
      DiseaseOptions,
      this.DiseaseFilterHandler,
      SNVOptions,
      this.SNVFilterHandler,
      CNVOptions,
      this.CNVFilterHandler,
      FusionOptions,
      this.FusionFilterHandler,
      GeneExpressionOptions,
      this.GeneExpressionFilterHandler
    );
    const rowsPerPageOptions = [10, 25, 50];
   
    return (
      <BasePage title="CHOP Target Disease Data">
        <Typography variant="h4" component="h1" paragraph>
          CHOP Target Disease Data - EXAMPLE
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
                  fileStem={`chopTargetDiseaseData-EXAMPLE`}
                />
                <CHOPTable
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
export default CHOPPage;

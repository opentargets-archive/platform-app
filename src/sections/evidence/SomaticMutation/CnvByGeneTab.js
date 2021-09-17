import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

import { genericComparator } from '../../../utils/comparators'

// Configuration for how the tables will display the data
const columns = [
  { id: 'Gene_symbol', label: 'Gene symbol', sortable: true,
    renderCell: ({ Gene_symbol, targetFromSourceId }) => 
      <Link to={`/target/${targetFromSourceId}`}> {Gene_symbol} </Link> },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'variantType', label: 'Variant type', sortable: true }, 
  { id: 'variantCategory', label: 'Variant category', sortable: true },
  { id: 'dataset', label: 'Dataset', sortable: true, comparator: (row1, row2) => genericComparator(row1, row2, 'Dataset') },
  { id: 'Disease', label: 'Disease', sortable: true, 
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> },
  { id: 'totalAlterationsOverPatientsInDataset', label: 'Total alterations/Patients in dataset', sortable: true },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'totalPrimaryTumorsAlteredOverPrimaryTumorsInDataset', label: 'Total primary tumors altered/Primary tumors in dataset', sortable: true },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true },
  { id: 'totalRelapseTumorsAlteredOverRelapseTumorsInDataset', label: 'Total relapse tumors altered/Relapse tumors in dataset', sortable: true },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable: true },
  { id: 'geneFullName', label: 'Gene full name', sortable: true },
  { id: 'RMTL', label: 'RMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer gene', sortable: true },
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB oncogene TSG', sortable: true },
  // { id: 'EFO', label: 'EFO', sortable: true },
  // { id: 'MONDO', label: 'MONDO', sortable: true },
]

const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'variantType' }, 
  { id: 'variantCategory' },
  { id: 'dataset' },
  { id: 'Disease' },
  { id: 'totalAlterationsOverPatientsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsAlteredOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsAlteredOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'geneFullName' },
  { id: 'RMTL', },
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
  { id: 'diseaseFromSourceMappedId', label: 'EFO' },
  { id: 'MONDO' },
]

function CnvByGeneTab({data}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          dataDownloaderColumns={dataDownloaderColumns}
          columns={columns}
          rows={data}
          dataDownloader
          showGlobalFilter
          rowsPerPageOptions={defaultRowsPerPageOptions}
          noWrapHeader={false}
          order="asc"
        />
      </Grid> 
    </Grid>
  )
}

export default CnvByGeneTab;
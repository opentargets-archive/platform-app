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
  { id: 'Variant_type', label: 'Variant type', sortable: true }, 
  { id: 'Variant_category', label: 'Variant category', sortable: true },
  { id: 'Dataset', label: 'Dataset', sortable: true, comparator: (row1, row2) => genericComparator(row1, row2, 'Dataset') },
  { id: 'Disease', label: 'Disease', sortable: true, 
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> },
  { id: 'Total_alterations/Patients_in_dataset', label: 'Total alterations/Patients in dataset', sortable: true },
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'Total_primary_tumors_altered/Primary_tumors_in_dataset', label: 'Total primary tumors altered/Primary tumors in dataset', sortable: true },
  { id: 'Frequency_in_primary_tumors', label: 'Frequency in primary tumors', sortable: true },
  { id: 'Total_relapse_tumors_altered/Relapse_tumors_in_dataset', label: 'Total relapse tumors altered/Relapse tumors in dataset', sortable: true },
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors', sortable: true },
  { id: 'Gene_full_name', label: 'Gene full name', sortable: true },
  { id: 'RMTL', label: 'RMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'OncoKB_cancer_gene', label: 'OncoKB cancer gene', sortable: true },
  { id: 'OncoKB_oncogene_TSG', label: 'OncoKB oncogene TSG', sortable: true },
  // { id: 'EFO', label: 'EFO', sortable: true },
  // { id: 'MONDO', label: 'MONDO', sortable: true },
]

const dataDownloaderColumns = [
  { id: 'Gene_symbol' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'Variant_type' }, 
  { id: 'Variant_category' },
  { id: 'Dataset' },
  { id: 'Disease' },
  { id: 'Total_alterations/Patients_in_dataset' },
  { id: 'Frequency_in_overall_dataset' },
  { id: 'Total_primary_tumors_altered/Primary_tumors_in_dataset' },
  { id: 'Frequency_in_primary_tumors' },
  { id: 'Total_relapse_tumors_altered/Relapse_tumors_in_dataset' },
  { id: 'Frequency_in_relapse_tumors' },
  { id: 'Gene_full_name' },
  { id: 'RMTL', },
  { id: 'OncoKB_cancer_gene' },
  { id: 'OncoKB_oncogene_TSG' },
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
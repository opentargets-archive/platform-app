import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  { id: 'FusionName', label: 'Fusion Name', sortable:true },
  { id: 'Fusion_Type', label: 'Fusion Type', sortable:true },
  { id: 'Gene_symbol', label: 'Gene symbol', sortable:true,
    renderCell: ({ Gene_symbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{Gene_symbol}</Link>
  },
  { id: 'Gene_Position', label: 'Gene Position', sortable:true },
  { id: 'Fusion_anno', label: 'Fusion anno', sortable:true },
  { id: 'BreakpointLocation', label: 'Breakpoint location', sortable:true },
  { id: 'annots', label: 'annots', sortable:true },
  { id: 'Kinase_domain_retained_Gene1A', label: 'Kinase domain retained Gene1A', sortable:true },
  { id: 'Kinase_domain_retained_Gene1B', label: 'Kinase domain retained Gene1B', sortable:true },
  { id: 'Reciprocal_exists_either_gene_kinase', label: 'Reciprocal exists either gene kinase', sortable:true },
  { id: 'Gene1A_anno', label: 'Gene1A anno', sortable:true },
  { id: 'Gene1B_anno', label: 'Gene1B anno', sortable:true },
  { id: 'Gene2A_anno', label: 'Gene2A anno', sortable:true },
  { id: 'Gene2B_anno', label: 'Gene2B anno', sortable:true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable:true },
  { id: 'Disease', label: 'Disease', sortable:true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> 
  },
  // { id: 'MONDO', label: 'MONDO', sortable:true },
  { id: 'RMTL', label: 'PMTL', sortable:true , renderCell: () => <RelevantIcon/>},
  // { id: 'EFO', label: 'EFO', sortable:true },
  { id: 'Dataset', label: 'Dataset', sortable:true },
  { id: 'Total_alterations_Over_Patients_in_dataset', label: 'Total alterations Over Patients in dataset', sortable:true },
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset', sortable:true },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable:true },
  { id: 'Frequency_in_primary_tumors', label: 'Frequency in primary tumors', sortable:true },
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset', sortable:true },
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors', sortable:true },
]
const dataDownloaderColumns = [
  { id: 'FusionName' },
  { id: 'Fusion_Type' },
  { id: 'Gene_symbol' },
  { id: 'Gene_Position' },
  { id: 'Fusion_anno' },
  { id: 'BreakpointLocation' },
  { id: 'annots' },
  { id: 'Kinase_domain_retained_Gene1A' },
  { id: 'Kinase_domain_retained_Gene1B' },
  { id: 'Reciprocal_exists_either_gene_kinase' },
  { id: 'Gene1A_anno' },
  { id: 'Gene1B_anno' },
  { id: 'Gene2A_anno' },
  { id: 'Gene2B_anno' },
  { id: 'targetFromSourceId', label: 'Gene_Ensembl_ID' },
  { id: 'Disease' },
  { id: 'MONDO' },
  { id: 'RMTL' },
  { id: 'diseaseFromSourceMappedId', label: 'EFO' },
  { id: 'Dataset' },
  { id: 'Total_alterations_Over_Patients_in_dataset' },
  { id: 'Frequency_in_overall_dataset' },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset' },
  { id: 'Frequency_in_primary_tumors' },
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset' },
  { id: 'Frequency_in_relapse_tumors' },
]

function FusionTab({data}) {
  console.log("data: ", data)
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

export default FusionTab;
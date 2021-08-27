import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  { id: 'Disease', label: 'Disease', 
    renderCell: ({ EFO, Disease }) => 
      <Link to={`/disease/${EFO}`}>{Disease}</Link>},
  {
    id: 'Gene_Symbol', label: 'Targets',
    renderCell: ({ Gene_Symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_Symbol}</Link>
  },
  {id: 'FusionName', label: 'Fusion Name'},
  {id: 'Fusion_Type', label: 'Fusion Type'},
  {id: 'Kinase_domain_retained_Gene1A', label: 'Kinase domain retained Gene1A'},
  {id: 'Kinase_domain_retained_Gene1B', label: 'Kinase domain retained Gene1B'},
  {id: 'reciprocal_exists', label: 'Reciprocal exists'},
  {id: 'annots', label: 'Annots'},
  {id: 'BreakpointLocation', label: 'Breakpoint location'},
  {id: 'Gene1A_anno', label: 'Gene1A anno'},
  {id: 'Gene1B_anno', label: 'Gene1B anno'},
  {id: 'Gene2A_anno', label: 'Gene2A anno'},
  {id: 'Gene2B_anno', label: 'Gene2B anno'},
  {id: 'Fusion_anno', label: 'Fusion anno'},
  {id: 'Reciprocal_exists_either_gene_kinase', label: 'Reciprocal exists either gene kinase'},
  {id: 'Gene_Position', label: 'Gene Position'},
  // {id: 'Gene_Symbol', label: 'Gene Symbol'},
  {id: 'Alt_ID', label: 'Alt ID'},
  {id: 'Total_alterations', label: 'Total alterations'},
  {id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset'},
  {id: 'Total_primary_tumors_mutated', label: 'Total primary tumors mutated'},
  {id: 'Total_relapse_tumors_mutated', label: 'Total relapse tumors mutated'},
  {id: 'Primary_tumors_in_dataset', label: 'Primary tumors in dataset'},
  {id: 'Relapse_tumors_in_dataset', label: 'Relapse tumors in dataset'},
  {id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset'},
  {id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset'},
  {id: 'Frequency_in_primary_tumors', label: 'Frequency in primary tumors'},
  {id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors'},
  // {id: 'Disease', label: 'Disease'},
  {id: 'Dataset', label: 'Dataset'},
  // {id: 'Gene_Ensembl_ID', label: 'Gene Ensembl ID'},
  // {id: 'Gene_full_name', label: 'Gene full name'},
  // {id: 'MONDO', label: 'MONDO'},
  { id: 'RMTL', label: 'PMTL', renderCell: () => <RelevantIcon/>},
  // {id: 'EFO', label: 'EFO'},
]
function FusionByGeneTab({data}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
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

export default FusionByGeneTab;
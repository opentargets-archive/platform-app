import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  { id:'Protein_change', label:'Protein change' },
  { id: 'Disease', label: 'Disease', 
    renderCell: ({ EFO, Disease }) => 
      <Link to={`/disease/${EFO}`}>{Disease}</Link>},
  {
    id: 'Gene_symbol', label: 'Targets',
    renderCell: ({ Gene_symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_symbol}</Link>
  },
  // { id:'Gene_symbol', label:'Gene symbol' },
  { id:'PMTL', label:'PMTL', renderCell: () => <RelevantIcon/>},
  { id:'Dataset', label:'Dataset' },
  // { id:'Disease', label:'Disease' },
  // { id:'EFO', label:'EFO' },
  // { id:'MONDO', label:'MONDO' },
  { id:'Variant_ID_hg38', label:'Variant ID hg38' },
  { id:'dbSNP_ID', label:'dbSNP ID' },
  { id:'VEP_impact', label:'VEP impact' },
  { id:'SIFT_impact', label:'SIFT impact' },
  { id:'PolyPhen_impact', label:'PolyPhen impact' },
  { id:'Variant_classification', label:'Variant classification' },
  { id:'Variant_type', label:'Variant type' },
  { id:'Gene_full_name', label:'Gene full name' },
  { id:'Protein_RefSeq_ID', label:'Protein RefSeq ID' },
  // { id:'Gene_Ensembl_ID', label:'Gene Ensembl ID' },
  { id:'Protein_Ensembl_ID', label:'Protein Ensembl ID' },
  { id:'Total_mutations_Over_Patients_in_dataset', label:'Total mutations Over Patients in dataset' },
  { id:'Frequency_in_overall_dataset', label:'Frequency in overall dataset' },
  { id:'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label:'Total primary tumors mutated Over Primary tumors in dataset' },
  { id:'Frequency_in_primary_tumors', label:'Frequency in primary tumors' },
  { id:'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label:'Total relapse tumors mutated Over Relapse tumors in dataset' },
  { id:'Frequency_in_relapse_tumors', label:'Frequency in relapse tumors' },
  { id:'HotSpot', label:'HotSpot' },
  { id:'OncoKB_cancer_gene', label:'OncoKB cancer gene' },
  { id:'OncoKB_oncogene_TSG', label:'OncoKB oncogene TSG' },
];

function SnvByVariantTab({data}) {
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

export default SnvByVariantTab;
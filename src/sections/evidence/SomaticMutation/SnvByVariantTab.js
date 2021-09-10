import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  {
    id: 'Gene_symbol', label: 'Gene symbol', sortable: true,
    renderCell: ({ Gene_symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_symbol}</Link>
  },
  { id:'Variant_ID_hg38', label:'Variant ID hg38', sortable: true },
  { id:'Protein_change', label:'Protein change', sortable: true},
  { id:'PMTL', label:'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id:'Dataset', label:'Dataset', sortable: true },
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ EFO, Disease }) => 
      <Link to={`/disease/${EFO}`}>{Disease}</Link>},
  // { id:'EFO', label:'EFO', sortable: true },
  // { id:'MONDO', label:'MONDO', sortable: true },
  { id:'dbSNP_ID', label:'dbSNP ID', sortable: true },
  { id:'VEP_impact', label:'VEP impact', sortable: true },
  { id:'SIFT_impact', label:'SIFT impact', sortable: true },
  { id:'PolyPhen_impact', label:'PolyPhen impact', sortable: true },
  { id:'Variant_classification', label:'Variant classification', sortable: true },
  { id:'Variant_type', label:'Variant type', sortable: true },
  { id:'Gene_full_name', label:'Gene full name', sortable: true },
  { id:'Protein_RefSeq_ID', label:'Protein RefSeq ID', sortable: true },
  { id:'Gene_Ensembl_ID', label:'Gene Ensembl ID', sortable: true },
  { id:'Protein_Ensembl_ID', label:'Protein Ensembl ID', sortable: true },
  { id:'Total_mutations_Over_Patients_in_dataset', label:'Total mutations Over Patients in dataset', sortable: true },
  { id:'Frequency_in_overall_dataset', label:'Frequency in overall dataset', sortable: true },
  { id:'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label:'Total primary tumors mutated Over Primary tumors in dataset', sortable: true },
  { id:'Frequency_in_primary_tumors', label:'Frequency in primary tumors', sortable: true },
  { id:'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label:'Total relapse tumors mutated Over Relapse tumors in dataset', sortable: true },
  { id:'Frequency_in_relapse_tumors', label:'Frequency in relapse tumors', sortable: true },
  { id:'HotSpot', label:'HotSpot', sortable: true },
  { id:'OncoKB_cancer_gene', label:'OncoKB cancer gene', sortable: true },
  { id:'OncoKB_oncogene_TSG', label:'OncoKB oncogene TSG', sortable: true },
];

const dataDownloaderColumns = [
  { id:'Gene_symbol' },
  { id:'Variant_ID_hg38' },
  { id:'Protein_change' },
  { id:'PMTL' },
  { id:'Dataset' },
  { id:'Disease' },
  { id:'EFO' },
  { id:'MONDO' },
  { id:'dbSNP_ID' },
  { id:'VEP_impact' },
  { id:'SIFT_impact' },
  { id:'PolyPhen_impact' },
  { id:'Variant_classification' },
  { id:'Variant_type' },
  { id:'Gene_full_name' },
  { id:'Protein_RefSeq_ID' },
  { id:'Gene_Ensembl_ID' },
  { id:'Protein_Ensembl_ID' },
  { id:'Total_mutations_Over_Patients_in_dataset' },
  { id:'Frequency_in_overall_dataset' },
  { id:'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset' },
  { id:'Frequency_in_primary_tumors' },
  { id:'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset' },
  { id:'Frequency_in_relapse_tumors' },
  { id:'HotSpot' },
  { id:'OncoKB_cancer_gene' },
  { id:'OncoKB_oncogene_TSG' },
]

function SnvByVariantTab({data}) {
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

export default SnvByVariantTab;
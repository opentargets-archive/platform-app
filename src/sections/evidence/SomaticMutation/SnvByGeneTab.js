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
    renderCell: ({ Gene_symbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{Gene_symbol}</Link>
  },
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'Dataset', label: 'Dataset', sortable: true },
  
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link>},
  { id: 'Gene_full_name', label: 'Gene full name', sortable: true },
  { id: 'Gene_type', label: 'Gene type', sortable: true },
  { id: 'Protein_RefSeq_ID', label: 'Protein RefSeq ID', sortable: true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'Protein_Ensembl_ID', label: 'Protein Ensembl ID', sortable: true },
  { id: 'Total_mutations_Over_Patients_in_dataset', label: 'Total mutations Over Patients in dataset', sortable: true },
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true },
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors', sortable: true },
  { id: 'OncoKB_cancer_gene', label: 'OncoKB cancer geneD', sortable: true},
  { id: 'OncoKB_oncogene_TSG', label: 'OncoKB oncogene TSG', sortable: true},
  { id: 'PedcBio_PedOT_oncoprint_plot_URL', label: 'PedcBio PedOT oncoprint plot URL', renderCell: ({PedcBio_PedOT_oncoprint_plot_URL}) => <Link external to={PedcBio_PedOT_oncoprint_plot_URL}> oncoprint </Link>},
  { id: 'PedcBio_PedOT_mutations_plot_URL', label: 'PedcBio PedOT mutations plot URL', renderCell: ({PedcBio_PedOT_mutations_plot_URL}) => <Link external to={PedcBio_PedOT_mutations_plot_URL}> mutations </Link>},
  // { id: 'EFO', label: 'EFO'},
  // { id: 'MONDO',label: 'MONDO'},
]

const dataDownloaderColumns = [
  { id: 'Gene_symbol' },
  { id: 'PMTL' },
  { id: 'Dataset' },
  { id: 'Disease' },
  { id: 'diseaseFromSourceMappedId', label:'EFO' },
  { id: 'MONDO' },
  { id: 'Gene_full_name' },
  { id: 'Gene_type' },
  { id: 'Protein_RefSeq_ID' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'Protein_Ensembl_ID' },
  { id: 'Total_mutations_Over_Patients_in_dataset' },
  { id: 'Frequency_in_overall_dataset' },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset' },
  { id: 'Frequency_in_relapse_tumors' },
  { id: 'OncoKB_cancer_gene' },
  { id: 'OncoKB_oncogene_TSG' },
  { id: 'PedcBio_PedOT_oncoprint_plot_URL' },
  { id: 'PedcBio_PedOT_mutations_plot_URL' },
]
function SnvByGeneTab({data}) {
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

export default SnvByGeneTab;
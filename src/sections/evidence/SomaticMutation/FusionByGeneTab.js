import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ EFO, Disease }) => 
      <Link to={`/disease/${EFO}`}>{Disease}</Link>},
  {
    id: 'Gene_Symbol', label: 'Targets', sortable: true,
    renderCell: ({ Gene_Symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_Symbol}</Link>
  },
  { id: 'FusionName', label: 'Fusion Name', sortable: true},
  { id: 'Fusion_Type', label: 'Fusion Type', sortable: true},
  { id: 'Kinase_domain_retained_Gene1A', label: 'Kinase domain retained Gene1A', sortable: true},
  { id: 'Kinase_domain_retained_Gene1B', label: 'Kinase domain retained Gene1B', sortable: true},
  { id: 'reciprocal_exists', label: 'Reciprocal exists', sortable: true},
  { id: 'annots', label: 'Annots', sortable: true},
  { id: 'BreakpointLocation', label: 'Breakpoint location', sortable: true},
  { id: 'Gene1A_anno', label: 'Gene1A anno', sortable: true},
  { id: 'Gene1B_anno', label: 'Gene1B anno', sortable: true},
  { id: 'Gene2A_anno', label: 'Gene2A anno', sortable: true},
  { id: 'Gene2B_anno', label: 'Gene2B anno', sortable: true},
  { id: 'Fusion_anno', label: 'Fusion anno', sortable: true},
  { id: 'Reciprocal_exists_either_gene_kinase', label: 'Reciprocal exists either gene kinase', sortable: true},
  { id: 'Gene_Position', label: 'Gene Position', sortable: true},
  { id: 'Alt_ID', label: 'Alt ID', sortable: true},
  { id: 'Total_alterations', label: 'Total alterations', sortable: true},
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset', sortable: true},
  { id: 'Total_primary_tumors_mutated', label: 'Total primary tumors mutated', sortable: true},
  { id: 'Total_relapse_tumors_mutated', label: 'Total relapse tumors mutated', sortable: true},
  { id: 'Primary_tumors_in_dataset', label: 'Primary tumors in dataset', sortable: true},
  { id: 'Relapse_tumors_in_dataset', label: 'Relapse tumors in dataset', sortable: true},
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true},
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset', sortable: true},
  { id: 'Frequency_in_primary_tumors', label: 'Frequency in primary tumors', sortable: true},
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors', sortable: true},
  { id: 'Dataset', label: 'Dataset', sortable: true},
  // { id: 'Gene_Ensembl_ID', label: 'Gene Ensembl ID', sortable: true},
  // { id: 'Gene_full_name', label: 'Gene full name', sortable: true},
  // { id: 'MONDO', label: 'MONDO', sortable: true},
  { id: 'RMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  // { id: 'EFO', label: 'EFO', sortable: true},
]
const dataDownloaderColumns = [
  { id: 'FusionName' },
  { id: 'Fusion_Type' },
  { id: 'Kinase_domain_retained_Gene1A' },
  { id: 'Kinase_domain_retained_Gene1B' },
  { id: 'reciprocal_exists' },
  { id: 'annots' },
  { id: 'BreakpointLocation' },
  { id: 'Gene1A_anno' },
  { id: 'Gene1B_anno' },
  { id: 'Gene2A_anno' },
  { id: 'Gene2B_anno' },
  { id: 'Fusion_anno' },
  { id: 'Reciprocal_exists_either_gene_kinase' },
  { id: 'Gene_Position' },
  { id: 'Gene_Symbol' },
  { id: 'Alt_ID' },
  { id: 'Total_alterations' },
  { id: 'Frequency_in_overall_dataset' },
  { id: 'Total_primary_tumors_mutated' },
  { id: 'Total_relapse_tumors_mutated' },
  { id: 'Primary_tumors_in_dataset' },
  { id: 'Relapse_tumors_in_dataset' },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset' },
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset' },
  { id: 'Frequency_in_primary_tumors' },
  { id: 'Frequency_in_relapse_tumors' },
  { id: 'Disease' },
  { id: 'Dataset' },
  { id: 'Gene_Ensembl_ID' },
  { id: 'Gene_full_name' },
  { id: 'MONDO' },
  { id: 'RMTL' },
  { id: 'EFO' },
]

function FusionByGeneTab({data}) {
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

export default FusionByGeneTab;
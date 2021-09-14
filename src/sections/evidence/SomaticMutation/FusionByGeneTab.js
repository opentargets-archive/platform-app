import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

// Configuration for how the tables will display the data
const columns = [
  { id: 'Gene_Symbol', label: 'Gene symbol', sortable: true,
      renderCell: ({ Gene_Symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_Symbol}</Link>
  },
  { id: 'Gene_Ensembl_ID', label: 'Gene Ensembl ID', sortable: true},
  { id: 'Disease', label: 'Disease', sortable: true,
      renderCell: ({ EFO, Disease }) => 
        <Link to={`/disease/${EFO}`}>{Disease}</Link> },
  { id: 'RMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'Dataset', label: 'Dataset', sortable: true},
  { id: 'Total_alterations_Over_Patients_in_dataset', label:'Total alterations Over Patients in dataset', sortable: true},
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset', sortable: true},
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true},
  { id: 'Frequency_in_primary_tumors', label: 'Frequency in primary tumors', sortable: true},
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset', sortable: true},
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors', sortable: true},

  // { id: 'MONDO', label: 'MONDO', sortable: true},
  // { id: 'EFO', label: 'EFO', sortable: true},
]
const dataDownloaderColumns = [
  { id: 'Gene_Symbol' },
  { id: 'Gene_Ensembl_ID' },
  { id: 'Disease'},
  { id: 'RMTL' },
  { id: 'Dataset' },
  { id: 'Total_alterations_Over_Patients_in_dataset' },
  { id: 'Frequency_in_overall_dataset' },
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset' },
  { id: 'Frequency_in_primary_tumors' },
  { id: 'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset' },
  { id: 'Frequency_in_relapse_tumors' },
  { id: 'MONDO' },
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
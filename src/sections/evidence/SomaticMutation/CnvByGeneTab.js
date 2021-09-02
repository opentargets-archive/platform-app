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
  { id: 'Gene_symbol', label: 'targets',
    renderCell: ({ Gene_symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_symbol}</Link>
  },
  // { id: 'Gene_Ensembl_ID', label: 'Gene Ensembl ID'},
  { id:'Variant_type', label:'Variant type'}, 
  { id:'Variant_category', label:'Variant category'},
  { id:'Dataset', label:'Dataset'},
  // { id:'Disease', label:'Disease'},
  { id:'Total_alterations/Patients_in_dataset', label:'Total alterations / Patients in dataset'},
  { id:'Frequency_in_overall_dataset', label:'Frequency in overall dataset'},
  { id:'Total_primary_tumors_altered/Primary_tumors_in_dataset', label:'Total primary tumors altered/Primary tumors in dataset'},
  { id:'Frequency_in_primary_tumors', label:'Frequency in primary tumors'},
  { id:'Total_relapse_tumors_altered/Relapse_tumors_in_dataset', label:''},
  { id:'Frequency_in_relapse_tumors', label:'Frequency in relapse tumors'},
  { id:'Gene_full_name', label:'Gene full name'},
  { id:'RMTL', label:'RMTL', renderCell: () => <RelevantIcon/>},
  { id:'OncoKB_cancer_gene', label:'OncoKB cancer gene'},
  { id:'OncoKB_oncogene_TSG', label:'OncoKB oncogene TSG'},
  // { id:'EFO', label:'EFO'},
  // { id:'MONDO', label:'MONDO'},
]

const dataDownloaderColumns = [
  { id: 'Disease' },
  { id: 'Gene_symbol' },
  { id: 'Gene_Ensembl_ID' },
  { id:'Variant_type' }, 
  { id:'Variant_category' },
  { id:'Dataset' },
  { id:'Disease' },
  { id:'Total_alterations/Patients_in_dataset' },
  { id:'Frequency_in_overall_dataset' },
  { id:'Total_primary_tumors_altered/Primary_tumors_in_dataset' },
  { id:'Frequency_in_primary_tumors' },
  { id:'Total_relapse_tumors_altered/Relapse_tumors_in_dataset' },
  { id:'Frequency_in_relapse_tumors' },
  { id:'Gene_full_name' },
  { id:'RMTL', label:'RMTL' },
  { id:'OncoKB_cancer_gene' },
  { id:'OncoKB_oncogene_TSG' },
  { id:'EFO' },
  { id:'MONDO' },
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
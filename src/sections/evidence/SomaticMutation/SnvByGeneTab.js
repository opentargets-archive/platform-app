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
    id: 'Gene_symbol', label: 'Targets',
    renderCell: ({ Gene_symbol, Gene_Ensembl_ID }) => 
        <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_symbol}</Link>
  },
  { id: 'PMTL', label: 'PMTL', renderCell: () => <RelevantIcon/>},
  { id: 'Dataset', label: 'Dataset' },
  // { id: 'EFO', label: 'EFO' },
  // { id: 'MONDO',label: 'MONDO'},
  { id: 'Gene_full_name',label: 'Gene full name'},
  { id: 'Gene_type', label: 'Gene type'},
  { id: 'Protein_RefSeq_ID', label: 'Protein RefSeq ID' },
  { id: 'Total_mutations_Over_Patients_in_dataset', label: 'Total mutations Over Patients in dataset'},
  { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset'},
  { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset'},
  { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors'},
  { id: 'OncoKB_cancer_gene', label: 'OncoKB cancer geneD'},
  { id: 'OncoKB_oncogene_T', label: 'OncoKB oncogene T'},
  { id: 'PedcBioPortal', label: 'PedcBioPortal', renderCell: ({PedcBioPortal}) => <Link external to={'https://pedcbioportal.kidsfirstdrc.org/results/oncoprint?cancer_study_list=ped_opentargets_2021&case_set_id=ped_opentargets_2021_pbta_ependymoma&Action=Submit&gene_list=CXCL8'}>{PedcBioPortal}</Link>},
  { id: 'PedcBioPed', label: 'PedcBioPed', renderCell: ({PedcBioPed}) => <Link external to={'https://pedcbioportal.kidsfirstdrc.org/results/mutations?cancer_study_list=ped_opentargets_2021&case_set_id=ped_opentargets_2021_pbta_ependymoma&Action=Submit&gene_list=CXCL8'}>{PedcBioPed}</Link>},
]

function SnvByGeneTab({data}) {
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

export default SnvByGeneTab;
import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

// Configuration for how the tables will display the data
const columns = [
  {
    id: 'geneSymbol', label: 'Gene symbol', sortable: true,
    renderCell: ({ Gene_symbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{Gene_symbol}</Link>
  },
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'dataset', label: 'Dataset', sortable: true },
  
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link>},
  { id: 'geneFullName', label: 'Gene full name', sortable: true },
  { id: 'geneType', label: 'Gene type', sortable: true },
  { id: 'proteinRefseqId', label: 'Protein RefSeq ID', sortable: true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'proteinEnsemblId', label: 'Protein Ensembl ID', sortable: true },
  { id: 'totalMutationsOverPatientsInDataset', label: 'Total mutations Over Patients in dataset', sortable: true },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable: true },
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer geneD', sortable: true},
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB oncogene TSG', sortable: true},
  { id: 'pedcbioPedotOncoprintPlotURL', label: 'PedcBio PedOT oncoprint plot URL', renderCell: ({PedcBio_PedOT_oncoprint_plot_URL}) => <Link external to={PedcBio_PedOT_oncoprint_plot_URL}> oncoprint </Link>},
  { id: 'pedcbioPedotMutationsPlotURL', label: 'PedcBio PedOT mutations plot URL', renderCell: ({PedcBio_PedOT_mutations_plot_URL}) => <Link external to={PedcBio_PedOT_mutations_plot_URL}> mutations </Link>},
]

const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'PMTL' },
  { id: 'dataset' },
  { id: 'Disease' },
  { id: 'diseaseFromSourceMappedId', label:'EFO' },
  { id: 'MONDO' },
  { id: 'geneFullName' },
  { id: 'geneType' },
  { id: 'proteinRefseqId' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'proteinEnsemblId' },
  { id: 'totalMutationsOverPatientsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
  { id: 'pedcbioPedotOncoprintPlotURL' },
  { id: 'pedcbioPedotMutationsPlotURL' },
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
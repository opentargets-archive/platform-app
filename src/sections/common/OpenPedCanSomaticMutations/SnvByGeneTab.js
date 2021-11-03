import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import { renderPMTLCell } from './utils'
import { genericComparator } from '../../../utils/comparators'

const createExternalLink = (url, description) => {
  const link = url ? <Link external to={url}> {description} </Link> : '' 
  return link; 
}

// Configuration for how the tables will display the data
const columns = [
  {
    id: 'geneSymbol', label: 'Target', sortable: true,
    renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: ({PMTL}) => renderPMTLCell(PMTL), filterValue: false},
  { id: 'dataset', label: 'Dataset', sortable: true, comparator: (a, b) => genericComparator(a, b, 'dataset')},
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link>},
  { id: 'geneFullName', label: 'Gene full name', sortable: true },
  { id: 'geneType', label: 'Gene type', sortable: true },
  { id: 'proteinRefseqId', label: 'Protein RefSeq ID', sortable: true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'proteinEnsemblId', label: 'Protein Ensembl ID', sortable: true },
  { id: 'totalMutationsOverPatientsInDataset', label: 'Total mutations / Subjects in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated / Primary tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset', label: 'Total relapse tumors mutated / Relapse tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'frequencyInRelapseTumors',  label: 'Frequency in relapse tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer gene', sortable: true},
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB oncogene|TSG', sortable: true},
  { id: 'pedcbioPedotOncoprintPlotURL', label: 'PedcBio PedOT oncoprint plot', 
    renderCell: ({pedcbioPedotOncoprintPlotURL}) => createExternalLink(pedcbioPedotOncoprintPlotURL, "oncoprint"),
    filterValue: ({pedcbioPedotOncoprintPlotURL}) => pedcbioPedotOncoprintPlotURL ? 'oncoprint' : ''
  },
  { id: 'pedcbioPedotMutationsPlotURL', label: 'PedcBio PedOT mutation plot', 
    renderCell: ({pedcbioPedotMutationsPlotURL}) => createExternalLink(pedcbioPedotMutationsPlotURL, "mutations"), 
    filterValue:({pedcbioPedotMutationsPlotURL}) => pedcbioPedotMutationsPlotURL ? 'mutations' : ''
  },
]

const dataDownloaderColumns = [
  { id: 'geneSymbol', label: 'Target'},
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
  { id: 'totalMutationsOverPatientsInDataset', label: 'totalMutationsOverSubjectsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
  { id: 'pedcbioPedotOncoprintPlotURL', label: 'pedcbioPedotOncoprintPlot'},
  { id: 'pedcbioPedotMutationsPlotURL', label: 'pedcbioPedotMutationPlot' },
]

function SnvByGeneTab({data, dataDownloaderFileStem}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          dataDownloaderColumns={dataDownloaderColumns}
          dataDownloaderFileStem={dataDownloaderFileStem}
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
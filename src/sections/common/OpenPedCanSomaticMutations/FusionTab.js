import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import { renderPMTLCell } from './utils';
import { genericComparator } from '../../../utils/comparators'

// Configuration for how the tables will display the data
const columns = [
  { id: 'fusionName', label: 'Fusion Name', sortable:true },
  { id: 'fusionType', label: 'Fusion Type', sortable:true },
  { id: 'geneSymbol', label: 'Target', sortable:true,
    renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'genePosition', label: 'Gene Position', sortable:true },
  { id: 'fusionAnno', label: 'Fusion anno', sortable:true },
  { id: 'breakpointLocation', label: 'Breakpoint location', sortable:true },
  { id: 'annots', label: 'annots', sortable:true },
  { id: 'kinaseDomainRetainedGene1A', label: 'Kinase domain retained Gene1A', sortable:true },
  { id: 'kinaseDomainRetainedGene1B', label: 'Kinase domain retained Gene1B', sortable:true },
  { id: 'reciprocalExistsEitherGeneKinase', label: 'Reciprocal exists either gene kinase', sortable:true },
  { id: 'gene1AAnno', label: 'Gene1A anno', sortable:true },
  { id: 'gene1BAnno', label: 'Gene1B anno', sortable:true },
  { id: 'gene2AAnno', label: 'Gene2A anno', sortable:true },
  { id: 'gene2BAnno', label: 'Gene2B anno', sortable:true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable:true },
  { id: 'Disease', label: 'Disease', sortable:true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> 
  },
  { id: 'PMTL', label: 'PMTL', sortable:true , renderCell: ({PMTL}) => renderPMTLCell(PMTL), filterValue: false},
  { id: 'dataset', label: 'Dataset', sortable:true, comparator: (row1, row2) => genericComparator(row1, row2, 'dataset') },
  { id: 'totalAlterationsOverNumberPatientsInDataset', label: 'Total alterations Over Patients in dataset', sortable:true,
      comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true)},
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable:true,
      comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated / Primary tumors in dataset', sortable:true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable:true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset', label: 'Total relapse tumors mutated / Relapse tumors in dataset', sortable:true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable:true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
]
const dataDownloaderColumns = [
  { id: 'fusionName' },
  { id: 'fusionType' },
  { id: 'geneSymbol', label: 'Target' },
  { id: 'genePosition' },
  { id: 'fusionAnno' },
  { id: 'breakpointLocation' },
  { id: 'annots' },
  { id: 'kinaseDomainRetainedGene1A' },
  { id: 'kinaseDomainRetainedGene1B' },
  { id: 'reciprocalExistsEitherGeneKinase' },
  { id: 'gene1AAnno' },
  { id: 'gene1BAnno' },
  { id: 'gene2AAnno' },
  { id: 'gene2BAnno' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'Disease' },
  { id: 'MONDO' },
  { id: 'PMTL' },
  { id: 'diseaseFromSourceMappedId', label: 'EFO' },
  { id: 'dataset' },
  { id: 'totalAlterationsOverNumberPatientsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
]

function FusionTab({data, dataDownloaderFileStem}) {
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

export default FusionTab;
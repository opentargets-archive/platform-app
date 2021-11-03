import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import { renderPMTLCell } from './utils';
import { genericComparator } from '../../../utils/comparators'

// Configuration for how the tables will display the data
const columns = [
  { id: 'geneSymbol', label: 'Target', sortable: true,
      renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true},
  { id: 'Disease', label: 'Disease', sortable: true,
      renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
        <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> },
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: ({PMTL}) => renderPMTLCell(PMTL), filterValue: false},
  { id: 'dataset', label: 'Dataset', sortable: true, comparator: (row1, row2) => genericComparator(row1, row2, 'dataset')},
  { id: 'totalAlterationsOverNumberPatientsInDataset', label:'Total alterations / Subjects in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated / Primary tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset', label: 'Total relapse tumors mutated / Relapse tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) }

  // { id: 'MONDO', label: 'MONDO', sortable: true},
  // { id: 'EFO', label: 'EFO', sortable: true},
]
const dataDownloaderColumns = [
  { id: 'geneSymbol', label: 'Target' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'Disease'},
  { id: 'PMTL' },
  { id: 'dataset' },
  { id: 'totalAlterationsOverNumberPatientsInDataset', label: 'totalAlterationsOverSubjectsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'MONDO' },
  { id: 'diseaseFromSourceMappedId', label: 'EFO' },
]

function FusionByGeneTab({data, dataDownloaderFileStem}) {
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

export default FusionByGeneTab;
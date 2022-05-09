import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import { renderPMTLCell } from './utils';
import { genericComparator } from '../../../utils/comparators'

// Configuration for how the tables will display the data
const columns = [
  { id: 'geneSymbol', label: 'Gene symbol',
      renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true},
  { id: 'Disease', label: 'Disease', sortable: true,
      renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
        <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> },
  { id: 'PMTL', label: 'PMTL', renderCell: ({PMTL}) => renderPMTLCell(PMTL), filterValue: false},
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
]
const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'targetFromSourceId', exportLabel: 'geneEnsemblId' },
  { id: 'Disease'},
  { id: 'PMTL' },
  { id: 'dataset' },
  { id: 'totalAlterationsOverNumberPatientsInDataset', exportLabel: 'totalAlterationsOverSubjectsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'MONDO' },
  { id: 'diseaseFromSourceMappedId', exportLabel: 'efo' },
]

function FusionByGeneTab({ data, BODY_QUERY, variables, dataDownloaderFileStem }) {
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
          query={BODY_QUERY.loc.source.body}
          variables={variables}
        />
      </Grid> 
    </Grid>
  )
}

export default FusionByGeneTab;
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
      <Link to={`/target/${targetFromSourceId}`}> {geneSymbol} </Link> },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'variantType', label: 'Variant type', sortable: true }, 
  { id: 'variantCategory', label: 'Variant category', sortable: true },
  { id: 'dataset', label: 'Dataset', sortable: true, comparator: (row1, row2) => genericComparator(row1, row2, 'dataset') },
  { id: 'Disease', label: 'Disease', sortable: true, 
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link> },
  { id: 'totalAlterationsOverPatientsInDataset', label: 'Total alterations / Subjects in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInOverallDataset', true) },
  { id: 'totalPrimaryTumorsAlteredOverPrimaryTumorsInDataset', label: 'Total primary tumors altered / Primary tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInPrimaryTumors', true) },
  { id: 'totalRelapseTumorsAlteredOverRelapseTumorsInDataset', label: 'Total relapse tumors altered / Relapse tumors in dataset', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable: true,
    comparator: (row1, row2) => genericComparator(row1, row2, 'frequencyInRelapseTumors', true) },
  { id: 'geneFullName', label: 'Gene full name' },
  { id: 'PMTL', label: 'PMTL', renderCell: ({PMTL}) => renderPMTLCell(PMTL), filterValue: false},
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer gene' },
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB Oncogene|TSG', sortable: true },
  // { id: 'EFO', label: 'EFO', sortable: true },
  // { id: 'MONDO', label: 'MONDO', sortable: true },
]

const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'targetFromSourceId', exportLabel: 'geneEnsemblId' },
  { id: 'variantType' }, 
  { id: 'variantCategory' },
  { id: 'dataset' },
  { id: 'Disease' },
  { id: 'totalAlterationsOverPatientsInDataset', exportLabel: 'totalAlterationsOverSubjectsInDataset'},
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsAlteredOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsAlteredOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'geneFullName' },
  { id: 'PMTL', exportLabel: 'PMTL'},
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
  { id: 'diseaseFromSourceMappedId', exportLabel: 'efo' },
  { id: 'MONDO' },
]

function CnvByGeneTab({data, dataDownloaderFileStem}) {
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

export default CnvByGeneTab;
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
    renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'variantIdHg38', label: 'Variant ID hg38', sortable: true },
  { id: 'proteinChange', label: 'Protein change', sortable: true},
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>},
  { id: 'dataset', label: 'Dataset', sortable: true },
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link>},
  { id: 'dbSNPId', label: 'dbSNP ID', sortable: true },
  { id: 'vepImpact', label: 'VEP impact', sortable: true },
  { id: 'siftImpact', label: 'SIFT impact', sortable: true },
  { id: 'polyphenImpact', label: 'PolyPhen impact', sortable: true },
  { id: 'variantClassification', label: 'Variant classification', sortable: true },
  { id: 'variantType', label: 'Variant type', sortable: true },
  { id: 'geneFullName', label: 'Gene full name', sortable: true },
  { id: 'proteinRefseqId', label: 'Protein RefSeq ID', sortable: true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'proteinEnsemblId', label: 'Protein Ensembl ID', sortable: true },
  { id: 'totalMutationsOverPatientsInDataset', label: 'Total mutations Over Patients in dataset', sortable: true },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset', sortable: true },
  { id: 'frequencyInRelapseTumors', label: 'Frequency in relapse tumors', sortable: true },
  { id: 'hotspot', label: 'HotSpot', sortable: true },
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer gene', sortable: true },
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB oncogene TSG', sortable: true },
];

const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'variantIdHg38' },
  { id: 'proteinChange' },
  { id: 'PMTL' },
  { id: 'Dataset' },
  { id: 'Disease' },
  { id: 'diseaseFromSourceMappedId', label: 'EFO' },
  { id: 'MONDO' },
  { id: 'dbSNPId' },
  { id: 'vepImpact' },
  { id: 'siftImpact' },
  { id: 'polyphenImpact' },
  { id: 'variantClassification' },
  { id: 'variantType' },
  { id: 'geneFullName' },
  { id: 'proteinRefseqId' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'proteinEnsemblId' },
  { id: 'totalMutationsOverPatientsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'hotspot' },
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
]

function SnvByVariantTab({data}) {
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

export default SnvByVariantTab;
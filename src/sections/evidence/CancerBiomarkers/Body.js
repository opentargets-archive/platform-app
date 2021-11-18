import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';
import Link from '../../../components/Link';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import { dataTypesMap } from '../../../dataTypes';
import Summary from './Summary';
import Description from './Description';
import BiomarkersDrawer from './BiomarkersDrawer';

const CANCER_BIOMARKERS_EVIDENCE_QUERY = loader(
  './CancerBiomarkersEvidence.gql'
);

const columns = [
  {
    id: 'disease.name',
    label: 'Disease',
    renderCell: ({ disease, diseaseFromSource }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                {diseaseFromSource}
              </Typography>
            </>
          }
          showHelpIcon
        >
          <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
        </Tooltip>
      );
    },
  },
  {
    id: 'biomarkerName',
    label: 'Biomarker',
    renderCell: ({ biomarkerName, biomarkers }) => {
      return (
        <BiomarkersDrawer
          biomarkerName={biomarkerName}
          biomarkers={biomarkers}
        />
      );
    },
    filterValue: ({ allelicRequirements }) =>
      allelicRequirements ? allelicRequirements.join() : '',
  },
  {
    id: 'drug',
    label: 'Reported drug',
    renderCell: ({ studyId, confidence }) => {
      return (
        <Link
          external
          to={`https://search.clinicalgenome.org/kb/gene-validity/${studyId}`}
        >
          {confidence}
        </Link>
      );
    },
  },
];

function Body(props) {
  const { definition, id, label } = props;
  const { ensgId: ensemblId, efoId } = id;
  /* const { data: summaryData } = usePlatformApi(
    Summary.fragments.ClinGenSummaryFragment
  ); */

  const variables = {
    ensemblId,
    efoId,
    // size: summaryData.clingenSummary.count,
    size: 10,
  };

  const request = useQuery(CANCER_BIOMARKERS_EVIDENCE_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.affected_pathway}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        // console.log('disease', disease);
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={CANCER_BIOMARKERS_EVIDENCE_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;

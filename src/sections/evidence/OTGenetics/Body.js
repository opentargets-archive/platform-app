import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { identifiersOrgLink } from '../../../utils/global';
import ScientificNotation from '../../../components/ScientificNotation';
import SectionItem from '../../../components/Section/SectionItem';
import { Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

const epmcUrl = id => `https://europepmc.org/article/MED/${id}`;
const otgStudyUrl = id => `https://genetics.opentargets.org/study/${id}`;
const otgVariantUrl = id => `https://genetics.opentargets.org/variant/${id}`;

const OPEN_TARGETS_GENETICS_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported Trait',
    renderCell: ({ diseaseFromSource, studyId }) => (
      <Link external to={otgStudyUrl(studyId)}>
        {diseaseFromSource ? diseaseFromSource : studyId}
      </Link>
    ),
  },
  {
    id: 'literature',
    renderCell: ({ literature, publicationYear, publicationFirstAuthor }) =>
      literature ? (
        <Link external to={epmcUrl(literature[0])}>
          {publicationFirstAuthor} et al, {publicationYear}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'variantId',
    label: 'Variant ID (RSID)',
    renderCell: ({ variantId, variantRsId }) => (
      <>
        {variantId ? (
          <Link external to={otgVariantUrl(variantId)}>
            {variantId}
          </Link>
        ) : (
          naLabel
        )}
        {variantRsId ? (
          <Typography variant="caption">
            {' '}
            (
            <Link
              external
              to={identifiersOrgLink('DBSNP', variantRsId, 'ncbi')}
            >
              {variantRsId}
            </Link>
            )
          </Typography>
        ) : (
          naLabel
        )}
      </>
    ),
  },
  {
    id: 'variantFunctionalConsequenceId',
    label: 'Functional Consequence',
    renderCell: ({ variantFunctionalConsequenceId }) =>
      variantFunctionalConsequenceId ? (
        <Link
          external
          to={identifiersOrgLink('SO', variantFunctionalConsequenceId.slice(3))}
        >
          {variantFunctionalConsequenceId}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'resourceScore',
    label: 'Study p-value',
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => (
      <>
        <ScientificNotation number={resourceScore} />
      </>
    ),
  },
  {
    id: 'studySampleSize',
    numeric: true,
    renderCell: ({ studySampleSize }) =>
      studySampleSize ? studySampleSize : naLabel,
  },
  {
    id: 'oddsRatio',
    numeric: true,
    renderCell: ({ oddsRatio }) =>
      oddsRatio ? parseFloat(oddsRatio.toFixed(3)) : naLabel,
  },
  {
    id: 'confidenceInterval',
    propertyPath: 'confidenceIntervalLower',
    numeric: true,
    renderCell: ({ confidenceIntervalLower, confidenceIntervalUpper }) => {
      if (!(confidenceIntervalLower && confidenceIntervalUpper)) return naLabel;

      const ciLo = parseFloat(confidenceIntervalLower.toFixed(3));
      const ciUp = parseFloat(confidenceIntervalUpper.toFixed(3));
      return `(${ciLo}, ${ciUp})`;
    },
  },
  {
    id: 'locus2GeneScore',
    label: 'Locus to Gene Score',
    numeric: true,
    sortable: true,
    renderCell: ({ locus2GeneScore }) => parseFloat(locus2GeneScore.toFixed(5)),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      openTargetsGenetics: { count: size },
    },
  } = usePlatformApi(Summary.fragments.OpenTargetsGeneticsSummaryFragment);

  const request = useQuery(OPEN_TARGETS_GENETICS_QUERY, {
    variables: { ensemblId: ensgId, efoId, size },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={data => (
        <DataTable
          columns={columns}
          dataDownloader
          dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
          rows={data.disease.evidences.rows}
          pageSize={10}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
        />
      )}
    />
  );
}

export default Body;

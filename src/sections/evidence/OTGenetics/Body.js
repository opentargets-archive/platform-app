import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { identifiersOrgLink, sentenceCase } from '../../../utils/global';
import ScientificNotation from '../../../components/ScientificNotation';
import SectionItem from '../../../components/Section/SectionItem';
import { Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { epmcUrl, otgStudyUrl } from '../../../utils/urls';
import Summary from './Summary';

const otgVariantUrl = id => `https://genetics.opentargets.org/variant/${id}`;

const OPEN_TARGETS_GENETICS_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported disease/phenotype',
    renderCell: ({ diseaseFromSource, studyId }) => (
      <Link external to={otgStudyUrl(studyId)}>
        {diseaseFromSource ? diseaseFromSource : studyId}
      </Link>
    ),
  },
  {
    id: 'literature',
    label: 'Publication',
    renderCell: ({ literature, publicationYear, publicationFirstAuthor }) =>
      literature ? (
        <Link external to={epmcUrl(literature[0])}>
          {publicationFirstAuthor} et al, {publicationYear}
        </Link>
      ) : (
        naLabel
      ),
    filterValue: ({ literature, publicationYear, publicationFirstAuthor }) =>
      `${literature} ${publicationYear} ${publicationFirstAuthor}`,
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
    filterValue: ({ variantId, variantRsId }) => `${variantId} ${variantRsId}`,
  },
  {
    id: 'variantFunctionalConsequenceId',
    label: 'Functional Consequence',
    renderCell: ({ variantFunctionalConsequence }) =>
      variantFunctionalConsequence ? (
        <Link
          external
          to={identifiersOrgLink(
            'SO',
            variantFunctionalConsequence.id.slice(3)
          )}
        >
          {sentenceCase(variantFunctionalConsequence.label)}
        </Link>
      ) : (
        naLabel
      ),
    filterValue: ({ variantFunctionalConsequence }) =>
      `${variantFunctionalConsequence.label} ${
        variantFunctionalConsequence.id
      }`,
  },
  {
    id: 'resourceScore',
    label: (
      <>
        Association <i>p</i>-value
      </>
    ),
    numeric: true,
    sortable: true,
    renderCell: ({ pValueMantissa, pValueExponent }) => (
      <ScientificNotation number={[pValueMantissa, pValueExponent]} />
    ),
  },
  {
    id: 'studySampleSize',
    label: 'Sample size',
    numeric: true,
    sortable: true,
    renderCell: ({ studySampleSize }) =>
      studySampleSize ? parseInt(studySampleSize).toLocaleString() : naLabel,
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
    id: 'resourceScore',
    label: 'L2G score',
    tooltip: (
      <>
        Causal inference score - see{' '}
        <Link
          external
          to="https://docs.targetvalidation.org/data-sources/genetic-associations#open-targets-genetics-portal"
        >
          our documentation
        </Link>{' '}
        for more information.
      </>
    ),
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => parseFloat(resourceScore.toFixed(5)),
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
          order="desc"
          rows={data.disease.evidences.rows}
          pageSize={10}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
          sortBy="resourceScore"
        />
      )}
    />
  );
}

export default Body;

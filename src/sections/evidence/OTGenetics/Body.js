import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { DataTable } from '../../../components/Table';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import {
  defaultRowsPerPageOptions,
  naLabel,
  studySourceMap,
} from '../../../constants';
import Description from './Description';
import { otgStudyUrl, otgVariantUrl } from '../../../utils/urls';
import { dataTypesMap } from '../../../dataTypes';
import { identifiersOrgLink, sentenceCase } from '../../../utils/global';
import Link from '../../../components/Link';
import ScientificNotation from '../../../components/ScientificNotation';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import { Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';

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
    renderCell: ({ diseaseFromSource, studyId }) => {
      const parsedDiseaseFromSource = diseaseFromSource.replace(/['"]+/g, '');
      return (
        <Link external to={otgStudyUrl(studyId)}>
          {diseaseFromSource ? parsedDiseaseFromSource : studyId}
        </Link>
      );
    },
  },
  {
    id: 'literature',
    label: 'Publication',
    renderCell: ({ literature, publicationYear, publicationFirstAuthor }) => {
      if (!literature) return naLabel;
      return (
        <PublicationsDrawer
          entries={[{ name: literature[0] }]}
          customLabel={`${publicationFirstAuthor} et al, ${publicationYear}`}
        />
      );
    },
    filterValue: ({ literature, publicationYear, publicationFirstAuthor }) =>
      `${literature} ${publicationYear} ${publicationFirstAuthor}`,
  },
  {
    id: 'studySource',
    label: 'Study source',
    renderCell: ({ projectId }) => {
      if (!projectId) return naLabel;
      if (Object.keys(studySourceMap).indexOf(projectId) < 0) return naLabel;
      return studySourceMap[projectId];
    },
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
              to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
            >
              {variantRsId}
            </Link>
            )
          </Typography>
        ) : null}
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
      `${sentenceCase(variantFunctionalConsequence.label)} ${
        variantFunctionalConsequence.id
      }`,
  },
  {
    id: 'pValueMantissa',
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
    comparator: (a, b) =>
      a.pValueMantissa * 10 ** a.pValueExponent -
      b.pValueMantissa * 10 ** b.pValueExponent,
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
    label: 'Odds Ratio (CI 95%)',
    numeric: true,
    renderCell: ({
      oddsRatio,
      oddsRatioConfidenceIntervalLower,
      oddsRatioConfidenceIntervalUpper,
    }) => {
      const ci =
        oddsRatioConfidenceIntervalLower && oddsRatioConfidenceIntervalUpper
          ? `(${parseFloat(
              oddsRatioConfidenceIntervalLower.toFixed(3)
            )}, ${parseFloat(oddsRatioConfidenceIntervalUpper.toFixed(3))})`
          : '';
      return oddsRatio ? `${parseFloat(oddsRatio.toFixed(3))} ${ci}` : naLabel;
    },
  },
  {
    id: 'betaConfidenceInterval',
    label: 'Beta (CI 95%)',
    numeric: true,
    renderCell: ({
      beta,
      betaConfidenceIntervalLower,
      betaConfidenceIntervalUpper,
    }) => {
      const ci =
        betaConfidenceIntervalLower && betaConfidenceIntervalUpper
          ? `(${parseFloat(
              betaConfidenceIntervalLower.toFixed(3)
            )}, ${parseFloat(betaConfidenceIntervalUpper.toFixed(3))})`
          : '';
      return beta ? `${parseFloat(beta.toFixed(3))} ${ci}` : naLabel;
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
          to="https://platform-docs.opentargets.org/evidence#open-targets-genetics-portal"
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
  const variables = { ensemblId: ensgId, efoId, size };

  const request = useQuery(OPEN_TARGETS_GENETICS_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.genetic_association}
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
          query={OPEN_TARGETS_GENETICS_QUERY.loc.source.body}
          variables={variables}
        />
      )}
    />
  );
}

export default Body;

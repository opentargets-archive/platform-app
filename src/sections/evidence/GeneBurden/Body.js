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
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { epmcUrl } from '../../../utils/urls';
import Description from './Description';
import ScientificNotation from '../../../components/ScientificNotation';

const GENE_BURDEN_QUERY = loader('./GeneBurdenQuery.gql');

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
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
    id: 'studyId',
    label: 'Study',
    renderCell: ({ studyId }) => {
      return studyId ? (
        <Link to={`https://www.ebi.ac.uk/gwas/studies/${studyId}`} external>
          {studyId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'cohortId',
    label: 'Source',
    renderCell: ({ cohortId, projectId }) => {
      const source = `${cohortId} (${projectId})`;
      return projectId === 'AstraZeneca PheWAS Portal' ? (
        <Link to="https://azphewas.com" external>
          {source}
        </Link>
      ) : (
        source
      );
    },
    filterValue: ({ cohortId, projectId }) => {
      return `${cohortId} ${projectId}`;
    },
  },
  {
    id: 'ancestry',
    label: 'Ancestry',
    renderCell: ({ ancestry, ancestryId }) => {
      return (
        <Link to={`http://purl.obolibrary.org/obo/${ancestryId}`} external>
          {ancestry}
        </Link>
      );
    },
  },
  {
    id: 'statisticalMethod',
    label: 'Model',
    renderCell: ({ statisticalMethod, statisticalMethodOverview }) => {
      return (
        <Tooltip title={statisticalMethodOverview} showHelpIcon>
          {statisticalMethod}
        </Tooltip>
      );
    },
  },
  {
    id: 'studyCasesWithQualifyingVariants',
    label: 'Cases with QV',
    numeric: true,
    sortable: true,
    renderCell: ({ studyCasesWithQualifyingVariants }) => {
      return studyCasesWithQualifyingVariants
        ? parseInt(studyCasesWithQualifyingVariants).toLocaleString()
        : naLabel;
    },
    filterValue: ({ studyCasesWithQualifyingVariants }) => {
      return `${studyCasesWithQualifyingVariants} ${naLabel}`;
    },
  },
  {
    id: 'studyCases',
    label: 'Cases',
    numeric: true,
    sortable: true,
    renderCell: ({ studyCases }) => {
      return studyCases ? parseInt(studyCases).toLocaleString() : naLabel;
    },
  },
  {
    id: 'studySampleSize',
    label: 'Sample size',
    numeric: true,
    sortable: true,
    renderCell: ({ studySampleSize }) => {
      return studySampleSize
        ? parseInt(studySampleSize).toLocaleString()
        : naLabel;
    },
  },
  {
    id: 'oddsRatio',
    label: 'Odds Ratio (CI 95%)',
    numeric: true,
    sortable: true,
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
    filterValue: ({
      oddsRatio,
      oddsRatioConfidenceIntervalLower,
      oddsRatioConfidenceIntervalUpper,
    }) => {
      return `${oddsRatio} ${oddsRatioConfidenceIntervalLower} ${oddsRatioConfidenceIntervalUpper} ${naLabel}`;
    },
  },
  {
    id: 'beta',
    label: 'Beta (CI 95%)',
    numeric: true,
    sortable: true,
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
    filterValue: ({
      beta,
      betaConfidenceIntervalLower,
      betaConfidenceIntervalUpper,
    }) => {
      return `${beta} ${betaConfidenceIntervalLower} ${betaConfidenceIntervalUpper} ${naLabel}`;
    },
  },
  {
    id: 'pValue',
    label: (
      <>
        <i>p</i>-value
      </>
    ),
    numeric: true,
    sortable: true,
    renderCell: ({ pValueMantissa, pValueExponent }) => {
      return <ScientificNotation number={[pValueMantissa, pValueExponent]} />;
    },
    filterValue: ({ pValueMantissa, pValueExponent }) => {
      return `${pValueMantissa} ${pValueExponent}`;
    },
    exportValue: ({ pValueMantissa, pValueExponent }) => {
      return `${pValueMantissa}x10${pValueExponent}`;
    },
    comparator: (a, b) =>
      a.pValueMantissa * 10 ** a.pValueExponent -
      b.pValueMantissa * 10 ** b.pValueExponent,
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: ({ literature }) => {
      const entries = literature
        ? literature.map(id => {
            return { name: id, url: epmcUrl(id), group: 'literature' };
          })
        : [];

      return <PublicationsDrawer entries={entries} />;
    },
  },
];

function Body(props) {
  const { definition, id, label } = props;
  const { ensgId: ensemblId, efoId } = id;
  const {
    data: {
      disease: { geneBurdenSummary },
    },
  } = usePlatformApi();

  const variables = {
    ensemblId,
    efoId,
    size: geneBurdenSummary.count,
  };

  const request = useQuery(GENE_BURDEN_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.genetic_association}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            order="asc"
            sortBy="pValue"
            dataDownloader
            dataDownloaderFileStem={`geneburden-${ensemblId}-${efoId}`}
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={GENE_BURDEN_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;

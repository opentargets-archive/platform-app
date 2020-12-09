import React from 'react';
import { useQuery } from '@apollo/client';
import {
  faCheckSquare,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loader } from 'graphql.macro';
import { Typography } from '@material-ui/core';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';

const geUrl = (id, approvedSymbol) =>
  `https://panelapp.genomicsengland.co.uk/panels/${id}/gene/${approvedSymbol}`;

const GENOMICS_ENGLAND_QUERY = loader('./sectionQuery.gql');

const confidenceCaption = confidence =>
  ({
    green: (
      <span style={{ color: '#3fad46' }}>
        <FontAwesomeIcon icon={faCheckSquare} size="sm" />{' '}
        {sentenceCase(confidence)}
      </span>
    ),
    amber: (
      <span style={{ color: '#f0ad4e' }}>
        <FontAwesomeIcon icon={faExclamationTriangle} size="sm" />{' '}
        {sentenceCase(confidence)}
      </span>
    ),
  }[confidence]);

const confidenceMap = confidence =>
  ({
    green: 20,
    amber: 10,
  }[confidence.toLowerCase()] || 0);

const allelicRequirementsCaption = allelicRequirements => {
  const caption = sentenceCase(
    allelicRequirements.split(' ', 1)[0].replace(/[;:,]*/g, '')
  );
  const description =
    allelicRequirements
      .split(' ')
      .slice(1)
      .join(' ') || 'No more information available';

  return [caption, description];
};

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => (
      <Tooltip
        showHelpIcon
        title={
          <>
            <Typography variant="subtitle2">
              Reported Disease/phenotype:
            </Typography>
            <Typography variant="caption">{diseaseFromSource}</Typography>
          </>
        }
      >
        <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
      </Tooltip>
    ),
    filterValue: ({ disease, diseaseFromSource }) =>
      [disease.name, diseaseFromSource].join(),
  },
  {
    id: 'cohortPhenotypes',
    label: 'All phenotypes',
    renderCell: ({ cohortPhenotypes }) =>
      cohortPhenotypes ? (
        <TableDrawer
          entries={cohortPhenotypes.map(item => ({
            name: item,
            group: 'Reported phenotypes',
          }))}
          showSingle={false}
          message={`${cohortPhenotypes.length} phenotype${
            cohortPhenotypes.length !== 1 ? 's' : ''
          }`}
        />
      ) : (
        naLabel
      ),
  },
  {
    id: 'allelicRequirements',
    label: 'Allelic Requirement',
    renderCell: ({ allelicRequirements }) =>
      allelicRequirements
        ? allelicRequirements.map((item, index) => {
            const [caption, description] = allelicRequirementsCaption(item);

            return (
              <Tooltip
                key={index}
                placement="top"
                interactive
                title={description}
                showHelpIcon
              >
                {caption}
              </Tooltip>
            );
          })
        : naLabel,
  },
  {
    id: 'studyOverview',
    label: 'Genomics England Panel',
    renderCell: ({ studyOverview, studyId, target: { approvedSymbol } }) =>
      studyOverview && studyId && approvedSymbol ? (
        <Link external to={geUrl(studyId, approvedSymbol)}>
          {studyOverview}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'confidence',
    sortable: true,
    renderCell: ({ confidence }) => confidenceCaption(confidence),
    comparator: (a, b) =>
      confidenceMap(a.confidence) - confidenceMap(b.confidence),
  },
  {
    id: 'literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id === 'NA') return acc;

          return [
            ...acc,
            {
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            },
          ];
        }, []) || [];

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      genomicsEngland: { count: size },
    },
  } = usePlatformApi(Summary.fragments.GenomicsEnglandSummaryFragment);

  const request = useQuery(GENOMICS_ENGLAND_QUERY, {
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
          sortBy="confidence"
        />
      )}
    />
  );
}

export default Body;

import React from 'react';
import { loader } from 'graphql.macro';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import Link from '../../../components/Link';
import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';
import SectionItem from '../../../components/Section/SectionItem';
import { sentenceCase } from '../../../utils/global';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const INTOGEN_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => (
      <Tooltip
        title={
          <>
            <Typography variant="subtitle2" display="block" align="center">
              Reported disease or phenotype:
            </Typography>
            <Typography variant="caption" display="block" align="center">
              {sentenceCase(diseaseFromSource)}
            </Typography>
          </>
        }
        showHelpIcon
      >
        <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
      </Tooltip>
    ),
    filterValue: ({ disease, diseaseFromSource }) =>
      [disease.name, diseaseFromSource].join(),
  },
  {
    id: 'diseaseModelAssociatedHumanPhenotypes',
    label: 'Human phenotypes',
    renderCell: ({
      diseaseModelAssociatedHumanPhenotypes: humanPhenotypes,
    }) => {
      const entries = humanPhenotypes
        ? humanPhenotypes.map(entry => ({
            name: entry.label,
            group: 'Human phenotypes',
          }))
        : [];
      return (
        <TableDrawer
          entries={entries}
          showSingle={false}
          message={`${humanPhenotypes ? humanPhenotypes.length : 0} phenotype${
            humanPhenotypes === null || humanPhenotypes.length !== 1 ? 's' : ''
          }`}
        />
      );
    },
    filterValue: ({ diseaseModelAssociatedHumanPhenotypes = [] }) =>
      diseaseModelAssociatedHumanPhenotypes.map(dmahp => dmahp.label).join(),
  },
  {
    id: 'diseaseModelAssociatedModelPhenotypes',
    label: 'Mouse phenotypes',

    renderCell: ({
      diseaseModelAssociatedModelPhenotypes: mousePhenotypes,
    }) => (
      <TableDrawer
        entries={mousePhenotypes.map(entry => ({
          name: entry.label,
          group: 'Mouse phenotypes',
        }))}
        showSingle={false}
        message={`${mousePhenotypes.length} phenotype${
          mousePhenotypes.length !== 1 ? 's' : ''
        }`}
      />
    ),
    filterValue: ({ diseaseModelAssociatedModelPhenotypes = [] }) =>
      diseaseModelAssociatedModelPhenotypes.map(dmamp => dmamp.label).join(),
  },
  {
    id: 'literature',
    label: 'Mouse model allelic composition',
    renderCell: ({
      biologicalModelAllelicComposition,
      biologicalModelGeneticBackground,
      biologicalModelId,
    }) =>
      biologicalModelAllelicComposition && biologicalModelGeneticBackground ? (
        biologicalModelId ? (
          <Link external to={`https://identifiers.org/${biologicalModelId}`}>
            <MouseModelAllelicComposition
              allelicComposition={biologicalModelAllelicComposition}
              geneticBackground={biologicalModelGeneticBackground}
            />
          </Link>
        ) : (
          <MouseModelAllelicComposition
            allelicComposition={biologicalModelAllelicComposition}
            geneticBackground={biologicalModelGeneticBackground}
          />
        )
      ) : (
        naLabel
      ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      disease: {
        impc: { count: size },
      },
    },
  } = usePlatformApi(Summary.fragments.PhenodigmSummaryFragment);

  const variables = { ensemblId: ensgId, efoId, size };

  const request = useQuery(INTOGEN_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.animal_model}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={data => (
        <DataTable
          columns={columns}
          dataDownloader
          dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
          rows={data.disease.evidences.rows}
          pageSize={5}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
          query={INTOGEN_QUERY.loc.source.body}
          variables={variables}
        />
      )}
    />
  );
}

export default Body;

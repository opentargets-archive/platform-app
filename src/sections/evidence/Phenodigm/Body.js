import React from 'react';
import { loader } from 'graphql.macro';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';

const INTOGEN_QUERY = loader('./sectionQuery.gql');

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
    id: 'diseaseModelAssociatedHumanPhenotypes',
    label: 'Human phenotypes',
    renderCell: ({
      diseaseModelAssociatedHumanPhenotypes: humanPhenotypes,
    }) => (
      <TableDrawer
        entries={humanPhenotypes.map(entry => ({
          name: entry.label,
          group: 'Human phenotypes',
        }))}
        showSingle={false}
        message={`${humanPhenotypes.length} phenotype${
          humanPhenotypes.length !== 1 ? 's' : ''
        }`}
      />
    ),
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
    }) =>
      biologicalModelAllelicComposition && biologicalModelGeneticBackground ? (
        <MouseModelAllelicComposition
          allelicComposition={[biologicalModelAllelicComposition]}
          geneticBackground={[biologicalModelGeneticBackground]}
        />
      ) : (
        naLabel
      ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      phenodigm: { count: size },
    },
  } = usePlatformApi(Summary.fragments.PhenodigmSummaryFragment);

  const request = useQuery(INTOGEN_QUERY, {
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
          pageSize={5}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
        />
      )}
    />
  );
}

export default Body;

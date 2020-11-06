import React from 'react';
import { useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import MouseModelAllelicComposition from '../../../components/MouseModelAllelicComposition';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { otgStudyUrl } from '../../../utils/urls';
import { loader } from 'graphql.macro';
import { List, ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  li: {
    padding: 0,
  },
});

const INTOGEN_QUERY = loader('./sectionQuery.gql');

const columns = classes => [
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
    id: 'diseaseModelAssociatedHumanPhenotypes',
    label: 'Human phenotypes',
    renderCell: ({ diseaseModelAssociatedHumanPhenotypes }) => (
      <List>
        {diseaseModelAssociatedHumanPhenotypes ? (
          diseaseModelAssociatedHumanPhenotypes.map((entry, index) => (
            <ListItem key={index} className={classes.li}>
              {entry.label}
            </ListItem>
          ))
        ) : (
          <ListItem>naLabel</ListItem>
        )}
      </List>
    ),
  },
  {
    id: 'diseaseModelAssociatedModelPhenotypes',
    label: 'Mouse phenotypes',

    renderCell: ({ diseaseModelAssociatedModelPhenotypes }) => (
      <List>
        {diseaseModelAssociatedModelPhenotypes ? (
          diseaseModelAssociatedModelPhenotypes.map((entry, index) => (
            <ListItem key={index} className={classes.li}>
              {entry.label}
            </ListItem>
          ))
        ) : (
          <ListItem>naLabel</ListItem>
        )}
      </List>
    ),
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
  const classes = useStyles();

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
          columns={columns(classes)}
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

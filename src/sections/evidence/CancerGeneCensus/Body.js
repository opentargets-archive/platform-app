import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import ChipList from '../../../components/ChipList';
import { DataTable, TableDrawer } from '../../../components/Table';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import { identifiersOrgLink, sentenceCase } from '../../../utils/global';
import { decimalPlaces, naLabel } from '../../../constants';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const CANCER_GENE_CENSUS_QUERY = loader('./sectionQuery.gql');

const samplePercent = item =>
  (item.numberSamplesWithMutationType / item.numberSamplesTested) * 100;

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    id: 'mutationType',
    propertyPath: 'mutatedSamples.functionalConsequence',
    label: 'Mutation type',
    renderCell: ({ mutatedSamples }) =>
      mutatedSamples ? (
        <List style={{ padding: 0 }}>
          {mutatedSamples
            .sort((a, b) => samplePercent(b) - samplePercent(a))
            .map((mutatedSample, index) => (
              <ListItem key={index} style={{ padding: '.25rem 0' }}>
                <Link
                  external
                  to={identifiersOrgLink(
                    'SO',
                    mutatedSample.functionalConsequence.id.slice(3)
                  )}
                >
                  {sentenceCase(mutatedSample.functionalConsequence.label)}
                </Link>
              </ListItem>
            ))}
        </List>
      ) : (
        naLabel
      ),
    filterValue: ({ mutatedSamples }) =>
      (mutatedSamples || [])
        .map(mutatedSample => mutatedSample.functionalConsequence.name)
        .join(),
  },
  {
    id: 'mutatedSamples',
    propertyPath: 'mutatedSamples.numberSamplesWithMutationType',
    label: 'Mutated / Total samples',
    renderCell: ({ mutatedSamples }) => {
      return (
        <List style={{ padding: 0 }}>
          {mutatedSamples
            .sort((a, b) => samplePercent(b) - samplePercent(a))
            .map((item, i) => (
              <ListItem key={i} style={{ padding: '.25rem 0' }}>
                {samplePercent(item).toFixed(decimalPlaces)}%
                <Typography variant="caption" style={{ marginLeft: '.33rem' }}>
                  ({item.numberSamplesWithMutationType}/
                  {item.numberSamplesTested})
                </Typography>
              </ListItem>
            ))}
        </List>
      );
    },
  },
  {
    label: 'Literature',
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

const useStyles = makeStyles({
  roleInCancerBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  roleInCancerTitle: { marginRight: '.5rem' },
});

function Body({ definition, id, label }) {
  const classes = useStyles();
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.CancerGeneCensusSummary
  );

  const request = useQuery(CANCER_GENE_CENSUS_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.cancerGeneCensusSummary.count,
    },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({
        disease: {
          evidences: { rows },
        },
        target: {
          hallmarks: { attributes },
        },
      }) => {
        const roleInCancerItems = attributes
          .filter(attribute => attribute.name === 'role in cancer')
          .map(attribute => ({
            label: attribute.reference.description,
            url: epmcUrl(attribute.reference.pubmedId),
          }));

        return (
          <>
            <Box className={classes.roleInCancerBox}>
              <Typography className={classes.roleInCancerTitle}>
                <b>{label.symbol}</b> role in cancer:
              </Typography>
              <ChipList
                items={
                  roleInCancerItems.length > 0
                    ? roleInCancerItems
                    : [{ label: 'Unknown' }]
                }
              />
            </Box>
            <DataTable
              columns={columns}
              rows={rows}
              dataDownloader
              showGlobalFilter
            />
          </>
        );
      }}
    />
  );
}

export default Body;

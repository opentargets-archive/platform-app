import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';

import ChipList from '../../../components/ChipList';
import { DataTable } from '../../../components/Table';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';

import { naLabel, defaultRowsPerPageOptions } from '../../../constants';
import { dataTypesMap } from '../../../dataTypes';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import { identifiersOrgLink, sentenceCase } from '../../../utils/global';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const CANCER_GENE_CENSUS_QUERY = loader('./sectionQuery.gql');

const samplePercent = item =>
  (item.numberSamplesWithMutationType / item.numberSamplesTested) * 100;

const getMaxPercent = row =>
  Math.max(...row.mutatedSamples.map(item => samplePercent(item)));

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
    renderCell: ({ mutatedSamples }) => {
      if (!mutatedSamples) return naLabel;
      const sortedMutatedSamples = mutatedSamples
        .slice()
        .sort((a, b) => samplePercent(b) - samplePercent(a));
      return (
        <List style={{ padding: 0 }}>
          {sortedMutatedSamples.map((mutatedSample, index) => (
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
      );
    },
    filterValue: ({ mutatedSamples }) =>
      (mutatedSamples || [])
        .map(mutatedSample =>
          sentenceCase(mutatedSample.functionalConsequence.label)
        )
        .join(),
  },
  {
    id: 'mutatedSamples',
    propertyPath: 'mutatedSamples.numberSamplesWithMutationType',
    label: 'Mutated / Total samples',
    renderCell: ({ mutatedSamples }) => {
      if (!mutatedSamples) return naLabel;
      const sortedMutatedSamples = mutatedSamples
        .slice()
        .sort((a, b) => samplePercent(b) - samplePercent(a));
      return (
        <List style={{ padding: 0 }}>
          {sortedMutatedSamples.map((item, i) => {
            const percent = samplePercent(item);

            return (
              <ListItem key={i} style={{ padding: '.25rem 0' }}>
                {percent < 5
                  ? parseFloat(percent.toFixed(2)).toString()
                  : Math.round(percent)}
                %
                <Typography variant="caption" style={{ marginLeft: '.33rem' }}>
                  ({item.numberSamplesWithMutationType}/
                  {item.numberSamplesTested})
                </Typography>
              </ListItem>
            );
          })}
        </List>
      );
    },
    comparator: (a, b) => getMaxPercent(a) - getMaxPercent(b),
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

      return <PublicationsDrawer entries={literatureList} />;
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

  const variables = {
    ensemblId,
    efoId,
    size: summaryData.cancerGeneCensusSummary.count,
  };

  const request = useQuery(CANCER_GENE_CENSUS_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.somatic_mutation}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({
        disease: {
          evidences: { rows },
        },
        target: { hallmarks },
      }) => {
        const roleInCancerItems =
          hallmarks && hallmarks.attributes.length > 0
            ? hallmarks.attributes
                .filter(attribute => attribute.name === 'role in cancer')
                .map(attribute => ({
                  label: attribute.description,
                  url: epmcUrl(attribute.pmid),
                }))
            : [{ label: 'Unknown' }];

        return (
          <>
            <Box className={classes.roleInCancerBox}>
              <Typography className={classes.roleInCancerTitle}>
                <b>{label.symbol}</b> role in cancer:
              </Typography>
              <ChipList items={roleInCancerItems} />
            </Box>
            <DataTable
              columns={columns}
              dataDownloader
              order="desc"
              rows={rows}
              rowsPerPageOptions={defaultRowsPerPageOptions}
              showGlobalFilter
              sortBy="mutatedSamples"
              query={CANCER_GENE_CENSUS_QUERY.loc.source.body}
              variables={variables}
            />
          </>
        );
      }}
    />
  );
}

export default Body;

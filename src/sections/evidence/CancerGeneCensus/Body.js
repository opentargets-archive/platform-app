import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable, TableDrawer } from '../../../components/Table';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import { identifiersOrgLink, sentenceCase } from '../../../utils/global';
import { naLabel } from '../../../constants';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import ChipList from '../../../components/ChipList';

const CANCER_GENE_CENSUS_QUERY = gql`
  query CancerGeneCensusQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["cancer_gene_census"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          variations {
            functionalConsequence {
              id
              label
            }
            numberSamplesWithMutationType
            numberSamplesTested
            inheritancePattern
          }
          literature
        }
      }
    }
    target(ensemblId: $ensemblId) {
      id
      hallmarks {
        attributes {
          reference {
            pubmedId
            description
          }
          name
        }
      }
    }
  }
`;

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
    propertyPath: 'variations.functionalConsequence',
    label: 'Mutation type',
    renderCell: ({ variations }) =>
      variations ? (
        <List style={{ margin: 0, paddingLeft: '17px' }}>
          {variations.map((variation, index) => (
            <ListItem key={index}>
              <Link
                external
                to={identifiersOrgLink(
                  'SO',
                  variation.functionalConsequence.id.slice(3)
                )}
              >
                {sentenceCase(variation.functionalConsequence.label)}
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        naLabel
      ),
    filterValue: ({ variations }) =>
      (variations || [])
        .map(variation => variation.functionalConsequence.name)
        .join(),
  },
  {
    id: 'mutatedSamples',
    propertyPath: 'variations.numberSamplesWithMutationType',
    label: 'Mutated / Total samples',
    numeric: true,
    renderCell: ({ variations }) => {
      return (
        <List style={{ margin: 0, paddingLeft: '17px' }}>
          {variations.map(
            ({ numberSamplesWithMutationType, numberSamplesTested }, i) => (
              <ListItem key={i} style={{ justifyContent: 'flex-end' }}>
                {numberSamplesWithMutationType}/{numberSamplesTested}
              </ListItem>
            )
          )}
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
              <ChipList items={roleInCancerItems} />
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

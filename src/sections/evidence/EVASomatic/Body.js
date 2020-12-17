import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Typography, makeStyles } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';
import ChipList from '../../../components/ChipList';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
import {
  clinvarStarMap,
  naLabel,
  defaultRowsPerPageOptions,
} from '../../../constants';
import Tooltip from '../../../components/Tooltip';
import ClinvarStars from '../../../components/ClinvarStars';
import Summary from './Summary';
import Description from './Description';
import Link from '../../../components/Link';

const EVA_SOMATIC_QUERY = gql`
  query evaSomaticQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva_somatic"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          variantRsId
          studyId
          clinicalSignificances
          allelicRequirements
          confidence
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
    id: 'variantRsId',
    label: 'Variant',
    renderCell: ({ variantRsId }) => {
      return variantRsId ? (
        <Link
          external
          to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
        >
          {variantRsId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'recordId',
    label: 'ClinVar ID',
    renderCell: ({ studyId }) => {
      return (
        <Link external to={`https://identifiers.org/clinvar.record/${studyId}`}>
          {studyId}
        </Link>
      );
    },
  },
  {
    id: 'clinicalSignificances',
    label: 'Clinical significance',
    renderCell: ({ clinicalSignificances }) => {
      return !clinicalSignificances ? (
        naLabel
      ) : clinicalSignificances.length === 1 ? (
        sentenceCase(clinicalSignificances[0])
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {clinicalSignificances.map(clinicalSignificance => {
            return (
              <li key={clinicalSignificance}>
                {sentenceCase(clinicalSignificance)}
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    id: 'allelicRequirements',
    label: 'Allelic requirement',
    renderCell: ({ allelicRequirements }) => {
      return !allelicRequirements ? (
        naLabel
      ) : allelicRequirements.length === 1 ? (
        allelicRequirements[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {allelicRequirements.map(allelicRequirement => {
            return <li key={allelicRequirement}>{allelicRequirement}</li>;
          })}
        </ul>
      );
    },
  },
  {
    label: 'Confidence',
    renderCell: ({ confidence }) => {
      return (
        <Tooltip title={confidence}>
          <span>
            <ClinvarStars num={clinvarStarMap[confidence]} />
          </span>
        </Tooltip>
      );
    },
  },
  {
    label: 'Literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id !== 'NA') {
            acc.push({
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            });
          }
          return acc;
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
    Summary.fragments.evaSomaticSummary
  );

  const request = useQuery(EVA_SOMATIC_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.evaSomaticSummary.count,
    },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({
        disease,
        target: {
          hallmarks: { attributes },
        },
      }) => {
        const { rows } = disease.evidences;

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
              sortBy="score"
              order="desc"
              rowsPerPageOptions={defaultRowsPerPageOptions}
            />
          </>
        );
      }}
    />
  );
}

export default Body;

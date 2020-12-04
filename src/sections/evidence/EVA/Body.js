import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { clinvarStarMap, naLabel } from '../../../constants';
import Summary from './Summary';
import Description from './Description';
import ScientificNotation from '../../../components/ScientificNotation';
import Tooltip from '../../../components/Tooltip';
import { epmcUrl } from '../../../utils/urls';

const EVA_QUERY = gql`
  query evaQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva"]
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
          variantFunctionalConsequence {
            id
            label
          }
          clinicalSignificances
          allelicRequirements
          confidence
          score
          literature
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  star: {
    color: theme.palette.primary.main,
  },
}));

function ClinvarStar() {
  const classes = useStyles();
  return <FontAwesomeIcon className={classes.star} icon={faStar} size="sm" />;
}

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return (
        <Link component={RouterLink} to={`/disease/${disease.id}`}>
          {disease.name}
        </Link>
      );
    },
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported disease/phenotype',
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
    id: 'studyId',
    label: 'ClinVar ID',
    renderCell: ({ studyId }) => {
      return studyId ? (
        <Link external to={`https://www.ncbi.nlm.nih.gov/clinvar/${studyId}`}>
          {studyId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    label: 'Functional consequence',
    renderCell: ({ variantFunctionalConsequence }) => {
      return (
        <Link
          external
          to={`http://www.sequenceontology.org/browser/current_svn/term/${
            variantFunctionalConsequence.id
          }`}
        >
          {variantFunctionalConsequence.label}
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
        clinicalSignificances[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {clinicalSignificances.map(clinicalSignificance => {
            return <li key={clinicalSignificance}>{clinicalSignificance}</li>;
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
      const numStars = clinvarStarMap[confidence];
      const stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(<ClinvarStar key={i} />);
      }
      return (
        <Tooltip title={confidence}>
          <span>{stars}</span>
        </Tooltip>
      );
    },
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: ({ score }) => <ScientificNotation number={score} />,
    sortable: true,
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

      return <TableDrawer entries={literatureList} caption="Literature" />;
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(Summary.fragments.evaSummary);

  const request = useQuery(EVA_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.evaSummary.count,
    },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
            sortBy="score"
            order="desc"
          />
        );
      }}
    />
  );
}

export default Body;

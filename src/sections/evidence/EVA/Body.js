import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'ot-ui';
import { clinvarStarMap, naLabel } from '../../../constants';
import { epmcUrl } from '../../../utils/urls';
import usePlatformApi from '../../../hooks/usePlatformApi';
import ClinvarStar from '../../../components/ClinvarStar';
import Tooltip from '../../../components/Tooltip';
import { TableDrawer } from '../../../components/Table';
import EVAServerTable from './EVAServerTable';
import EVAClientTable from './EVAClientTable';

import Summary from './Summary';

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
  const { data } = usePlatformApi(Summary.fragments.evaSummary);

  return data.evaSummary.count > 1000 ? (
    <EVAServerTable
      definition={definition}
      id={id}
      label={label}
      columns={columns}
    />
  ) : (
    <EVAClientTable
      definition={definition}
      id={id}
      label={label}
      columns={columns}
    />
  );
}

export default Body;

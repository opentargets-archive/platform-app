import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { naLabel } from '../../../constants';
import Summary from './Summary';
import Description from './Description';
import ScientificNotation from '../../../components/ScientificNotation';
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
          resourceScore
          literature
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
      return (
        <Link
          external
          to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
        >
          {variantRsId}
        </Link>
      );
    },
  },
  {
    id: 'recordId',
    label: 'ClinVar ID',
    renderCell: ({ recordId }) => {
      return (
        <Link external to={`https://www.ncbi.nlm.nih.gov/clinvar/${recordId}`}>
          {recordId}
        </Link>
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

      return (
        <ul>
          {clinicalSignificances.map(clinicalSignificance => {
            return <li key={clinicalSignificance}>{clinicalSignificance}</li>;
          })}
        </ul>
      );
    },
  },
  {
    label: 'P-value',
    renderCell: ({ resourceScore }) => {
      return <ScientificNotation number={resourceScore} />;
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
          />
        );
      }}
    />
  );
}

export default Body;

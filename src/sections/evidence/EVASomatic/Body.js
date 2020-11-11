import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
import { sentenceCase } from '../../../utils/global';
import Summary from './Summary';
import Description from './Description';

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
          recordId
          variations {
            functionalConsequence {
              id
              label
            }
          }
          clinicalSignificance
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
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported disease/phenotype',
  },
  {
    id: 'recordId',
    label: 'ClinVar ID',
    renderCell: ({ recordId }) => {
      return (
        <Link
          external
          to={`https://identifiers.org/clinvar.record/${recordId}`}
        >
          {recordId}
        </Link>
      );
    },
  },
  {
    label: 'Functional consequence',
    renderCell: ({ variations }) => {
      return (
        <ul style={{ margin: 0, paddingLeft: '17px' }}>
          {variations.map(({ functionalConsequence }) => {
            return (
              <li key={functionalConsequence.id}>
                <Link
                  external
                  to={`https://identifiers.org/so/${functionalConsequence.id}`}
                >
                  {sentenceCase(functionalConsequence.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    id: 'clinicalSignificance',
    label: 'Clinical significance',
  },
  {
    label: 'Literature',
    renderCell: data => {
      const literature = data.literature || [];
      const literatureList = [];
      literature.forEach(id => {
        if (id !== 'NA') {
          literatureList.push({
            name: id,
            url: epmcUrl(id),
            group: 'literature',
          });
        }
      });

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id, label }) {
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

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
import Summary from './Summary';
import Description from './Description';

const CRISPR_QUERY = gql`
  query crisprQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["crispr"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseCellLines
          diseaseFromSource
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
    label: 'Reported disease/phenotype',
    renderCell: ({ diseaseCellLines, diseaseFromSource }) => {
      return `${diseaseCellLines.length} ${diseaseFromSource} cell lines`;
    },
  },
  {
    id: 'resourceScore',
    label: 'Priority score',
    renderCell: ({ resourceScore }) => resourceScore.toFixed(3),
  },
  {
    label: 'Literature',
    renderCell: ({ literature = [] }) => {
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
  const { data: summaryData } = usePlatformApi(Summary.fragments.crisprSummary);

  const request = useQuery(CRISPR_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.crisprSummary.count,
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

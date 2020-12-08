import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { defaultRowsPerPageOptions } from '../../../constants';
import SectionItem from '../../../components/Section/SectionItem';
import { betaClient } from '../../../client';
import { Table, getPage } from '../../../components/Table';
import Description from './Description';

const EVA_QUERY = gql`
  query evaQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
    $cursor: [String!]
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva"]
        size: $size
        cursor: $cursor
      ) {
        count
        cursor
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
          literature
        }
      }
    }
  }
`;

function EVAServerTable({ definition, id, label, columns }) {
  const { ensgId: ensemblId, efoId } = id;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const request = useQuery(EVA_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: pageSize,
    },
    notifyOnNetworkStatusChange: true,
    client: betaClient,
  });

  const { loading, data, fetchMore } = request;

  function handlePageChange(newPage) {
    if (newPage * pageSize + pageSize > data.disease.evidences.rows.length) {
      fetchMore({
        variables: {
          ensemblId,
          efoId,
          size: pageSize,
          cursor: data.disease.evidences.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setPage(newPage);
          return {
            ...prev,
            disease: {
              ...prev.disease,
              evidences: {
                ...prev.disease.evidences,
                cursor: fetchMoreResult.disease.evidences.cursor,
                rows: [
                  ...prev.disease.evidences.rows,
                  ...fetchMoreResult.disease.evidences.rows,
                ],
              },
            },
          };
        },
      });
    } else {
      setPage(newPage);
    }
  }

  function handleRowsPerPageChange(newPageSize) {
    if (page * newPageSize + newPageSize > data.disease.evidences.rows.length) {
      fetchMore({
        variables: {
          ensemblId,
          efoId,
          size: pageSize,
          cursor: data.disease.evidences.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setPage(0);
          setPageSize(newPageSize);
          return {
            ...prev,
            disease: {
              ...prev.disease,
              evidences: {
                ...prev.disease.evidences,
                cursor: fetchMoreResult.disease.evidences.cursor,
                rows: [
                  ...prev.disease.evidences.rows,
                  ...fetchMoreResult.disease.evidences.rows,
                ],
              },
            },
          };
        },
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  }

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { count, rows } = disease.evidences;
        return (
          <Table
            loading={loading}
            columns={columns}
            rows={getPage(rows, page, pageSize)}
            dataDownloader
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowCount={count}
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default EVAServerTable;

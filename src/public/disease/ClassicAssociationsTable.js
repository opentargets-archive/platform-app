import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useTheme } from '@material-ui/core/styles';
import { client3 } from './../client';
import { lighten } from 'polished';
import Table from '../common/Table/Table';

const DISEASE_ASSOCIATIONS_QUERY = gql`
  query DiseaseAssociationsQuery($efoId: String!, $page: Pagination!) {
    disease(efoId: $efoId) {
      associatedTargets(page: $page) {
        score
        idPerDT
        scorePerDT
        target {
          id
          approvedSymbol
        }
      }
    }
  }
`;

function getColumns(dataTypes, primaryColor) {
  const columns = [
    { id: 'approvedSymbol' },
    {
      id: 'overall',
      renderCell: row => {
        return (
          <div
            style={{ backgroundColor: lighten(1 - row.overall, primaryColor) }}
          >
            {row.overall}
          </div>
        );
      },
    },
  ];
  dataTypes.forEach(dataType => {
    columns.push({
      id: dataType,
      renderCell: row => {
        return (
          <div
            style={{
              backgroundColor: lighten(1 - row[dataType], primaryColor),
            }}
          >
            {row[dataType]}
          </div>
        );
      },
    });
  });

  return columns;
}

function getRows(data, dataTypes) {
  return data.map(d => {
    const row = {
      approvedSymbol: d.target.approvedSymbol,
      overall: d.score,
    };

    dataTypes.forEach(dataType => {
      const index = d.idPerDT.indexOf(dataType);

      if (index === -1) {
        row[dataType] = 0;
      } else {
        row[dataType] = d.scorePerDT[index];
      }
    });
    return row;
  });
}

const ClassicAssociationsTable = ({ efoId, dataTypes }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);

  const { loading, error, data } = useQuery(DISEASE_ASSOCIATIONS_QUERY, {
    variables: {
      efoId,
      page: { index: page, size: pageSize },
    },
    client: client3,
  });

  const handlePageChange = page => {
    setPage(page);
  };

  const handleRowsPerPageChange = pageSize => {
    setPageSize(pageSize);
  };

  if (error) return null;

  const columns = getColumns(dataTypes, theme.palette.primary.main);
  const rows = getRows(data?.disease.associatedTargets ?? [], dataTypes);

  return (
    <Table
      loading={loading}
      columns={columns}
      rows={rows}
      rowCount={300}
      page={page}
      pageSize={pageSize}
      rowsPerPageOptions={[10, 25, 100]}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default ClassicAssociationsTable;

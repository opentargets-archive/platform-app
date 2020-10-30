import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Link, significantFigures } from 'ot-ui';

import Description from './Description';
import LinearVenn, { LinearVennLegend } from '../../../components/LinearVenn';
import { Table, PaginationActionsComplete } from '../../../components/Table';
import SectionItem from '../../../components/Section/SectionItem';
import useBatchDownloader from '../../../hooks/useBatchDownloader';

const RELATED_TARGETS_QUERY = gql`
  query RelatedTargetsQuery(
    $ensemblId: String!
    $index: Int! = 0
    $size: Int! = 10
  ) {
    target(ensemblId: $ensemblId) {
      id
      relatedTargets(page: { index: $index, size: $size }) {
        count
        maxCountAOrB
        rows {
          id
          countA
          countB
          countAAndB
          score
          B {
            approvedSymbol
            id
          }
        }
      }
    }
  }
`;

const columns = (symbol, maxCountAOrB) => [
  {
    id: 'B.approvedSymbol',
    label: 'Related target Ⓑ',
    exportLabel: 'relatedTarget',
    renderCell: ({ B }) => (
      <Link to={`/target/${B.id}`}>{B.approvedSymbol}</Link>
    ),
  },
  {
    id: 'score',
    label: 'Similarity score',
    numeric: true,
    renderCell: ({ score }) => significantFigures(score),
  },
  {
    id: 'countANotB',
    label: '|Ⓐ - Ⓑ|',
    exportLabel: 'countANotB',
    exportValue: ({ countA, countAAndB }) => countA - countAAndB,
    tooltip: `Diseases associated with ${symbol} but not the related target`,
    numeric: true,
    renderCell: ({ countA, countAAndB }) => countA - countAAndB,
  },
  {
    id: 'countAAndB',
    label: '|Ⓐ ∩ Ⓑ|',
    exportLabel: 'countAAndB',
    tooltip: 'Shared disease associations',
    numeric: true,
    renderCell: ({ countAAndB }) => countAAndB,
  },
  {
    id: 'countBNotA',
    label: '|Ⓑ - Ⓐ|',
    exportLabel: 'countBNotA',
    exportValue: ({ countAAndB, countB }) => countB - countAAndB,
    tooltip: `Diseases associated with the related target but not ${symbol}`,
    numeric: true,
    renderCell: ({ countAAndB, countB }) => countB - countAAndB,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`Diseases associated with ${symbol} but not the related target`}
        b={`Diseases associated with the related target but not ${symbol}`}
        aAndB="Shared disease associations"
      />
    ),
    exportValue: false,
    renderCell: ({ countA, countAAndB, countB }) => (
      <LinearVenn
        aOnly={countA - countAAndB}
        aAndB={countAAndB}
        bOnly={countB - countAAndB}
        max={maxCountAOrB}
      />
    ),
  },
];

function Body({ definition, id: ensgId, label: symbol }) {
  const [page, setPage] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(RELATED_TARGETS_QUERY, {
    variables: {
      ensemblId: ensgId,
    },
    // this option is set to true so that we get an updated value of loading
    // when using fetchMore later
    notifyOnNetworkStatusChange: true,
  });

  const getAllRelatedTargets = useBatchDownloader(
    RELATED_TARGETS_QUERY,
    { ensemblId: ensgId },
    'data.target.relatedTargets'
  );

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchMore({
      variables: { index: newPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  };

  return (
    <SectionItem
      definition={definition}
      request={{ loading, error, data }}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        const { count, maxCountAOrB, rows = [] } = data.target.relatedTargets;

        return (
          <Table
            loading={loading}
            columns={columns(symbol, maxCountAOrB)}
            dataDownloader
            dataDownloaderRows={getAllRelatedTargets}
            dataDownloaderFileStem={`${ensgId}-related-targets`}
            rows={rows}
            rowCount={count}
            page={page}
            onPageChange={handlePageChange}
            ActionsComponent={PaginationActionsComplete}
          />
        );
      }}
    />
  );
}

export default Body;

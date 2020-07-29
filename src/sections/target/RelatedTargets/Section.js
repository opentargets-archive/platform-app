import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { Link, significantFigures } from 'ot-ui';

import { Table, PaginationActionsComplete } from '../../../components/Table';
import LinearVenn, { LinearVennLegend } from '../../../components/LinearVenn';
import useBatchDownloader from '../../../hooks/useBatchDownloader';

const RELATED_TARGETS_QUERY = loader('./sectionQuery.gql');

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

const Section = ({ ensgId, symbol }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, loading, fetchMore } = useQuery(RELATED_TARGETS_QUERY, {
    variables: {
      ensemblId: ensgId,
      size: pageSize,
    },
    // this option is set to true so that we get an updated value of loading
    // when using fetchMore later
    notifyOnNetworkStatusChange: true,
  });

  const handleTableAction = ({ page, pageSize }) => {
    setPage(page);
    setPageSize(pageSize);
    fetchMore({
      variables: {
        index: page,
        size: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult ? fetchMoreResult : prev;
      },
    });
  };

  const getAllRelatedTargets = useBatchDownloader(
    RELATED_TARGETS_QUERY,
    {
      ensemblId: ensgId,
    },
    'data.target.relatedTargets'
  );

  const { maxCountAOrB, rows = [], count } = data?.target?.relatedTargets ?? {};

  return (
    <Table
      page={page}
      pageSize={pageSize}
      loading={loading}
      dataDownloader
      dataDownloaderRows={getAllRelatedTargets}
      dataDownloaderFileStem={`${ensgId}-related-targets`}
      columns={columns(symbol, maxCountAOrB)}
      rows={rows}
      rowCount={count}
      onTableAction={handleTableAction}
      ActionsComponent={PaginationActionsComplete}
    />
  );
};

export default Section;

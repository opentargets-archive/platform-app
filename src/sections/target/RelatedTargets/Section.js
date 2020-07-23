import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { Link, significantFigures } from 'ot-ui';

import useBatchDownloader from '../../../hooks/useBatchDownloader';
import LinearVenn, { LinearVennLegend } from '../../../components/LinearVenn';
import Table, { PaginationActionsComplete } from '../../../components/Table';

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
  const { data, loading, fetchMore } = useQuery(RELATED_TARGETS_QUERY, {
    variables: {
      ensemblId: ensgId,
    },
    // this option is set to true so that we get an updated value of loading
    // when using fetchMore later
    notifyOnNetworkStatusChange: true,
  });

  const handleTableAction = ({ page }) => {
    fetchMore({
      variables: {
        index: page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
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
      loading={loading}
      serverSide
      dataDownloader
      dataDownloaderRows={getAllRelatedTargets}
      dataDownloaderFileStem={`${ensgId}-related-targets`}
      columns={columns(symbol, maxCountAOrB)}
      rows={rows}
      rowCount={count}
      onTableAction={handleTableAction}
      pagination={PaginationActionsComplete}
    />
  );
};

export default Section;

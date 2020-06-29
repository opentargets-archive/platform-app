import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { Link, significantFigures } from 'ot-ui';
import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';
import Table from '../../../common/Table/Table';
const RELATED_TARGETS_QUERY = loader('./sectionQuery.gql');

const columns = (symbol, maxCountAOrB) => [
  {
    id: 'B.approvedSymbol',
    label: 'Related target Ⓑ',
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
    tooltip: `Diseases associated with ${symbol} but not the related target`,
    numeric: true,
    renderCell: ({ countA, countAAndB }) => countA - countAAndB,
  },
  {
    id: 'countAAndB',
    label: '|Ⓐ ∩ Ⓑ|',
    tooltip: 'Shared disease associations',
    numeric: true,
    renderCell: ({ countAAndB }) => countAAndB,
  },
  {
    id: 'countBNotA',
    label: '|Ⓑ - Ⓐ|',
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

const Section = props => {
  const { data, fetchMore } = useQuery(RELATED_TARGETS_QUERY, {
    variables: {
      ensemblId: props.ensgId,
    },
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

  if (!data) return null;

  const { maxCountAOrB, rows, count } = data.target.relatedTargets;

  return (
    <Table
      serverSide
      columns={columns(props.symbol, maxCountAOrB)}
      rows={rows}
      rowCount={count}
      onTableAction={handleTableAction}
    />
  );
};

export default Section;

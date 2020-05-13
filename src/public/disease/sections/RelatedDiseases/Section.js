import React, { useEffect, useState } from 'react';

import { Link, significantFigures } from 'ot-ui';
import Table from '../../../common/Table/Table';
import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

const columns = (name, maxCountAOrB) => [
  {
    id: 'B.name',
    label: `Related disease ${String.fromCodePoint('9399')}`,
    comparator: (a, b) => (a.B.name <= b.B.name ? -1 : 1),
    renderCell: d => <Link to={`/disease/${d.B.id}`}>{d.B.name}</Link>,
  },
  {
    id: 'score',
    label: 'Similarity score',
    numeric: true,
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'countANotB',
    label: `${String.fromCodePoint('9398')} - ${String.fromCodePoint('9399')}`,
    tooltip: `Diseases associated with ${name} but not the related disease`,
    numeric: true,
    hidden: ['mdDown'],
  },
  {
    id: 'countAAndB',
    label: `${String.fromCodePoint('9398')} + ${String.fromCodePoint('9399')}`,
    tooltip: 'Shared disease associations',
    numeric: true,
  },
  {
    id: 'countBNotA',
    label: `${String.fromCodePoint('9399')} - ${String.fromCodePoint('9398')}`,
    tooltip: `Diseases associated with the related disease but not ${name}`,
    numeric: true,
    hidden: ['mdDown'],
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`${String.fromCodePoint('9398')} - ${String.fromCodePoint('9399')}`}
        aAndB={`${String.fromCodePoint('9398')} + ${String.fromCodePoint(
          '9399'
        )}`}
        b={`${String.fromCodePoint('9399')} - ${String.fromCodePoint('9398')}`}
      />
    ),
    tooltip: (
      <LinearVennLegend
        tooltip
        a={`Diseases associated with ${name} but not the related disease`}
        aAndB="Shared disease associations"
        b={`Diseases associated with the related target but not ${name}`}
      />
    ),
    tooltipStyle: {
      popper: { maxWidth: 'none' },
      tooltip: { maxWidth: 'none' },
    },
    hidden: ['lgDown'],
    style: { width: '400px' },
    renderCell: d => (
      <LinearVenn
        aOnly={d.countA - d.countAAndB}
        bOnly={d.countB - d.countAAndB}
        aAndB={d.countAAndB}
        max={maxCountAOrB}
      />
    ),
  },
];

const Section = ({ data, name, fetchMore }) => {
  const { rows, count, maxCountAOrB } = data;
  const [pageIndex, setPageIndex] = useState(0);

  const onTableAction = pe => pe.page !== undefined && setPageIndex(pe.page);
  const pageSize = 10;

  useEffect(
    () => {
      fetchMore({
        variables: { index: pageIndex, size: pageSize },
        updateQuery: (prev, { fetchMoreResult }) =>
          !fetchMoreResult ? prev : { ...prev, ...fetchMoreResult },
      });
    },
    [fetchMore, pageIndex]
  );

  const rowsMapped = rows.map(d => ({
    ...d,
    countANotB: d.countA - d.countAAndB,
    countBNotA: d.countB - d.countAAndB,
  }));

  return (
    <Table
      columns={columns(name, maxCountAOrB)}
      rows={rowsMapped}
      rowCount={count}
      serverSide={true}
      onTableAction={onTableAction}
      noWrapHeader
    />
  );
};

export default Section;

import React, { useEffect, useState } from 'react';

import { Link, significantFigures } from 'ot-ui';
import Table from '../../../common/Table/Table';
import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

const aLabel = String.fromCodePoint('9398');
const bLabel = String.fromCodePoint('9399');
const difference = String.fromCodePoint('8726');
const intersection = String.fromCodePoint('8898');
const countANotBLabel = ['|', aLabel, difference, bLabel, '|'].join(' ');
const countBNotALabel = ['|', bLabel, difference, aLabel, '|'].join(' ');
const countAAndBLabel = ['|', aLabel, intersection, bLabel, '|'].join(' ');

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
    label: countANotBLabel,
    tooltip: `Diseases associated with ${name} but not the related disease`,
    numeric: true,
    hidden: ['mdDown'],
  },
  {
    id: 'countAAndB',
    label: countAAndBLabel,
    tooltip: 'Shared disease associations',
    numeric: true,
  },
  {
    id: 'countBNotA',
    label: countBNotALabel,
    tooltip: `Diseases associated with the related disease but not ${name}`,
    numeric: true,
    hidden: ['mdDown'],
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={countANotBLabel}
        aAndB={countAAndBLabel}
        b={countBNotALabel}
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
    style: { width: '400px', lineHeight: 0, paddingLeft: '1.5rem' },
    labelStyle: { paddingLeft: '1.5rem' },
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

  const onTableAction = params => setPageIndex(params.page);
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

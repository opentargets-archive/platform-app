import React, { useEffect, useState } from 'react';

import { OtTableRF, Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

const columns = (name, maxCountAOrB) => [
  {
    id: 'B.name',
    label: 'Related disease',
    orderable: false,
    renderCell: d => <Link to={`/target/${d.B.id}`}>{d.B.name}</Link>,
    comparator: (a, b) => (a.B.name <= b.B.name ? -1 : 1),
  },
  {
    id: 'score',
    label: 'Similarity score',
    orderable: false,
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'countANotB',
    label: `Diseases associated with ${name} but not the related disease`,
    orderable: false,
  },
  {
    id: 'countAndB',
    label: 'Shared disease associations',
    orderable: false,
  },
  {
    id: 'countBNotA',
    label: `Diseases associated with the related disease but not ${name}`,
    orderable: false,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`Diseases associated with ${name} but not the related disease`}
        b={`Diseases associated with the related target but not ${name}`}
        aAndB="Shared disease associations"
      />
    ),
    orderable: false,
    renderCell: d => (
      <LinearVenn
        aOnly={d.countA - d.countAndB}
        bOnly={d.countB - d.countAndB}
        aAndB={d.countAndB}
        max={maxCountAOrB}
      />
    ),
  },
];

const Section = ({ data, name, fetchMore }) => {
  const { rows, count, maxCountAOrB } = data;
  const [pageIndex, setPageIndex] = useState(0);

  const onPageSort = pe => pe.page !== undefined && setPageIndex(pe.page);
  const pageSize = 10;

  useEffect(() => {
    fetchMore({
      variables: { index: pageIndex, size: pageSize },
      updateQuery: (prev, { fetchMoreResult }) =>
        !fetchMoreResult ? prev : { ...prev, ...fetchMoreResult },
    });
  }, [pageIndex]);

  const rowsMapped = rows.map(d => ({
    ...d,
    countANotB: d.countA - d.countAndB,
    countBNotA: d.countB - d.countAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(name, maxCountAOrB)}
      data={rowsMapped}
      serverSide={true}
      totalRowsCount={count}
      onPageSort={onPageSort}
    />
  );
};

export default Section;

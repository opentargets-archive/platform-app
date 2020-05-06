import { OtTableRF, Link, significantFigures } from 'ot-ui';
import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const columns = (symbol, maxCountAOrB) => [
  {
    id: 'B.approvedSymbol',
    label: 'Related target',
    orderable: false,
    renderCell: d => <Link to={`/target/${d.B.id}`}>{d.B.approvedSymbol}</Link>,
    comparator: (a, b) => {
      if (a.B.approvedSymbol <= b.B.approvedSymbol) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'score',
    label: 'Similarity score',
    orderable: false,
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'countANotB',
    label: `Diseases associated with ${symbol} but not the related target`,
    orderable: false,
  },
  {
    id: 'countAAndB',
    label: 'Shared disease associations',
    orderable: false,
  },
  {
    id: 'countBNotA',
    label: `Diseases associated with the related target but not ${symbol}`,
    orderable: false,
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
    orderable: false,
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

const pageSize = 10; // unlikely to change for now, so no need to go into state

const Section = props => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    // fetchMore is Apollo's pagination function
    // no table sorting / ordering at the moment
    const { fetchMore } = props;
    fetchMore({
      variables: { index: pageIndex, size: pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, fetchMoreResult);
      },
    });
  });

  const onPageSort = pe => {
    // table specific constants
    const { page, pageSize, sortBy, order } = pe;
    if (page !== undefined && page !== pageIndex) {
      setPageIndex(page);
    }
  };

  const { data, symbol } = props;
  const { rows, count, maxCountAOrB } = data;

  const rowsMapped = rows.map(d => ({
    ...d,
    countANotB: d.countA - d.countAAndB,
    countBNotA: d.countB - d.countAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(symbol, maxCountAOrB)}
      data={rowsMapped}
      serverSide={true}
      totalRowsCount={count}
      onPageSort={onPageSort}
    />
  );
};

export default Section;

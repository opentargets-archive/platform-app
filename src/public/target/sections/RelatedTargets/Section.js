import React from 'react';
import { OtTableRF, Link, significantFigures } from 'ot-ui';
import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

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

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // fetchMore is Apollo's pagination function
    // no table sorting / ordering at the moment
    const { fetchMore } = this.props;
    const { pageIndex } = this.state;
    if (prevState.pageIndex !== pageIndex) {
      fetchMore({
        variables: { index: pageIndex, size: pageSize },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign({}, prev, fetchMoreResult);
        },
      });
    }
  }

  render = () => {
    const { data, symbol } = this.props;
    const { rows, count, maxCountAOrB } = data;

    const rowsMapped = rows.map(d => ({
      ...d,
      countANotB: d.countA - d.countAAndB,
      countBNotA: d.countB - d.countAAndB,
    }));

    const onPageSort = pe => {
      // table specific constants
      const { page } = pe;
      let ns = {};

      if (page !== undefined) {
        ns.pageIndex = page;
      }
      this.setState(ns);
    };

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
}

export default Section;

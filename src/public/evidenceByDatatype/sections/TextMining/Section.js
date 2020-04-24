import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF } from 'ot-ui';

import LevelBar from '../../../common/LevelBar';
import PublicationDetails from './custom/PublicationDetails';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    orderable: false,
    style: { verticalAlign: 'top', paddingTop: '7px' },
    width: '15%',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'publication.title',
    label: 'Publication',
    orderable: false,
    style: { verticalAlign: 'top', paddingBottom: '14px', paddingTop: '7px' }, // will replace cell padding with cols/rows options in ot-ui
    renderCell: p => <PublicationDetails data={p} />,
  },
  {
    id: 'publication.date',
    label: 'Year',
    style: { verticalAlign: 'top', paddingTop: '7px' },
    width: '7%',
    renderCell: d => d.publication.date,
  },
  {
    id: 'relevance',
    label: 'Relevance',
    style: { verticalAlign: 'top', paddingTop: '7px' },
    width: '10%',
    renderCell: d => <LevelBar value={Math.min(d.relevance, 1) * 100} />,
  },
];

const size = 10; // unlikely to change for now, so no need to go into state

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      from: 0,
      sortBy: '', // fall back to API default (score, desc)
      order: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchMore } = this.props;
    const { from, sortBy, order } = this.state;

    if (
      prevState.from !== from ||
      prevState.sortBy !== sortBy ||
      prevState.order !== order
    ) {
      fetchMore({
        variables: { from: from, size: size, sortBy: sortBy, order: order },
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
    const { data } = this.props;

    const onPageSort = pe => {
      const { page, pageSize, sortBy, order } = pe;
      let ns = {};
      if (page !== undefined) {
        // accounts for page 0
        ns.from = page * (pageSize || size);
      }
      if (sortBy) {
        ns.sortBy = sortBy;
        ns.order = order;
      }
      this.setState(ns);
    };

    return (
      <React.Fragment>
        <Typography>
          Evidence from <strong>EuropePMC</strong>.
        </Typography>
        <OtTableRF
          loading={false}
          error={false}
          columns={columns}
          data={data.rows}
          serverSide={true}
          totalRowsCount={data.textMiningCount}
          onPageSort={onPageSort}
          sortBy={'relevance'}
          order={'desc'}
        />
      </React.Fragment>
    );
  };
}

export default Section;

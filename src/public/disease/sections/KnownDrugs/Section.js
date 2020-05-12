import React, { useEffect, useState } from 'react';
import { Link } from 'ot-ui';

import Table from '../../../common/Table/Table';
import { label } from '../../../../utils/global';
import Config from '../../../../config/global';

const columns = () => [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'drug',
    label: 'Drug',
    renderCell: d => (
      <Link to={`/drug/${d.drug.id}`}>{label(d.drug.name)}</Link>
    ),
  },
  {
    id: 'phase',
    label: 'Phase',
  },
  {
    id: 'status',
    label: 'Status',
    renderCell: d => {
      const ctSearchUrl = new URL(Config.ctSearchUrl);
      ctSearchUrl.searchParams.append('results', d.ctIds.join(' OR '));

      return (
        <Link external to={ctSearchUrl.href}>
          Clinical trials
        </Link>
      );
    },
  },
  {
    id: 'ctIds',
    label: 'Source',
    renderCell: d => label(d.status),
  },
  {
    id: 'drugType',
    label: 'Type',
    renderCell: d => label(d.drugType),
  },
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of action',
  },
  {
    id: 'activity',
    label: 'Activity',
    renderCell: d => label(d.activity),
  },
];

const Section = ({ data, fetchMore }) => {
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

  console.log('data.rows', data.rows);

  return (
    <Table
      columns={columns()}
      rows={data.rows}
      rowCount={data.count}
      serverSide={true}
      onTableAction={onTableAction}
      noWrapHeader
    />
  );
};

export default Section;

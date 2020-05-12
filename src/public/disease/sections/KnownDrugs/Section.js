import React, { useEffect, useState } from 'react';

import Table from '../../../common/Table/Table';

const columns = () => [
  {
    id: 'disease',
    label: 'Disease',
    orderable: true,
  },
  {
    id: 'phase',
    label: 'Phase',
    numeric: true,
    orderable: true,
  },
  {
    id: 'status',
    label: 'Status',
    numeric: true,
  },
  {
    id: 'drug',
    label: 'Drug',
  },
  {
    id: 'type',
    label: 'Type',
  },
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of action',
  },
  {
    id: 'activity',
    label: 'Activity',
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

  const rowsMapped = data.rows.map(d => ({
    ...d,
    disease: d.disease.name,
    drug: d.drug.name,
    type: d.drugType,
  }));

  return (
    <Table
      columns={columns()}
      rows={rowsMapped}
      rowCount={data.count}
      serverSide={true}
      onTableAction={onTableAction}
      noWrapHeader
    />
  );
};

export default Section;

import React, { useEffect, useState } from 'react';

import { Link } from 'ot-ui';

import Table from '../../../common/Table/Table';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
import { clinicalTrialsSearchUrl } from '../../../configuration';
import { label } from '../../../../utils/global';
import { sectionQuery } from '.';

const headerGroups = [
  {
    colspan: 1,
  },
  {
    colspan: 3,
    label: 'Trial information',
  },
  {
    colspan: 4,
    label: 'Drug information',
  },
];

const columns = [
  {
    id: 'disease',
    propertyPath: 'disease.id',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{label(d.disease.name)}</Link>
    ),
  },
  {
    id: 'phase',
  },
  {
    id: 'status',
    renderCell: d => label(d.status),
  },
  {
    id: 'ctIds',
    label: 'Source',
    renderCell: d => {
      const ctSearchUrl = new URL(clinicalTrialsSearchUrl);
      ctSearchUrl.searchParams.append('results', d.ctIds.join(' OR '));

      return (
        <Link external to={ctSearchUrl.href}>
          Clinical trials
        </Link>
      );
    },
  },
  {
    id: 'drug',
    propertyPath: 'drug.id',
    renderCell: d => (
      <Link to={`/drug/${d.drug.id}`}>{label(d.drug.name)}</Link>
    ),
  },
  {
    id: 'drugType',
    renderCell: d => label(d.drugType),
  },
  {
    id: 'mechanismOfAction',
  },
  {
    id: 'activity',
    renderCell: d => label(d.activity),
  },
];

const Section = ({ data, fetchMore, efoId }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const getWholeDataset = useBatchDownloader(
    sectionQuery,
    { efoId },
    'disease.knownDrugs.rows',
    'disease.knownDrugs.count'
  );

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

  return (
    <Table
      columns={columns}
      dataDownloader
      dataDownloaderRows={getWholeDataset}
      dataDownloaderFileStem={`${efoId}-known_drugs`}
      headerGroups={headerGroups}
      rows={data?.rows || []}
      rowCount={data?.count || 0}
      serverSide={true}
      onTableAction={onTableAction}
      noWrapHeader
    />
  );
};

export default Section;

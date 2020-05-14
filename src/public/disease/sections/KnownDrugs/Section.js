import React, { useEffect, useState } from 'react';
import { Link } from 'ot-ui';

import DataDownloader from 'ot-ui/build/components/DataDownloader';
import Table from '../../../common/Table/Table';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
import { clinicalTrialsSearchUrl } from '../../../configuration';
import { label } from '../../../../utils/global';
import { sectionQuery } from '.';

const headerGroups = [
  {
    colspan: 1,
    label: '',
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
    label: 'Disease',
    export: d => d.disease.id,
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'phase',
    label: 'Phase',
  },
  {
    id: 'status',
    label: 'Status',
    renderCell: d => label(d.status),
  },
  {
    id: 'ctIds',
    label: 'Source',
    export: d => d.ctIds.join(','),
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
    label: 'Drug',
    export: d => d.drug.id,
    renderCell: d => (
      <Link to={`/drug/${d.drug.id}`}>{label(d.drug.name)}</Link>
    ),
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
    <>
      {data && (
        <DataDownloader
          tableHeaders={columns}
          rows={getWholeDataset}
          fileStem={`${efoId}-known_drugs`}
        />
      )}
      <Table
        columns={columns}
        headerGroups={headerGroups}
        rows={data?.rows || []}
        rowCount={data?.count || 0}
        serverSide={true}
        onTableAction={onTableAction}
        noWrapHeader
      />
    </>
  );
};

export default Section;

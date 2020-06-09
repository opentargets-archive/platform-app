import React, { useState } from 'react';

import { Link } from 'ot-ui';

import SourceDrawer from '../../../common/sections/KnownDrugs/custom/SourceDrawer';
import Table from '../../../common/Table/Table';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
import { label } from '../../../../utils/global';
import { sectionQuery } from '.';
import {
  PaginationActionsReduced,
  PaginationActionsComplete,
} from '../../../common/Table/TablePaginationActions';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';

const columnPool = {
  clinicalTrialsColumns: {
    label: 'Clinical trials information',
    columns: [
      {
        id: 'phase',
        filterValue: d =>
          // filter phase with arabic numerals
          `${d.phase} Phase ${
            { 0: 0, I: 1, II: 2, III: 3, IV: 4 }[
              d.phase.split('Phase ')[1] ?? 0
            ]
          }`,
      },
      {
        id: 'status',
        renderCell: d => label(d.status),
      },
      {
        id: 'sources',
        label: 'Source',
        filterValue: false,
        exportValue: d => d.urls.map(reference => reference.url),
        renderCell: d => <SourceDrawer references={d.urls} />,
      },
    ],
  },
  diseaseColumns: {
    label: 'Disease information',
    columns: [
      {
        id: 'disease',
        propertyPath: 'disease.id',
        filterValue: d => d.disease.name,
        renderCell: d => (
          <Link to={`/disease/${d.disease.id}`}>{label(d.disease.name)}</Link>
        ),
      },
    ],
  },
  drugColumns: {
    label: 'Drug information',
    columns: [
      {
        id: 'drug',
        propertyPath: 'drug.id',
        filterValue: d => d.drug.name,
        renderCell: d => (
          <Link to={`/drug/${d.drug.id}`}>{label(d.drug.name)}</Link>
        ),
      },
      {
        id: 'type',
        propertyPath: 'drugType',
        renderCell: d => label(d.drugType),
      },
      {
        id: 'mechanismOfAction',
      },
      {
        id: 'activity',
        renderCell: d => label(d.activity),
      },
    ],
  },
  targetColumns: {
    label: 'Target information',
    columns: [
      {
        id: 'targetSymbol',
        label: 'Symbol',
        propertyPath: 'target.approvedSymbol',
        filterValue: d => d.target.approvedSymbol,
        renderCell: d => (
          <Link to={`/target/${d.target.id}`}>{d.target.approvedSymbol}</Link>
        ),
      },
      {
        id: 'targetName',
        label: 'Name',
        propertyPath: 'target.approvedName',
        filterValue: d => d.target.approvedName,
        renderCell: d => label(d.target.approvedName),
      },
    ],
  },
};

const columnsToShow = [
  columnPool.diseaseColumns,
  columnPool.drugColumns,
  columnPool.targetColumns,
  columnPool.clinicalTrialsColumns,
];

const stickyColumn = 'drug';

const columns = [];

columnsToShow.forEach(columnGroup => {
  columns.push(
    ...columnGroup.columns.map(column =>
      column.id === stickyColumn ? { ...column, sticky: true } : column
    )
  );
});

const headerGroups = [
  ...columnsToShow.map(group => ({
    colspan: group.columns.length,
    label: group.label,
  })),
];

const Section = ({ data, fetchMore, efoId }) => {
  const pageSize = 10;
  // eslint-disable-next-line no-unused-vars
  const [cursor, setCursor] = useState(data.cursor);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [rows, setRows] = useState(data.rows.slice(0, pageSize));

  const getWholeDataset = useBatchDownloader(
    sectionQuery,
    { efoId },
    'disease.knownDrugs.rows',
    'disease.knownDrugs.count'
  );

  const onTableAction = params => {
    if (params.globalFilter !== globalFilter) {
      console.log(
        'params.globalFilter, globalFilter',
        params.globalFilter,
        globalFilter
      );
      setCursor(null);
      setGlobalFilter(params.globalFilter);
    }

    setPageIndex(params.page);
  };

  useUpdateEffect(
    () => {
      console.log('globalfilter changed, clearing rows');
      data.rows = [];
    },
    [globalFilter]
  );

  useUpdateEffect(
    () => {
      async function fetchData() {
        setLoading(true);
        await fetchMore({
          variables: { cursor, freeTextQuery: globalFilter },
          updateQuery: (prev, { fetchMoreResult }) => {
            setCursor(fetchMoreResult.disease.knownDrugs?.cursor || null);

            prev.disease.knownDrugs.rows.push(
              ...(fetchMoreResult.disease.knownDrugs?.rows || [])
            );

            prev.disease.knownDrugs.count =
              fetchMoreResult.disease.knownDrugs?.count || 0;

            return prev;
          },
        });

        setLoading(false);
        setRows(data.rows.slice(startRow, endRow));
      }

      const startRow = pageIndex * pageSize;
      const endRow = startRow + pageSize;

      if (
        (endRow < data.count && endRow > data.rows.length) ||
        cursor === null
      ) {
        fetchData();
      } else {
        setRows(data.rows.slice(startRow, endRow));
      }
    },
    [globalFilter, pageIndex]
  );

  return (
    <Table
      columns={columns}
      dataDownloader
      dataDownloaderRows={getWholeDataset}
      dataDownloaderFileStem={`${efoId}-known_drugs`}
      headerGroups={headerGroups}
      loading={loading}
      rowCount={data?.count || 0}
      rows={rows}
      serverSide={true}
      showGlobalFilter
      onTableAction={onTableAction}
    />
  );
};

export default Section;

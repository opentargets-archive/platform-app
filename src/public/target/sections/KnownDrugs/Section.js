import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { Link } from 'ot-ui';

import SourceDrawer from '../../../common/sections/KnownDrugs/custom/SourceDrawer';
import ServerSideTable from '../../../common/Table/ServerSideTable';
import useCursorBatchDownloader from '../../../../hooks/useCursorBatchDownloader';
import { label } from '../../../../utils/global';
const KNOWN_DRUGS_QUERY = loader('./sectionQuery.gql');

const columnPool = {
  clinicalTrialsColumns: {
    label: 'Clinical trials information',
    columns: [
      {
        id: 'phase',
      },
      {
        id: 'status',
        renderCell: d => label(d.status),
      },
      {
        id: 'sources',
        label: 'Source',
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
        hidden: ['lgDown'],
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
        renderCell: d => (
          <Link to={`/target/${d.target.id}`}>{d.target.approvedSymbol}</Link>
        ),
      },
      {
        id: 'targetName',
        label: 'Name',
        propertyPath: 'target.approvedName',
        hidden: ['lgDown'],
        renderCell: d => label(d.target.approvedName),
      },
    ],
  },
};

const columnsToShow = [
  columnPool.drugColumns,
  columnPool.diseaseColumns,
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

const getPage = (rows, page, pageSize) => {
  return rows.slice(pageSize * page, pageSize * page + pageSize);
};

const Section = ({ ensgId }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState('');

  const { data, loading, fetchMore } = useQuery(KNOWN_DRUGS_QUERY, {
    variables: {
      ensemblId: ensgId,
      size: pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  const getWholeDataset = useCursorBatchDownloader(
    KNOWN_DRUGS_QUERY,
    { ensgId },
    'data.target.knownDrugs'
  );

  const { count, rows = [], cursor } = data?.target?.knownDrugs ?? {};

  const handleTableAction = ({
    page: newPage,
    pageSize,
    globalFilter: newGlobalFilter,
  }) => {
    // only fetchMore when there's a new global filter or there are no more
    // rows in the rows array
    console.log(
      'newPage',
      newPage,
      'pageSize',
      pageSize,
      'globalFilter',
      globalFilter,
      'rows.length',
      rows.length
    );
    if (
      newGlobalFilter !== globalFilter ||
      pageSize * newPage > rows.length - 1
    ) {
      fetchMore({
        variables: {
          size: pageSize,
          // if there is a new filter, reset to first page
          cursor: newGlobalFilter !== globalFilter ? null : cursor,
          freeTextQuery: newGlobalFilter,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const prevRows = prev.target.knownDrugs.rows;
          const newRows = fetchMoreResult?.target?.knownDrugs?.rows;
          setPage(newGlobalFilter !== globalFilter ? 0 : newPage);
          setPageSize(pageSize);
          setGlobalFilter(newGlobalFilter);
          return {
            ...fetchMoreResult,
            target: {
              ...fetchMoreResult.target,
              knownDrugs: {
                ...fetchMoreResult.target.knownDrugs,
                // rows:
                //   newGlobalFilter !== globalFilter
                //     ? prevRows
                //     : [...prevRows, ...newRows],
                rows: [...prevRows, ...newRows],
              },
            },
          };
        },
      });
    } else {
      console.log('no fetch!');
      setPage(newPage);
      // setPageSize(pageSize);
    }
  };

  return (
    <ServerSideTable
      loading={loading}
      showGlobalFilter
      globalFilter={globalFilter}
      dataDownloader
      dataDownloaderRows={getWholeDataset}
      dataDownloaderFileStem={`${ensgId}-known_drugs`}
      headerGroups={headerGroups}
      columns={columns}
      rows={getPage(rows, page, pageSize)}
      rowCount={count}
      page={page}
      pageSize={pageSize}
      onTableAction={handleTableAction}
    />
  );
};

export default Section;

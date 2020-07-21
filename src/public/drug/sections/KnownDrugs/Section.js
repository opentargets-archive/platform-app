import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { loader } from 'graphql.macro';
import { Link } from 'ot-ui';

import client from '../../../client';
import SourceDrawer from '../../../common/sections/KnownDrugs/custom/SourceDrawer';
import Table from '../../../common/Table/Table';
import { getPage } from '../../../common/Table/utils';
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
        hidden: ['mdDown'],
        renderCell: d => label(d.target.approvedName),
      },
    ],
  },
};

const columnsToShow = [
  columnPool.diseaseColumns,
  columnPool.targetColumns,
  columnPool.clinicalTrialsColumns,
];

const stickyColumn = 'disease';

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

const fetchDrugs = (chemblId, cursor, size, freeTextQuery) => {
  return client.query({
    query: KNOWN_DRUGS_QUERY,
    variables: {
      chemblId,
      cursor,
      size,
      freeTextQuery,
    },
  });
};

const Section = ({ chemblId }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(
    () => {
      fetchDrugs(chemblId).then(res => {
        const { cursor, count, rows } = res.data.drug.knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setCount(count);
        setRows(rows);
      });
    },
    [chemblId]
  );

  const getWholeDataset = useCursorBatchDownloader(
    KNOWN_DRUGS_QUERY,
    { chemblId },
    'data.drug.knownDrugs'
  );

  const handlePageChange = newPage => {
    if (
      pageSize * newPage + pageSize > rows.length &&
      (cursor === null || cursor.length !== 0)
    ) {
      setLoading(true);
      fetchDrugs(chemblId, cursor, pageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data.drug.knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setPage(newPage);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = newPageSize => {
    if (newPageSize > rows.length) {
      setLoading(true);
      fetchDrugs(chemblId, cursor, newPageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data.drug.knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setPage(0);
        setPageSize(newPageSize);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  };

  const handleGlobalFilterChange = newGlobalFilter => {
    setLoading(true);
    ReactGA.event({
      category: 'Drug Profile Page',
      action: 'Typed in knownDrugs widget search',
      label: newGlobalFilter,
    });
    fetchDrugs(chemblId, null, pageSize, newGlobalFilter).then(res => {
      const { cursor, count, rows: newRows = [] } =
        res.data.drug.knownDrugs ?? {};
      setLoading(false);
      setPage(0);
      setCursor(cursor);
      setCount(count);
      setGlobalFilter(newGlobalFilter);
      setRows(newRows);
    });
  };

  console.log('rows.length', rows.length);

  return (
    <Table
      loading={loading}
      stickyHeader
      showGlobalFilter
      globalFilter={globalFilter}
      dataDownloader
      dataDownloaderRows={getWholeDataset}
      dataDownloaderFileStem={`${chemblId}-known-drugs`}
      headerGroups={headerGroups}
      columns={columns}
      rows={getPage(rows, page, pageSize)}
      rowCount={count}
      rowsPerPageOptions={[10, 25, 100]}
      page={page}
      pageSize={pageSize}
      onGlobalFilterChange={handleGlobalFilterChange}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default Section;

import React, { useState, useEffect } from 'react';
import { Link } from 'ot-ui';

import client from '../../../client';
import { naLabel } from '../../../constants';
import SourceDrawer from './SourceDrawer';
import { Table, getPage } from '../../../components/Table';
import useCursorBatchDownloader from '../../../hooks/useCursorBatchDownloader';
import SectionItem from '../../../components/Section/SectionItem';

const columnPool = {
  clinicalTrials: {
    label: 'Clinical trials information',
    columns: [
      {
        id: 'phase',
      },
      {
        id: 'status',
        renderCell: d => (d.status ? d.status : naLabel),
      },
      {
        id: 'sources',
        label: 'Source',
        exportValue: d => d.urls.map(reference => reference.url),
        renderCell: d => <SourceDrawer references={d.urls} />,
      },
    ],
  },
  disease: {
    label: 'Disease information',
    columns: [
      {
        id: 'disease',
        propertyPath: 'disease.id',
        renderCell: d => (
          <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
        ),
      },
    ],
  },
  drug: {
    label: 'Drug information',
    columns: [
      {
        id: 'drug',
        propertyPath: 'drug.id',
        renderCell: d => <Link to={`/drug/${d.drug.id}`}>{d.drug.name}</Link>,
      },
      {
        id: 'type',
        propertyPath: 'drugType',
        renderCell: d => d.drugType,
      },
      {
        id: 'mechanismOfAction',
      },
      {
        id: 'activity',
        hidden: ['lgDown'],
        renderCell: d => (d.activity ? d.activity : naLabel),
      },
    ],
  },
  target: {
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
        renderCell: d => d.target.approvedName,
      },
    ],
  },
};

const INIT_PAGE_SIZE = 10;

function Body({
  definition,
  efoId,
  BODY_QUERY,
  Description,
  columnsToShow,
  stickyColumn,
}) {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [];

  columnsToShow.forEach(columnGroupName => {
    columns.push(
      ...columnPool[columnGroupName].columns.map(column =>
        column.id === stickyColumn ? { ...column, sticky: true } : column
      )
    );
  });

  const headerGroups = [
    ...columnsToShow.map(columnGroupName => ({
      colspan: columnPool[columnGroupName].columns.length,
      label: columnPool[columnGroupName].label,
    })),
  ];

  const fetchDrugs = (efoId, cursor, size, freeTextQuery) => {
    return client.query({
      query: BODY_QUERY,
      variables: {
        efoId,
        cursor,
        size: size * 10, // fetch 10 pages ahead of time
        freeTextQuery,
      },
    });
  };

  useEffect(
    () => {
      fetchDrugs(efoId, null, INIT_PAGE_SIZE).then(res => {
        const { cursor, count, rows } = res.data.disease.knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setCount(count);
        setRows(rows);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [efoId]
  );

  const getWholeDataset = useCursorBatchDownloader(
    BODY_QUERY,
    { efoId },
    'data.disease.knownDrugs'
  );

  const handlePageChange = newPage => {
    if (
      pageSize * newPage + pageSize > rows.length &&
      (cursor === null || cursor.length !== 0)
    ) {
      setLoading(true);
      fetchDrugs(efoId, cursor, pageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data.disease.knownDrugs;
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
      fetchDrugs(efoId, cursor, newPageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data.disease.knownDrugs;
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
    fetchDrugs(efoId, null, pageSize, newGlobalFilter).then(res => {
      const { cursor, count, rows: newRows = [] } =
        res.data.disease.knownDrugs ?? {};
      setLoading(false);
      setPage(0);
      setCursor(cursor);
      setCount(count);
      setGlobalFilter(newGlobalFilter);
      setRows(newRows);
    });
  };

  return (
    <SectionItem
      definition={definition}
      request={{ loading, error: false, data: count > 0 }}
      renderDescription={() => <Description label="asdf" />}
      renderBody={() => (
        <Table
          loading={loading}
          stickyHeader
          showGlobalFilter
          globalFilter={globalFilter}
          dataDownloader
          dataDownloaderRows={getWholeDataset}
          dataDownloaderFileStem={`${efoId}-known-drugs`}
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
      )}
    />
  );
}

export default Body;

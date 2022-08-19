import React, { useState } from 'react';

import Table from './Table';
import { getPage } from './utils';
import { globalFilter, getComparator } from './sortingAndFiltering';
import { PaginationActionsComplete } from './TablePaginationActions';

function DataTable({
  noWrap,
  noWrapHeader,
  fixed,
  hover,
  showGlobalFilter,
  dataDownloader,
  dataDownloaderFileStem,
  headerGroups,
  columns,
  sortBy = null,
  order = 'asc',
  pageSize: initialPageSize = 10,
  rows,
  rowsPerPageOptions = [],
  onRowClick,
  rowIsSelectable,
  onPagination = () => {},
  dataDownloaderColumns,
  loading,
  query,
  variables,
  stickyHeader,
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [globalFilterVal, setGlobalFilterVal] = useState('');
  const [sortColumn, setSortColumn] = useState(sortBy);
  const [sortOrder, setSortOrder] = useState(order);
  const showPagination =
    rows.length > [...rowsPerPageOptions, initialPageSize].sort()[0];

  const handleGlobalFilterChange = globalFilter => {
    setGlobalFilterVal(globalFilter);
    setPage(0);
  };

  const handleSortBy = sortBy => {
    setSortColumn(sortBy);
    setSortOrder(
      sortColumn === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const handlePageChange = page => {
    setPage(page);
    onPagination(page, pageSize);
  };

  const handleRowsPerPageChange = pageSize => {
    setPageSize(pageSize);
    setPage(0);
  };

  let processedRows = [...rows];

  if (globalFilterVal) {
    processedRows = processedRows.filter(row =>
      globalFilter(row, columns, globalFilterVal)
    );
  }

  if (sortColumn) {
    processedRows.sort(getComparator(columns, sortOrder, sortColumn));
  }

  return (
    <Table
      noWrap={noWrap}
      noWrapHeader={noWrapHeader}
      fixed={fixed}
      hover={hover}
      showGlobalFilter={showGlobalFilter}
      globalFilter={globalFilterVal}
      dataDownloader={dataDownloader}
      dataDownloaderFileStem={dataDownloaderFileStem}
      dataDownloaderColumns={dataDownloaderColumns}
      headerGroups={headerGroups}
      sortBy={sortColumn}
      order={sortOrder}
      page={page}
      pageSize={pageSize}
      dataDownloaderRows={processedRows}
      columns={columns}
      rows={getPage(processedRows, page, pageSize)}
      rowCount={processedRows.length}
      onGlobalFilterChange={handleGlobalFilterChange}
      onSortBy={handleSortBy}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
      ActionsComponent={PaginationActionsComplete}
      onRowClick={onRowClick}
      rowIsSelectable={rowIsSelectable}
      showPagination={showPagination}
      loading={loading}
      query={query}
      variables={variables}
      stickyHeader={stickyHeader}
    />
  );
}

export default DataTable;

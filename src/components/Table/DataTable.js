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
  order,
  pageSize: initialPageSize = 10,
  rows,
  rowsPerPageOptions = [],
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [globalFilterVal, setGlobalFilterVal] = useState('');
  const [sortColumn, setSortColumn] = useState(sortBy);
  const [sortOrder, setSortOrder] = useState(order);

  const handleGlobalFilterChange = globalFilter => {
    setGlobalFilterVal(globalFilter);
  };

  const handleSortBy = sortBy => {
    setSortColumn(sortBy);
    setSortOrder(
      sortColumn === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const handlePageChange = page => {
    setPage(page);
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
    />
  );
}

export default DataTable;

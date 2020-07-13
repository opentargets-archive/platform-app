import React, { useState } from 'react';
import ServerSideTable from './ServerSideTable';
import { globalFilter, getComparator } from './sortingAndFiltering';
import { getPage } from './utils';

function DataTable({
  showGlobalFilter,
  dataDownloader,
  dataDownloaderFileStem,
  headerGroups,
  columns,
  sortBy = null,
  order,
  rows,
  loading,
  ActionsComponent,
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilterVal, setGlobalFilterVal] = useState('');
  const [sortColumn, setSortColumn] = useState(sortBy);
  const [sortOrder, setSortOrder] = useState(order);

  const handleSortBy = sortBy => {
    setSortColumn(sortBy);
    setSortOrder(
      sortColumn === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const handleTableAction = ({ newPage, newPageSize, newGlobalFilter }) => {
    setPage(newPage);
    setPageSize(newPageSize);
    setGlobalFilterVal(newGlobalFilter);
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
    <ServerSideTable
      showGlobalFilter={showGlobalFilter}
      globalFilter={globalFilterVal}
      dataDownloader={dataDownloader}
      dataDownloaderFileStem={dataDownloaderFileStem}
      sortBy={sortColumn}
      order={sortOrder}
      onSortBy={handleSortBy}
      page={page}
      pageSize={pageSize}
      dataDownloaderRows={rows}
      columns={columns}
      rows={getPage(processedRows, page, pageSize)}
      rowCount={rows.length}
      onTableAction={handleTableAction}
      ActionsComponent={ActionsComponent}
    />
  );
}

export default DataTable;

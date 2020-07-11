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

  const handleTableAction = ({
    newPage,
    newPageSize,
    newGlobalFilter,
    newSortBy,
    newOrder,
  }) => {
    setPage(newPage);
    setPageSize(newPageSize);
    setGlobalFilterVal(newGlobalFilter);
    setSortColumn(newSortBy);
    setSortOrder(newOrder);
  };

  let processedRows = [...rows];

  if (globalFilterVal) {
    processedRows = processedRows.filter(row =>
      globalFilter(row, columns, globalFilterVal)
    );
  }

  if (sortBy) {
    processedRows.sort(getComparator(columns, sortOrder, sortColumn));
  }

  return (
    <ServerSideTable
      showGlobalFilter={showGlobalFilter}
      dataDownloader={dataDownloader}
      dataDownloaderFileStem={dataDownloaderFileStem}
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

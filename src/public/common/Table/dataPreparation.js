import { getComparator, globalFilter } from './sortingAndFiltering';

export function prepareDataClientSide(
  rows,
  columns,
  fixedRows,
  page,
  pageSize,
  order,
  sortBy,
  globalFilterValue
) {
  fixedRows.forEach(fixedRow => {
    fixedRow.isFixedRow = true;
  });

  const filteredRows = globalFilterValue
    ? rows.filter(row => globalFilter(row, columns, globalFilterValue))
    : rows;

  const rowCount = filteredRows.length;
  const pageStart = page * pageSize;
  const pageEnd = Math.min(page * pageSize + pageSize, rowCount);
  const emptyRows = pageSize - (pageEnd - pageStart);

  const sortedRows = filteredRows.sort(getComparator(columns, order, sortBy));
  const slicedRows = sortedRows.slice(pageStart, pageEnd);
  const processedRows = [...fixedRows, ...slicedRows];

  return [processedRows, emptyRows, rowCount];
}

export function prepareDataServerSide(rows, fixedRows, pageSize) {
  fixedRows.forEach(fixedRow => {
    fixedRow.isFixedRow = true;
  });

  const pageStart = 0;
  const pageEnd = rows.length;
  const emptyRows = pageSize - (pageEnd - pageStart);
  const slicedRows = rows.slice(pageStart, pageEnd);
  const processedRows = [...fixedRows, ...slicedRows];

  return [processedRows, emptyRows];
}

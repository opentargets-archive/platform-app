import { getComparator, globalFilter } from './sortingAndFiltering';

export function prepareDataClientSide(
  rows,
  columns,
  globalFilterValue,
  order,
  sortBy
) {
  const filteredRows = globalFilterValue
    ? rows.filter(row => globalFilter(row, columns, globalFilterValue))
    : rows;

  const sortedRows = filteredRows.sort(getComparator(columns, order, sortBy));

  return sortedRows;
}

export function sliceDataClientSide(rows, rowCount, fixedRows, page, pageSize) {
  const pageStart = page * pageSize;
  const pageEnd = Math.min(page * pageSize + pageSize, rowCount);
  const slicedRows = rows.slice(pageStart, pageEnd);

  fixedRows.forEach(fixedRow => {
    fixedRow.isFixedRow = true;
  });

  return [...fixedRows, ...slicedRows];
}

export function prepareDataServerSide(rows, fixedRows) {
  fixedRows.forEach(fixedRow => {
    fixedRow.isFixedRow = true;
  });

  const pageStart = 0;
  const pageEnd = rows.length;
  const slicedRows = rows.slice(pageStart, pageEnd);

  return [...fixedRows, ...slicedRows];
}

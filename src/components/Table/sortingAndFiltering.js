import _ from 'lodash';

import { safeToString } from '../../utils/global';

function ascendingComparator(a, b, sortBy) {
  if (a[sortBy] === undefined || a[sortBy] < b[sortBy]) return -1;
  if (a[sortBy] === undefined || a[sortBy] > b[sortBy]) return 1;
  return 0;
}

export function getComparator(columns, order, sortBy) {
  const column = columns.find(col => col.id === sortBy);
  const columnComparator = column?.comparator
    ? column.comparator
    : ascendingComparator;

  return order === 'asc'
    ? (a, b) => columnComparator(a, b, sortBy)
    : (a, b) => -columnComparator(a, b, sortBy);
}

export function globalFilter(row, columns, value) {
  const contents = columns.reduce((accumulator, column) => {
    if (column.filterValue === false) return accumulator;

    const newValue = column.filterValue
      ? column.filterValue(row)
      : _.get(row, column.propertyPath || column.id, '');

    accumulator.push(newValue);
    return accumulator;
  }, []);

  return contents
    .map(content =>
      safeToString(content)
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    .some(e => e);
}

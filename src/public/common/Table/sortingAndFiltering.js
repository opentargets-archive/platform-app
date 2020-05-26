import { safeToString } from '../../../utils/global';

function ascendingComparator(a, b, sortBy) {
  if (a[sortBy] === undefined || a[sortBy] < b[sortBy]) return -1;
  if (a[sortBy] === undefined || a[sortBy] > b[sortBy]) return 1;
  return 0;
}

export function getComparator(columns, order, sortBy) {
  console.log('order, sortBy', order, sortBy);

  const column = columns.find(col => col.id === sortBy);
  const columnComparator = column?.comparator
    ? column.comparator
    : ascendingComparator;

  return order === 'asc'
    ? (a, b) => columnComparator(a, b, sortBy)
    : (a, b) => -columnComparator(a, b, sortBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function globalFilter(row, columns, value) {
  const contents = columns.map(column =>
    column.filterValue ? column.filterValue(row) : row[column.id]
  );

  return contents
    .map(content =>
      safeToString(content)
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    .some(e => e);
}

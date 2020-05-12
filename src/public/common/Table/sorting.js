export function ascendingComparator(a, b, orderBy) {
  if (a[orderBy] === undefined || a[orderBy] < b[orderBy]) return -1;
  if (a[orderBy] === undefined || a[orderBy] > b[orderBy]) return 1;
  return 0;
}

export function getComparator(columns, order, orderBy) {
  const column = columns.find(col => col.id === orderBy);
  const columnComparator = column ? column.comparator : ascendingComparator;

  return order === 'asc'
    ? (a, b) => columnComparator(a, b, orderBy)
    : (a, b) => -columnComparator(a, b, orderBy);
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

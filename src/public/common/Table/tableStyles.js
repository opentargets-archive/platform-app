import { makeStyles } from '@material-ui/core';

export const tableStyles = makeStyles(theme => ({
  cell: {
    '&:first-child': {
      paddingLeft: '1rem',
    },
    '&:last-child': {
      paddingRight: '1rem',
    },
  },
  cellBody: {
    padding: '.25rem .5rem',
    fontSize: '0.8125rem',
  },
  cellHeader: {
    padding: '1rem .5rem',
  },
  cellGroup: {
    borderLeft: '1px solid #E0E0E0',
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  cellSticky: {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.grey[100],
  },
  rowFixed: {
    backgroundColor: theme.palette.grey[300],
  },
  noData: {
    textAlign: 'center',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  table: {
    tableLayout: 'auto',
    width: '100%',
  },
  tableFixed: {
    tableLayout: 'fixed',
  },
  tablePagination: {
    order: 9,
  },
  tableUpperControl1: {
    marginBottom: '2rem',
    order: 0,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  tableUpperControl2: {
    marginBottom: '2rem',
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  tableWrapper: {
    overflowX: 'auto',
    paddingRight: '.1rem', // fixes horizontal scrollbar
    order: 8,
  },
  tabularNums: {
    fontVariant: 'tabular-nums',
  },
  tooltipIcon: {
    fontSize: '1.5rem',
    paddingLeft: `0.6rem`,
  },
}));

export const globalSearchStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

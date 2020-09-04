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
  container: {
    marginTop: '2rem',
    overflowX: 'auto',
    paddingRight: '.1rem', // fixes horizontal scrollbar
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
  },
  tableFixed: {
    tableLayout: 'fixed',
  },
  filter: {
    order: 0,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  downloader: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  tabularNums: {
    fontVariant: 'tabular-nums',
  },
  tooltipIcon: {
    fontSize: '1.5rem',
    paddingLeft: `0.6rem`,
  },
  progress: {
    position: 'relative',
    top: '6px',
  },
  slantedSpan: {
    position: 'absolute',
    display: 'inline-block',
    transformOrigin: '0 0',
    bottom: 0,
    transform: 'rotate(315deg)',
  },
}));

export const globalSearchStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

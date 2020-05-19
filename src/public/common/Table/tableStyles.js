import { makeStyles } from '@material-ui/core';

export const tableStyles = makeStyles(theme => ({
  tableWrapper: {
    overflowX: 'auto',
    paddingRight: '.1rem', // fixes horizontal scrollbar
  },

  table: {
    tableLayout: 'auto',
    width: '100%',
  },
  fixedTable: {
    tableLayout: 'fixed',
  },
  cell: {
    '&:first-child': {
      paddingLeft: '1rem',
    },
    '&:last-child': {
      paddingRight: '1rem',
    },
  },
  cellSticky: {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.grey[100],
  },

  bodyCell: {
    padding: '.25rem .5rem',
    fontSize: '0.8125rem',
  },
  headerCell: {
    padding: '1rem .5rem',
  },
  groupCell: {
    borderLeft: '1px solid #E0E0E0',
    '&:first-child': {
      borderLeft: 'none',
    },
  },

  noWrap: {
    whiteSpace: 'nowrap',
  },

  tabularNums: {
    fontVariant: 'tabular-nums',
  },

  tooltipIcon: {
    fontSize: '1.5rem',
    paddingLeft: `0.6rem`,
  },
}));

// buttonMargin: {
//   marginRight: '4px',
// },
//   tableRow: {
//     height: '31px',
//   },
//   tableRowFixed: {
//     background: theme.palette.grey[300],
//   },
//   tableRowFilters: {
//     verticalAlign: 'bottom',
//   },
//   tableCell: {
//     padding: '0 12px 0 0',
//     '&:first-child': {
//       paddingLeft: '24px',
//     },
//     '&:last-child': {
//       paddingRight: '24px',
//     },
//   },
//   tableCellHeader: {
//     paddingRight: '12px',
//     paddingLeft: 0,
//     '&:first-child': {
//       paddingLeft: '24px',
//     },
//     '&:last-child': {
//       paddingRight: '24px',
//     },
//   },

//   tableCellHeaderVertical: {
//     textAlign: 'center',
//     verticalAlign: 'bottom',
//   },
//   tableCellVertical: {
//     minWidth: '24px',
//     width: '24px',
//     paddingRight: 0,
//   },
//   tableCellFill: {
//     width: '100%',
//   },
//   verticalHeader: {
//     writingMode: 'vertical-rl',
//     transform: 'rotate(180deg)',
//     whiteSpace: 'nowrap',
//   },
//   downloadHeader: {
//     marginTop: '7px',
//   },
// }));

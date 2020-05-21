import { makeStyles } from '@material-ui/core';

export const tableStyles = makeStyles((theme) => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    tableLayout: 'auto',
    width: '100%',
  },
  cellRoot: {
    fontSize: '0.8125rem',
    padding: '.25rem 1rem .25rem 1rem',
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
}));

export const tableHeaderStyles = makeStyles((theme) => ({
  tooltipIcon: {
    fontSize: '1.5rem',
    paddingLeft: `0.6rem`,
  },
  groupCellRoot: {
    borderLeft: '1px solid #E0E0E0',
    paddingLeft: '5px',
    '&:first-child': {
      borderLeft: 'none',
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
  cellRoot: {
    padding: '1rem',
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
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

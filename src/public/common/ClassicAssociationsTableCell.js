import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  cell: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
});

const ClassicAssociationsTableCell = ({
  classes,
  theme,
  color,
  left,
  right,
  cellWidth,
  cellPadding,
  children,
}) => {
  console.log(
    `calc(${cellWidth} + ${left ? cellPadding : 0} + ${
      right ? cellPadding : 0
    })`
  );
  return (
    <TableCell
      style={{
        /* minWidth: `calc(${cellWidth})`, */
        /* width: `calc(${cellWidth})`, */
        width: `calc(${cellWidth} + ${(left ? 1 : 0) +
          (right ? 1 : 0)} * ${cellPadding})`,
        /* maxWidth: `calc(${cellWidth}) !important`, */
        /* maxWidth: `calc(${cellWidth} + ${left ? cellPadding : 0} + ${
          right ? cellPadding : 0
        })`, */
        paddingLeft: left ? cellPadding : 0,
        paddingRight: right ? cellPadding : 0,
        borderBottom: 'none',
      }}
    >
      <div
        style={{
          background: color,
          /* width: '100%', */
          height: '1em',
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: '1px',
        }}
      >
        {children}
      </div>
    </TableCell>
  );
};

export default withStyles(styles, { withTheme: true })(
  ClassicAssociationsTableCell
);

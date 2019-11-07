import React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  cell: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  cellLeft: {},
});

const ClassicAssociationsTableCell = ({
  classes,
  color,
  left,
  right,
  children,
}) => (
  <TableCell
    className={classNames(classes.cell, {
      [classes.cellLeft]: left,
      [classes.cellRight]: right,
    })}
    style={{ background: color }}
  >
    {children}
  </TableCell>
);

export default withStyles(styles)(ClassicAssociationsTableCell);

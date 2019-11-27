import React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  cell: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
});

const ClassicAssociationsTableCellHead = ({
  classes,
  color,
  left,
  right,
  cellWidth,
  cellPadding,
  children,
}) => (
  <TableCell
    align="right"
    padding="dense"
    className={classNames(classes.cellDiseaseName, classes.cellEllipsis)}
    style={{
      width: `calc(${cellWidth} + ${left ? cellPadding : 0} + ${
        right ? cellPadding : 0
      })`,
      paddingLeft: left ? cellPadding : 0,
      paddingRight: right ? cellPadding : 0,
    }}
  >
    {children}
  </TableCell>
);

export default withStyles(styles)(ClassicAssociationsTableCellHead);

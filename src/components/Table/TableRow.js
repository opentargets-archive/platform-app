import React from 'react';
import classNames from 'classnames';
import { Hidden, TableCell, TableRow as MUITableRow } from '@material-ui/core';
import _ from 'lodash';

import { getHiddenBreakpoints } from './utils';
import { tableStyles } from './tableStyles';

function TableRow({
  columns,
  hover,
  isFixedRow,
  noWrap,
  row,
  style,
  onClick,
  selected,
}) {
  const classes = tableStyles();

  return (
    <MUITableRow
      classes={{ root: isFixedRow ? classes.rowFixed : '' }}
      hover={hover}
      onClick={onClick}
      selected={selected}
    >
      {columns.map((column, index) => (
        <Hidden {...getHiddenBreakpoints(column)} key={index}>
          <TableCell
            align={
              column.align ? column.align : column.numeric ? 'right' : 'left'
            }
            classes={{
              root: classNames(
                classes.cell,
                classes.cellBody,
                column.classes?.cell,
                {
                  [classes.tabularNums]: column.numeric,
                  [classes.cellSticky]: column.sticky,
                  [classes.noWrap]: noWrap,
                }
              ),
            }}
            component={column.sticky ? 'th' : 'td'}
            key={index}
            style={{ ...column.style, ...row.rowStyle, ...style }}
          >
            {column.renderCell
              ? column.renderCell(row)
              : _.get(row, column.propertyPath || column.id, 'N/A')}
          </TableCell>
        </Hidden>
      ))}
    </MUITableRow>
  );
}

export default TableRow;

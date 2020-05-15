import React from 'react';
import {
  Badge,
  makeStyles,
  Hidden,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
  withWidth,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import { tableHeaderStyles } from './tableStyles';
import useDynamicColspan from '../../../hooks/useDynamicColspans';
import { getHiddenBreakpoints } from './utils';

function HeaderCell({
  align,
  colspan,
  isHeaderGroup = false,
  label,
  minWidth = 0,
  noWrapHeader,
  orderable = false,
  orderParams,
  tooltip,
  tooltipStyle = {},
  TooltipIcon = HelpIcon,
  width,
}) {
  const classes = tableHeaderStyles();
  const tooltipClasses = makeStyles(tooltipStyle)();
  const style = {
    minWidth,
    whiteSpace: noWrapHeader ? 'nowrap' : '',
  };

  const labelInnerComponent = tooltip ? (
    <Badge
      badgeContent={
        <Tooltip
          interactive
          placement="top"
          classes={tooltipClasses}
          title={tooltip}
        >
          <TooltipIcon className={classes.tooltipIcon} />
        </Tooltip>
      }
    >
      {label}
    </Badge>
  ) : (
    label
  );

  return (
    <TableCell
      align={align}
      classes={{
        root: isHeaderGroup ? classes.groupCellRoot : classes.cellRoot,
      }}
      colSpan={colspan}
      sortDirection={orderable && orderParams.direction}
      width={`${width}%`}
      style={style}
    >
      {orderable ? (
        <TableSortLabel {...orderParams}>{labelInnerComponent}</TableSortLabel>
      ) : (
        labelInnerComponent
      )}
    </TableCell>
  );
}

function TableHeader({
  columns,
  headerGroups,
  noWrapHeader,
  order,
  orderBy,
  onRequestSort,
  width,
}) {
  const colspans = useDynamicColspan(headerGroups, columns, width);
  const classes = tableHeaderStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerGroups.map((headerCell, cellIndex) => (
          <HeaderCell
            colspan={colspans[cellIndex]}
            isHeaderGroup={true}
            key={cellIndex}
            label={headerCell.label}
            noWrapHeader={noWrapHeader}
            tooltip={headerCell.tooltip}
            tooltipStyle={headerCell.tooltipStyle || {}}
          />
        ))}
      </TableRow>
      <TableRow classes={{ root: classes.rowRoot }}>
        {columns.map(column => (
          <Hidden {...getHiddenBreakpoints(column)} key={`header-${column.id}`}>
            <HeaderCell
              align={
                column.align ? column.align : column.numeric ? 'right' : 'left'
              }
              label={column.label}
              noWrapHeader={noWrapHeader}
              orderable={column.orderable}
              orderParams={
                column.orderable
                  ? {
                      active: orderBy === column.id,
                      direction: orderBy === column.id ? order : 'asc',
                      onClick: createSortHandler(column.id),
                    }
                  : null
              }
              style={column.style}
              tooltip={column.tooltip}
              tooltipStyle={column.tooltipStyle}
              width={column.width}
              minWidth={column.minWidth}
            />
          </Hidden>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withWidth()(TableHeader);

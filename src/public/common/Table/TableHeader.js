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
import classNames from 'classnames';
import HelpIcon from '@material-ui/icons/Help';

import { tableStyles } from './tableStyles';
import useDynamicColspan from '../../../hooks/useDynamicColspans';
import { getHiddenBreakpoints } from './utils';

function HeaderCell({
  align,
  colspan,
  isHeaderGroup = false,
  label,
  labelStyle,
  minWidth,
  noWrapHeader,
  sortable = false,
  sortParams,
  sticky = false,
  tooltip,
  tooltipStyle = {},
  TooltipIcon = HelpIcon,
  width,
}) {
  const classes = tableStyles();
  const tooltipClasses = makeStyles(tooltipStyle)();
  const style = {
    minWidth,
    width,
    ...labelStyle,
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
        root: classNames(
          classes.cell,
          classes.headerCell,
          isHeaderGroup && classes.groupCell,
          sticky && classes.cellSticky,
          noWrapHeader && classes.noWrap
        ),
      }}
      colSpan={colspan}
      sortDirection={sortable && sortParams.direction}
      style={style}
    >
      {sortable ? (
        <TableSortLabel {...sortParams}>{labelInnerComponent}</TableSortLabel>
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
  onRequestSort,
  sortBy,
  width,
}) {
  const colspans = useDynamicColspan(headerGroups, columns, width);
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
            sticky={headerCell.sticky || false}
            tooltip={headerCell.tooltip}
            tooltipStyle={headerCell.tooltipStyle || {}}
          />
        ))}
      </TableRow>
      <TableRow>
        {columns.map(column => (
          <Hidden {...getHiddenBreakpoints(column)} key={`header-${column.id}`}>
            <HeaderCell
              align={
                column.align ? column.align : column.numeric ? 'right' : 'left'
              }
              label={column.label}
              noWrapHeader={noWrapHeader}
              sortable={column.sortable}
              sortParams={
                column.sortable
                  ? {
                      active: sortBy === column.id,
                      direction: sortBy === column.id ? order : 'asc',
                      onClick: createSortHandler(column.id),
                    }
                  : null
              }
              labelStyle={column.labelStyle}
              sticky={column.sticky}
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

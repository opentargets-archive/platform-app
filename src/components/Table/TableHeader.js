import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
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

import { tableStyles } from './tableStyles';
import { getHiddenBreakpoints } from './utils';
import useDynamicColspan from '../../hooks/useDynamicColspans';

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

  const labelInnerComponent = (
    <div className={classes.slantedDiv}>
      <span className={classes.slantedSpan}>
        {tooltip ? (
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
        )}
      </span>
    </div>
  );

  return (
    <TableCell
      align={align}
      classes={{
        root: classNames(classes.cell, classes.cellHeader, {
          [classes.cellGroup]: isHeaderGroup,
          [classes.cellSticky]: sticky,
          [classes.noWrap]: noWrapHeader,
        }),
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
            label={headerCell.label || ''}
            noWrapHeader={noWrapHeader}
            sticky={headerCell.sticky || false}
            tooltip={headerCell.tooltip}
            tooltipStyle={headerCell.tooltipStyle || {}}
          />
        ))}
      </TableRow>
      <TableRow>
        {columns.map((column, index) => (
          <Hidden {...getHiddenBreakpoints(column)} key={index}>
            <HeaderCell
              align={
                column.align ? column.align : column.numeric ? 'right' : 'left'
              }
              label={column.label || _.startCase(column.id)}
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

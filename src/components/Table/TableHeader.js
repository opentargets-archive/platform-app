import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {
  Hidden,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  withWidth,
} from '@material-ui/core';

import { getHiddenBreakpoints } from './utils';
import { tableStyles } from './tableStyles';
import Tooltip from '../Tooltip';
import useDynamicColspan from '../../hooks/useDynamicColspans';

function HeaderCell({
  classes = {},
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
  width,
  stickyHeader,
}) {
  const headerClasses = tableStyles();

  const style = {
    minWidth,
    width,
    ...labelStyle,
  };

  const labelInnerComponent = (
    <span className={classNames(classes.innerLabel, headerClasses.headerSpan)}>
      {tooltip ? (
        <Tooltip style={tooltipStyle} showHelpIcon title={tooltip}>
          <span className={headerClasses.headerLabelWithTooltip}>{label}</span>
        </Tooltip>
      ) : (
        label
      )}
    </span>
  );

  return (
    <TableCell
      align={align}
      classes={{
        root: classNames(
          headerClasses.cell,
          headerClasses.cellHeader,
          classes.headerCell,
          {
            [headerClasses.cellGroup]: isHeaderGroup,
            [headerClasses.cellSticky]: sticky,
            [headerClasses.noWrap]: noWrapHeader,
            [headerClasses.headerCellSticky]: stickyHeader && sticky,
          }
        ),
      }}
      colSpan={colspan}
      sortDirection={sortable && sortParams.direction}
      style={style}
    >
      {sortable ? (
        <TableSortLabel className={classes.sortLabel} {...sortParams}>
          {labelInnerComponent}
        </TableSortLabel>
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
  stickyHeader,
}) {
  const colspans = useDynamicColspan(headerGroups, columns, width);
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {headerGroups.length > 0 ? (
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
      ) : null}
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
              classes={column.classes}
              sticky={column.sticky}
              tooltip={column.tooltip}
              tooltipStyle={column.tooltipStyle}
              width={column.width}
              minWidth={column.minWidth}
              stickyHeader={stickyHeader}
            />
          </Hidden>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withWidth()(TableHeader);

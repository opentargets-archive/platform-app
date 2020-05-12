import React, { useState } from 'react';
import {
  Table as MUITable,
  TablePagination,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Hidden,
} from '@material-ui/core';

import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import { tableStyles } from './tableStyles';
import { getComparator, stableSort } from './sorting';
import { getHiddenBreakpoints } from './utils';

function Table({
  columns,
  rows,
  fixedRows = [],
  headerGroups = [],
  onTableAction = () => {},
  pageSize = 10,
  rowCount,
  serverSide = false,
  noWrapHeader = false,
  ...props
}) {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [order, setOrder] = useState(props.order || 'asc');
  const pageStart = serverSide ? 0 : pageSize;
  const pageEnd = serverSide ? pageSize : page * pageSize + pageSize;
  const emptyRows = pageSize - (pageEnd - pageStart - 1);
  const classes = tableStyles();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    onTableAction({ page: newPage, pageSize: pageSize });
  };

  const handleRequestSort = (_, property) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    setOrderBy(property);
    onTableAction({ sortBy: property, order: order });
  };

  if (fixedRows.length === 0 && rows.length === 0) {
    return (
      <div align="center">
        <Typography variant="subtitle1">(no data)</Typography>
      </div>
    );
  }

  return (
    <>
      <div className={classes.tableWrapper}>
        <MUITable className={classes.table}>
          <TableHeader
            classes={classes}
            columns={columns}
            headerGroups={headerGroups}
            noWrapHeader={noWrapHeader}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* {fixedRows.map(fixedRow =>
              <TableRow
                columns={fixedRow}
              />
            )} */}
            {stableSort(rows, getComparator(columns, order, orderBy))
              .sort(getComparator(columns, orderBy, order))
              .slice(pageStart, pageEnd)
              .map((row, i) => (
                <TableRow key={i} style={{ whiteSpace: 'nowrap' }} hover>
                  {columns.map(column => (
                    <Hidden
                      {...getHiddenBreakpoints(column)}
                      key={`header-${column.id}`}
                    >
                      <TableCell
                        key={`tablecell-${column.id}`}
                        classes={{ root: classes.cellRoot }}
                        align={
                          column.align
                            ? column.align
                            : column.numeric
                            ? 'right'
                            : 'left'
                        }
                        style={{
                          ...column.style,
                          ...row.rowStyle,
                          ...(column.numeric
                            ? {
                                fontVariant: 'tabular-nums',
                              }
                            : {}),
                        }}
                      >
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.id]}
                      </TableCell>
                    </Hidden>
                  ))}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 28 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </MUITable>
      </div>
      <TablePagination
        ActionsComponent={TablePaginationActions}
        component="div"
        count={serverSide ? rowCount : rows.length}
        onChangePage={handleChangePage}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[]}
      />
    </>
  );
}

export default Table;

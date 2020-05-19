import React, { useState } from 'react';
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
  Typography,
} from '@material-ui/core';

import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import TableRow from './TableRow';
import { tableStyles } from './tableStyles';
import { getComparator, stableSort } from './sorting';

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
  const emptyRows = pageSize - rows.length;
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
                <TableRow columns={columns} key={i} row={row} />
              ))}
            {emptyRows > 0 && (
              <MUITableRow style={{ height: `${1.6875 * emptyRows}rem` }}>
                <TableCell colSpan={columns.length} />
              </MUITableRow>
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

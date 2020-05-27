import React, { useEffect, useState } from 'react';
import {
  Grid,
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
} from '@material-ui/core';

import DataDownloader from 'ot-ui/build/components/DataDownloader';
import GlobalFilter from './GlobalFilter';
import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import TableRow from './TableRow';
import {
  prepareDataClientSide,
  prepareDataServerSide,
} from './dataPreparation';
import { tableStyles } from './tableStyles';

function Table({
  columns,
  rows,
  rowCount,
  fixed = false,
  fixedRows = [],
  headerGroups = [],
  onTableAction = () => {},
  pageSize = 10 - fixedRows.length,
  dataDownloader = false,
  dataDownloaderFileStem = 'data',
  dataDownloaderRows = rows,
  hover = false,
  serverSide = false,
  showGlobalFilter = false,
  noWrap = true,
  noWrapHeader = true,
  ...props
}) {
  const [page, setPage] = useState(0);
  const [sortBy, setsortBy] = useState(props.sortBy);
  const [order, setOrder] = useState(props.order || 'asc');
  const [globalFilter, setGlobalFilter] = useState('');

  const [processedRows, emptyRows, effectiveRowCount = rowCount] = serverSide
    ? prepareDataServerSide(rows, fixedRows, pageSize)
    : prepareDataClientSide(
        rows,
        columns,
        fixedRows,
        page,
        pageSize,
        order,
        sortBy,
        globalFilter
      );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (_, property) => {
    if (sortBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    setsortBy(property);
  };

  const handleChangeGlobalFilter = newValue => {
    if (globalFilter !== newValue) {
      setPage(0);
      setGlobalFilter(newValue);
    }
  };

  useEffect(
    () => onTableAction({ page, pageSize, sortBy, order, globalFilter }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize, sortBy, order, globalFilter]
  );

  const classes = tableStyles();

  return (
    <Grid container justify="flex-end" alignContent="center">
      {showGlobalFilter && (
        <Grid item xs={12} md={5} lg={7} className={classes.tableUpperControl1}>
          <GlobalFilter onGlobalFilterChange={handleChangeGlobalFilter} />
        </Grid>
      )}

      {dataDownloader && (
        <Grid item xs={12} md={7} lg={5} className={classes.tableUpperControl2}>
          <DataDownloader
            tableHeaders={columns}
            rows={dataDownloaderRows}
            fileStem={dataDownloaderFileStem}
          />
        </Grid>
      )}

      <Grid item xs={12} className={classes.tableWrapper}>
        <MUITable
          classes={{
            root: `${classes.table} ${fixed ? classes.tableFixed : ''}`,
          }}
        >
          <TableHeader
            classes={classes}
            columns={columns}
            headerGroups={headerGroups}
            noWrapHeader={noWrapHeader}
            order={order}
            sortBy={sortBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {processedRows.map((row, i) => (
              <TableRow
                columns={columns}
                hover={hover}
                isFixedRow={row.isFixedRow}
                key={i}
                row={row}
                noWrap={noWrap}
              />
            ))}
            {noWrap && emptyRows > 0 && (
              <MUITableRow style={{ height: `${1.6875 * emptyRows}rem` }}>
                <TableCell
                  colSpan={columns.length}
                  classes={{ root: `${classes.cellBody} ${classes.noData}` }}
                >
                  {!processedRows.length && 'No data'}
                </TableCell>
              </MUITableRow>
            )}
          </TableBody>
        </MUITable>
      </Grid>

      <Grid item xs={12} className={classes.tablePagination}>
        <TablePagination
          ActionsComponent={TablePaginationActions}
          component="div"
          count={effectiveRowCount}
          onChangePage={handleChangePage}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
        />
      </Grid>
    </Grid>
  );
}

export default Table;

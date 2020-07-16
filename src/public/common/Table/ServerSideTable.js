import React from 'react';
import classNames from 'classnames';
import {
  Box,
  Grid,
  TableContainer,
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
  CircularProgress,
} from '@material-ui/core';

import GlobalFilter from './GlobalFilter';
import DataDownloader from './DataDownloader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { tableStyles } from './tableStyles';

const ServerSideTable = ({
  stickyHeader,
  sortBy,
  order,
  page,
  columns,
  rows,
  rowCount = rows.length,
  fixed = false,
  headerGroups = [],
  loading,
  onGlobalFilterChange = () => {},
  onSortBy = () => {},
  onRowsPerPageChange = () => {},
  onPageChange = () => {},
  pageSize = 10,
  dataDownloader = false,
  dataDownloaderFileStem = 'data',
  dataDownloaderRows,
  hover = false,
  noWrap = true,
  noWrapHeader = true,
  showGlobalFilter,
  globalFilter,
  rowsPerPageOptions = [],
  ActionsComponent,
}) => {
  const emptyRows = pageSize - rows.length;
  const classes = tableStyles();

  const handleGlobalFilterChange = newGlobalFilter => {
    if (newGlobalFilter !== globalFilter) {
      onGlobalFilterChange(newGlobalFilter);
    }
  };

  const handleSort = (_, sortBy) => {
    onSortBy(sortBy);
  };

  const handleChangeRowsPerPage = event => {
    onRowsPerPageChange(event.target.value);
  };
  const handleChangePage = (_, page) => {
    onPageChange(page);
  };

  return (
    <Grid container justify="flex-end" alignContent="center">
      {showGlobalFilter && (
        <Grid item xs={12} md={5} lg={7} className={classes.tableUpperControl1}>
          <GlobalFilter onGlobalFilterChange={handleGlobalFilterChange} />
        </Grid>
      )}
      {dataDownloader && (
        <Grid item xs={12} md={7} lg={5} className={classes.tableUpperControl2}>
          <DataDownloader
            columns={columns}
            rows={dataDownloaderRows}
            fileStem={dataDownloaderFileStem}
          />
        </Grid>
      )}
      <TableContainer
        className={classNames(classes.container, {
          [classes.stickyHeader]: stickyHeader,
        })}
      >
        <MUITable
          classes={{
            root: `${classes.table} ${fixed ? classes.tableFixed : ''}`,
          }}
          stickyHeader={stickyHeader}
        >
          <TableHeader
            classes={classes}
            columns={columns}
            headerGroups={headerGroups}
            noWrapHeader={noWrapHeader}
            order={order}
            sortBy={sortBy}
            onRequestSort={handleSort}
            stickyHeader={stickyHeader}
          />
          <TableBody>
            {rows.map((row, i) => (
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
                  {!rows.length && 'No data'}
                </TableCell>
              </MUITableRow>
            )}
          </TableBody>
        </MUITable>
      </TableContainer>
      <Grid item xs={12} className={classes.tablePagination}>
        <Box className={classes.tablePaginationBox}>
          {loading && <CircularProgress size={24} />}
          <TablePagination
            ActionsComponent={ActionsComponent}
            backIconButtonProps={{ disabled: loading || page === 0 }}
            nextIconButtonProps={{
              disabled: loading || page >= rowCount / pageSize - 1,
            }}
            component="div"
            count={rowCount}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServerSideTable;

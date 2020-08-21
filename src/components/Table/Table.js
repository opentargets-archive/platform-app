import React from 'react';
import {
  Grid,
  TableContainer,
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
  CircularProgress,
} from '@material-ui/core';

import DataDownloader from './DataDownloader';
import GlobalFilter from './GlobalFilter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { tableStyles } from './tableStyles';

const Table = ({
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
    <Grid container direction="column">
      <Grid item container>
        {showGlobalFilter && (
          <Grid className={classes.filter} item xs={12} md={5} lg={7}>
            <GlobalFilter onGlobalFilterChange={handleGlobalFilterChange} />
          </Grid>
        )}
        {dataDownloader && (
          <Grid className={classes.downloader} item xs={12} md={7} lg={5}>
            <DataDownloader
              columns={columns}
              rows={dataDownloaderRows}
              fileStem={dataDownloaderFileStem}
            />
          </Grid>
        )}
      </Grid>
      <TableContainer className={classes.container}>
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
            onRequestSort={handleSort}
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
      <Grid item container justify="flex-end">
        {loading && <CircularProgress className={classes.progress} size={22} />}
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
      </Grid>
    </Grid>
  );
};

export default Table;

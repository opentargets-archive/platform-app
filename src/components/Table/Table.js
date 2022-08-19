import React, { useState } from 'react';
import classNames from 'classnames';
import {
  CircularProgress,
  Grid,
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
  Box,
} from '@material-ui/core';

import DataDownloader from './DataDownloader';
import GlobalFilter from './GlobalFilter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { tableStyles } from './tableStyles';

const Table = ({
  classes = {},
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
  dataDownloaderColumns,
  hover = false,
  noWrap = true,
  noWrapHeader = true,
  showGlobalFilter,
  showPagination = true,
  globalFilter,
  rowsPerPageOptions = [],
  ActionsComponent,
  onRowClick = () => {},
  rowIsSelectable = false,
  query,
  variables,
  stickyHeader,
}) => {
  const emptyRows = pageSize - rows.length;
  const [selectedRow, setSelectedRow] = useState(0);
  const defaultClasses = tableStyles();

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
    // reset the selected;
    // TODO: maybe should be handled in individual implementation
    setSelectedRow(0);
    onPageChange(page);
  };
  const handleClick = (event, row, i) => {
    setSelectedRow(i);
    onRowClick(row, i);
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        {showGlobalFilter && (
          <Grid className={defaultClasses.filter} item xs={12} md={4} lg={4}>
            <GlobalFilter onGlobalFilterChange={handleGlobalFilterChange} />
          </Grid>
        )}
        {dataDownloader && (
          <Grid
            className={defaultClasses.downloader}
            item
            xs={12}
            md={8}
            lg={8}
          >
            <DataDownloader
              columns={dataDownloaderColumns || columns}
              rows={dataDownloaderRows}
              fileStem={dataDownloaderFileStem}
              query={query}
              variables={variables}
            />
          </Grid>
        )}
      </Grid>
      <TableContainer
        className={classNames(defaultClasses.container, classes.root, {
          [defaultClasses.stickyHeader]: stickyHeader,
        })}
      >
        <MuiTable
          className={classNames(defaultClasses.table, classes.table, {
            [defaultClasses.tableFixed]: fixed,
          })}
          stickyHeader={stickyHeader}
        >
          <TableHeader
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
                onClick={event => handleClick(event, row, i)}
                selected={rowIsSelectable && selectedRow === i}
              />
            ))}
            {page > 0 && noWrap && emptyRows > 0 && (
              <MUITableRow style={{ height: `${1.6875 * emptyRows}rem` }}>
                <TableCell
                  colSpan={columns.length}
                  classes={{
                    root: `${defaultClasses.cellBody} ${defaultClasses.noData}`,
                  }}
                >
                  {!rows.length && 'No data'}
                </TableCell>
              </MUITableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Grid item container justify="flex-end">
        {loading && (
          <CircularProgress className={defaultClasses.progress} size={22} />
        )}
        {showPagination ? (
          <TablePagination
            ActionsComponent={ActionsComponent}
            backIconButtonProps={{ disabled: loading || page === 0 }}
            nextIconButtonProps={{
              disabled: loading || page >= rowCount / pageSize - 1,
            }}
            component="div"
            count={rowCount}
            onPageChange={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        ) : (
          <Box className={defaultClasses.paginationPlaceholder} />
        )}
      </Grid>
    </Grid>
  );
};

export default Table;

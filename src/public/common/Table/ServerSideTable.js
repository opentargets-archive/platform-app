import React from 'react';
import {
  Box,
  Grid,
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
  CircularProgress,
} from '@material-ui/core';

import DataDownloader from './DataDownloader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { tableStyles } from './tableStyles';

const ServerSideTable = ({
  page,
  columns,
  rows,
  rowCount = rows.length,
  fixed = false,
  headerGroups = [],
  loading,
  onTableAction = () => {},
  pageSize = 10,
  dataDownloader = false,
  dataDownloaderFileStem = 'data',
  dataDownloaderRows,
  hover = false,
  noWrap = true,
  noWrapHeader = true,
  ActionsComponent,
}) => {
  // console.log('rows.length', rows.length);
  const emptyRows = pageSize - rows.length;
  const classes = tableStyles();

  const handleChangePage = (event, page) => {
    onTableAction({ page, pageSize });
  };

  const handleChangeRowsPerPage = event => {
    onTableAction({ page: 0, pageSize: event.target.value });
  };

  return (
    <Grid container justify="flex-end" alignContent="center">
      {dataDownloader && (
        <Grid item xs={12} md={7} lg={5} className={classes.tableUpperControl2}>
          <DataDownloader
            columns={columns}
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
      </Grid>

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
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServerSideTable;

import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import HelpIcon from '@material-ui/icons/Help';

const PAGE_SIZE = 20;

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
  },
});

class TablePaginationActions extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    const { onChangePage, page } = this.props;
    onChangePage(event, page - 1);
  };

  handleNextButtonClick = event => {
    const { onChangePage, page } = this.props;
    onChangePage(event, page + 1);
  };

  handleLastPageButtonClick = event => {
    const { onChangePage, count, rowsPerPage } = this.props;
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    onChangePage(event, lastPage);
  };

  render() {
    const { count, page, rowsPerPage, classes } = this.props;
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= lastPage}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= lastPage}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions = withStyles(actionsStyles)(TablePaginationActions);

const getComparator = (columns, sortBy, order) => {
  const column = columns.find(col => col.id === sortBy);

  if (column && column.comparator) {
    if (order === 'asc') {
      return column.comparator;
    }
    return (a, b) => -column.comparator(a, b);
  }

  const comparatorValue = order === 'desc' ? 1 : -1;

  return (a, b) => {
    if (a[sortBy] === b[sortBy]) {
      return 0;
    }

    if (a[sortBy] === undefined || a[sortBy] === '' || a[sortBy] < b[sortBy]) {
      return comparatorValue;
    }

    if (b[sortBy] === undefined || b[sortBy] === '' || a[sortBy] > b[sortBy]) {
      return -comparatorValue;
    }
  };
};

const tableStyles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  tooltipIcon: {
    fontSize: '1.2rem',
    paddingLeft: `0.6rem`,
  },
  buttonMargin: {
    marginRight: '4px',
  },
  tableRow: {
    height: '18px',
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
  tableRowFixed: {
    background: theme.palette.grey[300],
  },
  tableRowFilters: {
    verticalAlign: 'bottom',
  },
  tableCell: {
    padding: 0,
    // padding: '0 12px 0 0',
    borderBottom: 'none',
    // '&:first-child': {
    //   paddingLeft: '24px',
    // },
    // '&:last-child': {
    //   paddingRight: '24px',
    // },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  tableCellHeader: {
    padding: 0,
    // borderBottom: 'none',
    // paddingRight: '12px',
    // paddingLeft: 0,
    // '&:first-child': {
    //   paddingLeft: '24px',
    // },
    // '&:last-child': {
    //   paddingRight: '24px',
    // },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  tableCellSpanHeader: {
    padding: 0,
    // paddingLeft: '4px',
    // paddingRight: '4px',
    // borderLeft: `1px solid ${theme.palette.grey[300]}`,
    // textAlign: 'center',
    // paddingLeft: '5px',
    // margin: '0 auto',
    // marginBottom: '8px',
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  tableCellHeaderVertical: {
    textAlign: 'center',
    verticalAlign: 'bottom',
    paddingBottom: '4px',
  },
  tableCellVertical: {
    maxWidth: '24px',
    minWidth: '24px',
    width: '24px',
    paddingRight: 0,

    position: 'relative',
  },
  tableCellEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tableCellFirstInHeaderGroup: {
    // paddingLeft: '4px',
    // paddingLeft: '16px',
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  tableCellLastInHeaderGroup: {
    // paddingRight: '4px',
    // paddingRight: '16px',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
  tableCellFill: {
    width: '100%',
  },
  verticalHeader: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    whiteSpace: 'nowrap',
  },
  downloadHeader: {
    marginTop: '7px',
  },
});

class HeatmapTable extends Component {
  state = {
    page: 0,
    sortBy: this.props.sortBy,
    order: this.props.order,
  };

  handleChangePage = (event, page) => {
    this.setState({
      page,
    });
  };

  selectSortColumn = sortBy => {
    const { reportTableSortEvent } = this.props;
    let order = 'desc';

    if (this.state.sortBy === sortBy && this.state.order === 'desc') {
      order = 'asc';
    }

    if (reportTableSortEvent) {
      reportTableSortEvent(sortBy, order);
    }

    this.setState({ sortBy, order });
  };

  render() {
    const {
      columns,
      data,
      columnsFixed,
      dataFixed,
      verticalHeaders,
      classes,
      filters,
      pageSize,
      headerGroups,
      tableRowComponent,
    } = this.props;
    const { sortBy, order, page } = this.state;
    const filterRow = filters ? (
      <TableRow className={classes.tableRowFilters}>
        {columns.map(column => (
          <TableCell
            key={column.id}
            className={classNames(classes.tableCellHeader, {
              [classes.tableCellHeaderVertical]: column.verticalHeader,
              [classes.tableCellVertical]: column.verticalHeader,
              [classes.tableCellFirstInHeaderGroup]: column.firstInHeaderGroup,
              [classes.tableCellLastInHeaderGroup]: column.lastInHeaderGroup,
            })}
          >
            {column.renderFilter ? column.renderFilter() : null}
          </TableCell>
        ))}
      </TableRow>
    ) : null;
    return (
      <React.Fragment>
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    className={classNames(classes.tableCellHeader, {
                      [classes.tableCellHeaderVertical]: column.verticalHeader,
                      [classes.tableCellVertical]: column.verticalHeader,
                      [classes.tableCellFirstInHeaderGroup]:
                        column.firstInHeaderGroup,
                      [classes.tableCellLastInHeaderGroup]:
                        column.lastInHeaderGroup,
                    })}
                  >
                    {column.renderLabelBackground
                      ? column.renderLabelBackground()
                      : null}
                    <TableSortLabel
                      active={column.id === sortBy}
                      direction={order}
                      onClick={this.selectSortColumn.bind(null, column.id)}
                      className={
                        column.verticalHeader ? classes.verticalHeader : null
                      }
                    >
                      {column.tooltip ? (
                        <Badge
                          badgeContent={
                            <Tooltip
                              title={column.tooltip}
                              placement="top"
                              interactive
                            >
                              <HelpIcon className={classes.tooltipIcon} />
                            </Tooltip>
                          }
                        >
                          {column.label}
                        </Badge>
                      ) : (
                        column.label
                      )}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {verticalHeaders ? (
                  <TableCell className={classes.tableCellFill} />
                ) : null}
              </TableRow>
              {headerGroups ? (
                <TableRow>
                  {headerGroups.map((g, i) => (
                    <TableCell
                      colSpan={g.colspan}
                      key={i}
                      className={classNames(
                        classes.tableCellHeader,
                        classes.tableCellSpanHeader
                      )}
                    >
                      {g.renderCell()}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null}
              {filterRow}
            </TableHead>
            <TableBody>
              {columnsFixed && dataFixed
                ? dataFixed.map((row, index) => (
                    <TableRow
                      key={index}
                      className={classNames(
                        classes.tableRow,
                        classes.tableRowFixed
                      )}
                      component={tableRowComponent}
                      data={row}
                    >
                      {columnsFixed.map(column => (
                        <TableCell
                          key={column.id}
                          className={classNames(classes.tableCell, {
                            [classes.tableCellVertical]: column.verticalHeader,
                          })}
                          align={column.align}
                        >
                          {column.renderCell
                            ? column.renderCell(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                      {verticalHeaders ? (
                        <TableCell className={classes.tableCellFill} />
                      ) : null}
                    </TableRow>
                  ))
                : null}
              {data
                .slice()
                .sort(getComparator(columns, sortBy, order))
                .slice(page * pageSize, page * pageSize + pageSize)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    className={classes.tableRow}
                    component={tableRowComponent}
                    data={row}
                  >
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        style={{ maxWidth: column.ellipsisWidth }}
                        className={classNames(classes.tableCell, {
                          [classes.tableCellVertical]: column.verticalHeader,
                          [classes.tableCellEllipsis]: column.ellipsisWidth,
                          [classes.tableCellFirstInHeaderGroup]:
                            column.firstInHeaderGroup,
                          [classes.tableCellLastInHeaderGroup]:
                            column.lastInHeaderGroup,
                        })}
                        align={column.align}
                      >
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.id]}
                      </TableCell>
                    ))}
                    {verticalHeaders ? (
                      <TableCell className={classes.tableCellFill} />
                    ) : null}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={data.length}
          onChangePage={this.handleChangePage}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
          ActionsComponent={TablePaginationActions}
        />
      </React.Fragment>
    );
  }
}

HeatmapTable.defaultProps = {
  pageSize: PAGE_SIZE,
};

export default withStyles(tableStyles)(HeatmapTable);

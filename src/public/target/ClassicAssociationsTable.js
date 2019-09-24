import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';

// TODO: Harmonise with HeatmapTable for component reuse

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    marginRight: '20px',
    width: 'calc(100% - 40px)',
  },
  cell: {
    borderBottom: 'none',
  },
  cellSwatch: {
    minWidth: '20px',
    width: '100%',
    height: '16px',
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  cellEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  row: {
    height: 0,
  },
  cellHeaderVertical: {
    minWidth: '20px',
    maxWidth: '20px',
    height: '160px',
    verticalAlign: 'bottom',
    textAlign: 'center',
    borderBottom: 'none',
    '& div': {
      height: '1px',
      verticalAlign: 'top',
      marginBottom: '20px',
    },
    '& div span': {
      display: 'block',
      maxWidth: '200px',
      marginLeft: '50%',
      transformOrigin: '0 0',
      transform: 'rotate(-60deg) translateY(-50%)',
      whiteSpace: 'nowrap',
    },
  },
  cellDiseaseName: {
    fontSize: '0.75rem',
    padding: '0 8px',
    minWidth: '200px',
    maxWidth: '400px',
    borderBottom: 'none',
  },
  cellHeaderDiseaseName: {
    verticalAlign: 'bottom',
    paddingBottom: '35px',
  },
});
const ClassicAssociationsTable = ({
  classes,
  theme,
  ensgId,
  symbol,
  rows,
  dataTypes,
  sortBy,
  onSortByChange,
  page,
  rowsPerPage,
  totalCount,
  pageInfo,
  onPaginationChange,
  handleMouseover,
}) => {
  const colorScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range(['#fff', theme.palette.primary.main]);
  const sortByUpdateForField = field => ({
    field: field,
    ascending: sortBy.field === field ? !sortBy.ascending : false,
  });
  const directionForField = field =>
    sortBy.field === field ? (sortBy.ascending ? 'asc' : 'desc') : 'desc';
  const activeForField = field => sortBy.field === field;
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table} padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              align="right"
              className={classNames(
                classes.cellDiseaseName,
                classes.cellHeaderDiseaseName
              )}
            >
              Disease
            </TableCell>
            <TableCell className={classes.cellHeaderVertical}>
              <div>
                <span>Overall</span>
              </div>
              <TableSortLabel
                onClick={() =>
                  onSortByChange(sortByUpdateForField('SCORE_OVERALL'))
                }
                direction={directionForField('SCORE_OVERALL')}
                active={activeForField('SCORE_OVERALL')}
              />
            </TableCell>
            {dataTypes.map(dataType => (
              <TableCell key={dataType} className={classes.cellHeaderVertical}>
                <div>
                  <span>{_.startCase(dataType.toLowerCase())}</span>
                </div>
                <TableSortLabel
                  onClick={() => onSortByChange(sortByUpdateForField(dataType))}
                  direction={directionForField(dataType)}
                  active={activeForField(dataType)}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.disease.id}
              padding="dense"
              className={classes.row}
            >
              <TableCell
                align="right"
                padding="dense"
                className={classNames(
                  classes.cellDiseaseName,
                  classes.cellEllipsis
                )}
              >
                <span
                  id={`disease-cell-${row.disease.id}`}
                  onMouseOver={() => {
                    handleMouseover({
                      id: row.disease.id,
                      name: row.disease.name,
                      score: row.score,
                      target: { ensgId, symbol },
                    });
                  }}
                >
                  {row.disease.name}
                </span>
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  className={classes.cellSwatch}
                  style={
                    row.score ? { background: colorScale(row.score) } : null
                  }
                />
              </TableCell>
              {row.scoresByDataType.map(dataType => (
                <TableCell key={dataType.dataTypeId} className={classes.cell}>
                  <div
                    className={classes.cellSwatch}
                    style={
                      dataType.score
                        ? { background: colorScale(dataType.score) }
                        : null
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        rowsPerPage={rowsPerPage}
        page={page}
        count={totalCount ? totalCount : 0}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={(event, newPage) => {
          const { nextCursor } = pageInfo;
          const forward = newPage > page;
          onPaginationChange(forward, nextCursor);
        }}
      />
    </div>
  );
};

const tooltipElementFinder = ({ id }) =>
  document.querySelector(`#disease-cell-${id}`);

export default withTooltip(
  withStyles(styles, { withTheme: true })(ClassicAssociationsTable),
  TooltipContent,
  tooltipElementFinder
);

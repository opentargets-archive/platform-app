import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  cell: {
    padding: '1px',
  },
  cellSwatch: {
    minWidth: '20px',
    width: '100%',
    height: '20px',
    padding: '1px',
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
    height: '200px',
    verticalAlign: 'bottom',
    textAlign: 'center',
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
});
const ClassicAssociationsTable = ({
  classes,
  theme,
  rows,
  dataTypes,
  sortBy,
  onSortByChange,
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
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Disease</TableCell>
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
                className={classes.cellEllipsis}
              >
                {row.disease.name}
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
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(
  ClassicAssociationsTable
);

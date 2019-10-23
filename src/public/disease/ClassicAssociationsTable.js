import React from 'react';
import * as d3 from 'd3';
import { mix, complement, lighten } from 'polished';
import gql from 'graphql-tag';
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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';
import ClassicAssociationsDownload from '../common/ClassicAssociationsDownload';

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
  legendLabel: {
    marginLeft: 10,
    marginRight: 30,
  },
});

const associationsDownloadQuery = gql`
  query DiseaseAssociationsDownloadQuery(
    $efoId: String!
    $first: Int
    $after: String
    $facets: DiseaseTargetsConnectionFacetsInput
    $sortBy: DiseaseTargetsConnectionSortByInput
    $search: String
  ) {
    disease(efoId: $efoId) {
      id
      targetsConnection(
        first: $first
        after: $after
        facets: $facets
        sortBy: $sortBy
        search: $search
      ) {
        totalCount
        pageInfo {
          nextCursor
          hasNextPage
        }
        edges {
          node {
            id
            symbol
          }
          score
          scoresByDataType {
            dataTypeId
            score
          }
        }
      }
    }
  }
`;

const ClassicAssociationsTable = ({
  classes,
  theme,
  efoId,
  name,
  rows,
  dataTypes,
  modalities,
  sortBy,
  search,
  facets,
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
    .range([
      lighten(0.4, theme.palette.primary.main),
      theme.palette.primary.main,
    ]);
  const tractabilityColor = complement(
    mix(0.3, theme.palette.primary.main, theme.palette.secondary.main)
  );
  const colorScaleModality = d3
    .scalePow()
    .exponent(0.5)
    .range([lighten(0.4, tractabilityColor), tractabilityColor]);
  const legendWidth = 100;
  const legendHeight = 20;
  const tickWidth = legendWidth / 100;
  const ticks = d3
    .range(0, 1, tickWidth / legendWidth)
    .map(d => ({ value: d, x: d * legendWidth, width: tickWidth }));
  const sortByUpdateForField = field => ({
    field: field,
    ascending: sortBy.field === field ? !sortBy.ascending : false,
  });
  const directionForField = field =>
    sortBy.field === field ? (sortBy.ascending ? 'asc' : 'desc') : 'desc';
  const activeForField = field => sortBy.field === field;
  return (
    <div className={classes.tableWrapper}>
      <ClassicAssociationsDownload
        fileStem={`${efoId}-associated-targets`}
        query={associationsDownloadQuery}
        variables={{ efoId, sortBy, search, facets }}
        getAfter={response =>
          response.data &&
          response.data.disease &&
          response.data.disease.targetsConnection &&
          response.data.disease.targetsConnection.pageInfo &&
          response.data.disease.targetsConnection.pageInfo.hasNextPage
            ? response.data.disease.targetsConnection.pageInfo.nextCursor
            : null
        }
        getRows={response =>
          response.data &&
          response.data.disease &&
          response.data.disease.targetsConnection &&
          response.data.disease.targetsConnection.edges
            ? response.data.disease.targetsConnection.edges.map(d => ({
                ensgId: d.node.id,
                symbol: d.node.symbol,
                overallScore: d.score,
                ...d.scoresByDataType.reduce((acc, dt) => {
                  acc[dt.dataTypeId] = dt.score;
                  return acc;
                }, {}),
              }))
            : []
        }
        headers={[
          { id: 'ensgId', label: 'ensgId' },
          { id: 'symbol', label: 'symbol' },
          { id: 'overallScore', label: 'overallScore' },
          ...dataTypes.map(dt => ({ id: dt, label: _.camelCase(dt) })),
        ]}
      />
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
              Target
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
            {modalities.map(modality => (
              <TableCell key={modality} className={classes.cellHeaderVertical}>
                <div>
                  <span>{_.startCase(modality)}</span>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.target.id}
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
                  id={`target-cell-${row.target.id}`}
                  onMouseOver={() => {
                    handleMouseover({
                      id: row.target.id,
                      symbol: row.target.symbol,
                      score: row.score,
                      disease: { efoId, name },
                    });
                  }}
                >
                  {row.target.symbol}
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
              {row.tractabilityScoresByModality.map(modality => (
                <TableCell key={modality.modalityId} className={classes.cell}>
                  <div
                    className={classes.cellSwatch}
                    style={
                      modality.score
                        ? { background: colorScaleModality(modality.score) }
                        : null
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container justify="flex-start">
            <Grid item>
              <svg width={legendWidth} height={legendHeight}>
                <g>
                  {ticks.map((d, i) => (
                    <rect
                      key={i}
                      x={d.x}
                      y={0}
                      width={d.width}
                      height={legendHeight}
                      fill={colorScale(d.value)}
                    />
                  ))}
                  <rect
                    x={0}
                    y={0}
                    width={legendWidth}
                    height={legendHeight}
                    fill="none"
                    strokeWidth={2}
                    stroke={theme.palette.grey[300]}
                  />
                </g>
              </svg>
            </Grid>
            <Grid item className={classes.legendLabel}>
              <Typography inline variant="caption">
                Efficacy
              </Typography>
            </Grid>

            <Grid item>
              <svg width={legendWidth} height={legendHeight}>
                <g>
                  {ticks.map((d, i) => (
                    <rect
                      key={i}
                      x={d.x}
                      y={0}
                      width={d.width}
                      height={legendHeight}
                      fill={colorScaleModality(d.value)}
                    />
                  ))}
                  <rect
                    x={0}
                    y={0}
                    width={legendWidth}
                    height={legendHeight}
                    fill="none"
                    strokeWidth={2}
                    stroke={theme.palette.grey[300]}
                  />
                </g>
              </svg>
            </Grid>
            <Grid item className={classes.legendLabel}>
              <Typography inline variant="caption">
                Tractability
              </Typography>
            </Grid>

            <Grid item>
              <svg width={legendHeight} height={legendHeight}>
                <g>
                  <rect
                    x={0}
                    y={0}
                    width={legendHeight}
                    height={legendHeight}
                    fill="none"
                    strokeWidth={2}
                    stroke={theme.palette.grey[300]}
                  />
                </g>
              </svg>
            </Grid>
            <Grid item className={classes.legendLabel}>
              <Typography inline variant="caption">
                No data
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </div>
  );
};

const tooltipElementFinder = ({ id }) =>
  document.querySelector(`#target-cell-${id}`);

export default withTooltip(
  withStyles(styles, { withTheme: true })(ClassicAssociationsTable),
  TooltipContent,
  tooltipElementFinder
);

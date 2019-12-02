import React from 'react';
import * as d3 from 'd3';
import { mix, complement, lighten } from 'polished';
import gql from 'graphql-tag';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';
import ClassicAssociationsDownload from '../common/ClassicAssociationsDownload';
import ClassicAssociationsLegend from '../common/ClassicAssociationsLegend';
import withScaleAssociation from '../common/withScaleAssociation';
import Heatmap from '../common/heatmap/Heatmap';

// TODO: Harmonise with HeatmapTable for component reuse

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
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
  scaleAssociation,
}) => {
  const tractabilityColor = complement(
    mix(0.3, theme.palette.primary.main, theme.palette.secondary.main)
  );
  const colorScaleModality = d3
    .scalePow()
    .exponent(0.5)
    .range([lighten(0.4, tractabilityColor), tractabilityColor]);
  // const sortByUpdateForField = field => ({
  //   field: field,
  //   ascending: sortBy.field === field ? !sortBy.ascending : false,
  // });
  // const directionForField = field =>
  //   sortBy.field === field ? (sortBy.ascending ? 'asc' : 'desc') : 'desc';
  // const activeForField = field => sortBy.field === field;

  const columnGroups = [
    {
      id: 'overall',
      columns: [
        {
          label: 'Overall',
          valueAccessor: d => (d.score > 0 ? d.score : NaN),
        },
      ],
    },
    {
      id: 'datasources',
      columns: dataTypes.map(dt => ({
        label: dt,
        valueAccessor: d => {
          const score = d.scoresByDataType.find(s => s.dataTypeId === dt).score;
          return score > 0 ? score : NaN;
        },
      })),
    },
  ];
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
      <Heatmap
        labelAccessor={d => d.target.symbol}
        rows={rows}
        columnGroups={columnGroups}
        rowsPerPage={rowsPerPage}
      />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <ClassicAssociationsLegend
            {...{ scaleAssociation, scaleModality: colorScaleModality }}
          />
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

export default withScaleAssociation(
  withTooltip(
    withStyles(styles, { withTheme: true })(ClassicAssociationsTable),
    TooltipContent,
    tooltipElementFinder
  )
);

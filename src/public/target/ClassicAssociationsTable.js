import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';
import ClassicAssociationsDownload from '../common/ClassicAssociationsDownload';
import ClassicAssociationsLegend from '../common/ClassicAssociationsLegend';
import withScaleAssociation from '../common/withScaleAssociation';
import Heatmap from '../common/Heatmap';

const associationsDownloadQuery = gql`
  query TargetAssociationsDownloadQuery(
    $ensgId: String!
    $first: Int
    $after: String
    $facets: TargetDiseasesConnectionFacetsInput
    $sortBy: TargetDiseasesConnectionSortByInput
    $search: String
  ) {
    target(ensgId: $ensgId) {
      id
      diseasesConnection(
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
            name
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
  ensgId,
  symbol,
  rows,
  dataTypes,
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
  const sortByUpdateForField = (field) => ({
    field: field,
    ascending: sortBy.field === field ? !sortBy.ascending : false,
  });
  const directionForField = (field) =>
    sortBy.field === field ? (sortBy.ascending ? 'asc' : 'desc') : 'desc';
  const activeForField = (field) => sortBy.field === field;

  const columnGroups = [
    {
      id: 'overall',
      columns: [
        {
          label: 'Overall',
          valueAccessor: (d) => (d.score > 0 ? d.score : NaN),
          colorAccessor: (d) => scaleAssociation(d.score > 0 ? d.score : NaN),
          isSortable: true,
          isSortActive: activeForField('SCORE_OVERALL'),
          sortDirection: directionForField('SCORE_OVERALL'),
          onSort: () => onSortByChange(sortByUpdateForField('SCORE_OVERALL')),
        },
      ],
    },
    {
      id: 'datasources',
      columns: dataTypes.map((dt) => ({
        label: _.startCase(dt.toLowerCase()),
        valueAccessor: (d) => {
          const score = d.scoresByDataType.find((s) => s.dataTypeId === dt)
            .score;
          return score > 0 ? score : NaN;
        },
        colorAccessor: (d) => {
          const score = d.scoresByDataType.find((s) => s.dataTypeId === dt)
            .score;
          return scaleAssociation(score > 0 ? score : NaN);
        },
        isSortable: true,
        isSortActive: activeForField(dt),
        sortDirection: directionForField(dt),
        onSort: () => onSortByChange(sortByUpdateForField(dt)),
      })),
    },
  ];
  return (
    <React.Fragment>
      <ClassicAssociationsDownload
        fileStem={`${symbol}-associated-diseases`}
        query={associationsDownloadQuery}
        variables={{ ensgId, sortBy, search, facets }}
        getAfter={(response) =>
          response.data &&
          response.data.target &&
          response.data.target.diseasesConnection &&
          response.data.target.diseasesConnection.pageInfo &&
          response.data.target.diseasesConnection.pageInfo.hasNextPage
            ? response.data.target.diseasesConnection.pageInfo.nextCursor
            : null
        }
        getRows={(response) =>
          response.data &&
          response.data.target &&
          response.data.target.diseasesConnection &&
          response.data.target.diseasesConnection.edges
            ? response.data.target.diseasesConnection.edges.map((d) => ({
                efoId: d.node.id,
                efoName: d.node.name,
                overallScore: d.score,
                ...d.scoresByDataType.reduce((acc, dt) => {
                  acc[dt.dataTypeId] = dt.score;
                  return acc;
                }, {}),
              }))
            : []
        }
        headers={[
          { id: 'efoId', label: 'efoId' },
          { id: 'efoName', label: 'diseaseName' },
          { id: 'overallScore', label: 'overallScore' },
          ...dataTypes.map((dt) => ({ id: dt, label: _.camelCase(dt) })),
        ]}
      />
      <Heatmap
        rowIdAccessor={(d) => d.disease.id}
        labelAccessor={(d) => d.disease.name}
        rows={rows}
        columnGroups={columnGroups}
        rowsPerPage={rowsPerPage}
        onLabelMouseover={handleMouseover}
      />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <ClassicAssociationsLegend {...{ scaleAssociation }} />
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
    </React.Fragment>
  );
};

const tooltipElementFinder = ({ id }) =>
  document.querySelector(`#heatmap-label-${id}`);

export default withScaleAssociation(
  withTooltip(ClassicAssociationsTable, TooltipContent, tooltipElementFinder)
);

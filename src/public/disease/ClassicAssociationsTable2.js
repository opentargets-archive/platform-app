import React from 'react';
import _ from 'lodash';
// import classNames from 'classnames';
// import withStyles from '@material-ui/core/styles/withStyles';
import MuiTable from '@material-ui/core/Table';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
// import MuiTableSortLabel from '@material-ui/core/TableSortLabel';
// import MuiTablePagination from '@material-ui/core/TablePagination';
// import Grid from '@material-ui/core/Grid';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';
// import ClassicAssociationsDownload from '../common/ClassicAssociationsDownload';
// import ClassicAssociationsLegend from '../common/ClassicAssociationsLegend';
import withScaleAssociation from '../common/withScaleAssociation';

// const associationsDownloadQuery = gql`
//   query DiseaseAssociationsDownloadQuery(
//     $efoId: String!
//     $first: Int
//     $after: String
//     $facets: DiseaseTargetsConnectionFacetsInput
//     $sortBy: DiseaseTargetsConnectionSortByInput
//     $search: String
//   ) {
//     disease(efoId: $efoId) {
//       id
//       targetsConnection(
//         first: $first
//         after: $after
//         facets: $facets
//         sortBy: $sortBy
//         search: $search
//       ) {
//         totalCount
//         pageInfo {
//           nextCursor
//           hasNextPage
//         }
//         edges {
//           node {
//             id
//             symbol
//           }
//           score
//           scoresByDataType {
//             dataTypeId
//             score
//           }
//         }
//       }
//     }
//   }
// `;

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
  // const tractabilityColor = complement(
  //   mix(0.3, theme.palette.primary.main, theme.palette.secondary.main)
  // );
  // const colorScaleModality = d3
  //   .scalePow()
  //   .exponent(0.5)
  //   .range([lighten(0.4, tractabilityColor), tractabilityColor]);
  // const sortByUpdateForField = field => ({
  //   field: field,
  //   ascending: sortBy.field === field ? !sortBy.ascending : false,
  // });
  // const directionForField = field =>
  //   sortBy.field === field ? (sortBy.ascending ? 'asc' : 'desc') : 'desc';
  // const activeForField = field => sortBy.field === field;

  return (
    <MuiTable padding="dense">
      <MuiTableHead>
        <MuiTableRow>
          <MuiTableCell align="right">Target</MuiTableCell>
          <MuiTableCell>
            Overall
            {/* <TableSortLabel
                onClick={() =>
                  onSortByChange(sortByUpdateForField('SCORE_OVERALL'))
                }
                direction={directionForField('SCORE_OVERALL')}
                active={activeForField('SCORE_OVERALL')}
              /> */}
          </MuiTableCell>
          {dataTypes.map((dataType, i) => (
            <MuiTableCell key={dataType}>
              {_.startCase(dataType.toLowerCase())}
              {/* <TableSortLabel
                  onClick={() => onSortByChange(sortByUpdateForField(dataType))}
                  direction={directionForField(dataType)}
                  active={activeForField(dataType)}
                /> */}
            </MuiTableCell>
          ))}
          {modalities.map((modality, i) => (
            <MuiTableCell key={modality}>{_.startCase(modality)}</MuiTableCell>
          ))}
        </MuiTableRow>
      </MuiTableHead>
      <MuiTableBody>
        {rows.map(row => (
          <MuiTableRow key={row.target.id}>
            <MuiTableCell align="right">
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
            </MuiTableCell>

            <MuiTableCell>{row.score > 0 ? row.score : NaN}</MuiTableCell>
            {row.scoresByDataType.map((dataType, i) => (
              <MuiTableCell key={dataType.dataTypeId}>
                {dataType.score > 0 ? dataType.score : NaN}
              </MuiTableCell>
            ))}
            {row.tractabilityScoresByModality.map((modality, i) => (
              <MuiTableCell key={modality.dataTypeId}>
                {modality.score > 0 ? modality.score : NaN}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        ))}
      </MuiTableBody>
    </MuiTable>
  );
};

const tooltipElementFinder = ({ id }) =>
  document.querySelector(`#target-cell-${id}`);

export default withScaleAssociation(
  withTooltip(ClassicAssociationsTable, TooltipContent, tooltipElementFinder)
);

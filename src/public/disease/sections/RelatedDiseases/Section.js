import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as d3 from 'd3';
import { loader } from 'graphql.macro';
import { Query } from 'react-apollo';

import { OtTableRF, Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';
import ExpandableTableRow from '../../../common/ExpandableTableRow';

const expansionQuery = loader('./expansionQuery.gql');

const columns = (name, maxTargetCountAOrB) => [
  {
    id: 'B.name',
    label: 'Related disease',
    renderCell: d => (
      <Link component={RouterLink} to={`/disease/${d.B.id}`}>
        {d.B.name}
      </Link>
    ),
    comparator: (a, b) => {
      if (a.B.name <= b.B.name) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'score',
    label: 'Similarity score',
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'targetCountANotB',
    label: `Targets associated with ${name} but not the related disease`,
  },
  {
    id: 'targetCountAAndB',
    label: 'Shared target associations',
  },
  {
    id: 'targetCountBNotA',
    label: `Targets associated with the related disease but not ${name}`,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`Targets associated with ${name} but not the related disease`}
        b={`Targets associated with the related disease but not ${name}`}
        aAndB="Shared target associations"
      />
    ),
    renderCell: d => (
      <LinearVenn
        aOnly={d.targetCountANotB}
        bOnly={d.targetCountBNotA}
        aAndB={d.targetCountAAndB}
        max={maxTargetCountAOrB}
      />
    ),
  },
];

const expansionColumns = (A, B) => [
  {
    id: 'target.symbol',
    label: 'Target',
    renderCell: d => (
      <Link component={RouterLink} to={`/target/${d.target.id}`}>
        {d.target.symbol}
      </Link>
    ),
    comparator: (a, b) => {
      if (a.target.symbol <= b.target.symbol) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'associationScoreA',
    label: (
      <React.Fragment>
        Association score with <br />
        <strong>{A.name}</strong>
      </React.Fragment>
    ),
    renderCell: d => significantFigures(d.associationScoreA),
  },
  {
    id: 'associationScoreB',
    label: (
      <React.Fragment>
        Association score with <br />
        <strong>{B.name}</strong>
      </React.Fragment>
    ),
    renderCell: d => significantFigures(d.associationScoreB),
  },
];

const ExpandedComponent = ({ data }) => (
  <Query
    query={expansionQuery}
    variables={{ pageEfoId: data.A.id, otherEfoId: data.B.id }}
  >
    {({ loading, error, data: data2 }) => {
      if (loading || error) {
        return null;
      }
      const expansionRows = data2.disease.details.relatedDiseases.expanded.map(
        d => ({
          ...d,
          associationScoreProduct: d.associationScoreA * d.associationScoreB,
        })
      );
      return (
        <OtTableRF
          loading={false}
          error={false}
          columns={expansionColumns(data.A, data.B)}
          data={expansionRows}
          sortBy="associationScoreProduct"
          order="desc"
        />
      );
    }}
  </Query>
);

const TableRowComponent = props => (
  <ExpandableTableRow {...props} ExpandedComponent={ExpandedComponent} />
);

const Section = ({ name, data }) => {
  const { rows } = data;
  const maxTargetCountAOrB = d3.max(rows, d => d.targetCountAOrB);
  const rowsMapped = rows.map(d => ({
    ...d,
    targetCountANotB: d.targetCountA - d.targetCountAAndB,
    targetCountBNotA: d.targetCountB - d.targetCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(name, maxTargetCountAOrB)}
      data={rowsMapped}
      sortBy="score"
      order="desc"
      tableRowComponent={TableRowComponent}
    />
  );
};

export default Section;

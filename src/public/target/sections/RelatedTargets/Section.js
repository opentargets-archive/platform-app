import React from 'react';
import * as d3 from 'd3';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';

import { OtTableRF, Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';
import ExpandableTableRow from '../../../common/ExpandableTableRow';

const EXPANSION_QUERY = loader('./expansionQuery.gql');

const columns = (symbol, maxDiseaseCountAOrB) => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => <Link to={`/target/${d.B.id}`}>{d.B.symbol}</Link>,
    comparator: (a, b) => {
      if (a.B.symbol <= b.B.symbol) {
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
    id: 'diseaseCountANotB',
    label: `Diseases associated with ${symbol} but not the related target`,
  },
  {
    id: 'diseaseCountAAndB',
    label: 'Shared disease associations',
  },
  {
    id: 'diseaseCountBNotA',
    label: `Diseases associated with the related target but not ${symbol}`,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`Diseases associated with ${symbol} but not the related target`}
        b={`Diseases associated with the related target but not ${symbol}`}
        aAndB="Shared disease associations"
      />
    ),
    renderCell: d => (
      <LinearVenn
        aOnly={d.diseaseCountANotB}
        bOnly={d.diseaseCountBNotA}
        aAndB={d.diseaseCountAAndB}
        max={maxDiseaseCountAOrB}
      />
    ),
  },
];

const expansionColumns = (A, B) => [
  {
    id: 'disease.name',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
    comparator: (a, b) => {
      if (a.disease.name <= b.disease.name) {
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
        <strong>{A.symbol}</strong>
      </React.Fragment>
    ),
    renderCell: d => significantFigures(d.associationScoreA),
  },
  {
    id: 'associationScoreB',
    label: (
      <React.Fragment>
        Association score with <br />
        <strong>{B.symbol}</strong>
      </React.Fragment>
    ),
    renderCell: d => significantFigures(d.associationScoreB),
  },
];

const ExpandedComponent = ({ data }) => {
  const { loading, error, data: data2 } = useQuery(EXPANSION_QUERY, {
    variables: { pageEnsgId: data.A.id, otherEnsgId: data.B.id },
  });

  if (loading || error) return null;

  const expansionRows = data2.target.details.relatedTargets.expanded.map(d => ({
    ...d,
    associationScoreProduct: d.associationScoreA * d.associationScoreB,
  }));

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
};

const TableRowComponent = props => (
  <ExpandableTableRow {...props} ExpandedComponent={ExpandedComponent} />
);

const Section = ({ ensgId, symbol, data }) => {
  const { rows } = data;
  const maxDiseaseCountAOrB = d3.max(rows, d => d.diseaseCountAOrB);
  const rowsMapped = rows.map(d => ({
    ...d,
    diseaseCountANotB: d.diseaseCountA - d.diseaseCountAAndB,
    diseaseCountBNotA: d.diseaseCountB - d.diseaseCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(symbol, maxDiseaseCountAOrB)}
      data={rowsMapped}
      sortBy="score"
      order="desc"
      tableRowComponent={TableRowComponent}
    />
  );
};

export default Section;

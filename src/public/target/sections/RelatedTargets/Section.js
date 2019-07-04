import React from 'react';
import * as d3 from 'd3';

import { OtTableRF, Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

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
    />
  );
};

export default Section;

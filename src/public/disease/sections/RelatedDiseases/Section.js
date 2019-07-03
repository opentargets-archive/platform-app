import React from 'react';
import * as d3 from 'd3';

import { OtTableRF, Link } from 'ot-ui';

import LinearVenn from '../../../common/LinearVenn';

const columns = (name, maxTargetCountAOrB) => [
  {
    id: 'B.name',
    label: 'Related disease',
    renderCell: d => <Link to={`../${d.B.id}`}>{d.B.name}</Link>,
    comparator: (a, b) => {
      if (a.B.name <= b.B.name) {
        return -1;
      }
      return 1;
    },
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
    label: 'Venn diagram',
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

const Section = ({ efoId, name, data }) => {
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
    />
  );
};

export default Section;

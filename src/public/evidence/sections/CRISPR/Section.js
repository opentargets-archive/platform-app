import React from 'react';

import { Link, OtTableRF, significantFigures } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: (d) => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: (d) => significantFigures(d.score),
  },
  {
    id: 'method',
    label: 'Method',
  },
  {
    id: 'pmId',
    label: 'Publication',
    renderCell: (d) => (
      <Link external to={`http://europepmc.org/abstract/MED/${d.pmId}`}>
        {d.pmId}
      </Link>
    ),
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

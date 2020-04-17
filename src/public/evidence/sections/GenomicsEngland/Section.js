import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: (d) => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'panelUrl',
    label: 'Panel',
    renderCell: (d) => (
      <Link external to={d.panel.url}>
        Panel {d.panel.id}
      </Link>
    ),
  },
  {
    id: 'pmId',
    label: 'Publication',
    renderCell: (d) =>
      d.pmId ? (
        <Link external to={`http://europepmc.org/abstract/MED/${d.pmId}`}>
          {d.pmId}
        </Link>
      ) : null,
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

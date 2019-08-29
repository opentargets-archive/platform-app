import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link component={RouterLink} to={`/disease/${d.disease.id}`}>
        {d.disease.name}
      </Link>
    ),
  },
  {
    id: 'geneSet',
    label: 'Gene Set',
  },
  {
    id: 'method',
    label: 'Method',
  },
  {
    id: 'pmId',
    label: 'Publication',
    renderCell: d => (
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

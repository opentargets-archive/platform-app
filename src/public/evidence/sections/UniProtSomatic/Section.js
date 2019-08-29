import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, OtTableRF } from 'ot-ui';

import MultiplePmIdsLink from '../../../common/MultiplePmIdsLink';

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
    id: 'vepConsequence',
    label: 'Variant Type',
  },
  {
    id: 'source.name',
    label: 'Source',
    renderCell: d => (
      <Link external to={d.source.url}>
        {d.source.name}
      </Link>
    ),
  },
  {
    id: 'pmIds',
    label: 'Publications',
    renderCell: d => <MultiplePmIdsLink pmIds={d.pmIds} />,
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

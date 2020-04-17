import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

import MultiplePmIdsLink from '../../../common/MultiplePmIdsLink';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: (d) => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'rsId',
    label: 'Variant',
    renderCell: (d) => (
      <Link
        external
        to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${d.rsId}`}
      >
        {d.rsId}
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
    renderCell: (d) => (
      <Link external to={d.source.url}>
        {d.source.name}
      </Link>
    ),
  },
  {
    id: 'pmIds',
    label: 'Publications',
    renderCell: (d) => <MultiplePmIdsLink pmIds={d.pmIds} />,
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

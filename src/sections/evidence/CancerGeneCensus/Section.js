import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

import MultiplePmIdsLink from '../../../components/MultiplePmIdsLink';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'mutationType',
    label: 'Mutation Type',
  },
  {
    id: 'samplesWithMutationTypeCount',
    label: 'Samples',
    renderCell: d =>
      `${d.samplesWithMutationTypeCount}/${d.mutatedSamplesCount}`,
  },
  {
    id: 'inheritancePattern',
    label: 'Inheritance Pattern',
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

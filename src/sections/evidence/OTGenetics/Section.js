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
    id: 'reportedTrait.name',
    label: 'Reported trait name',
    renderCell: d => (
      <Link external to={d.reportedTrait.url}>
        {d.reportedTrait.name}
      </Link>
    ),
  },
  {
    id: 'publications.pmId',
    label: 'Publications',
    renderCell: d =>
      d.publications[0] && d.publications[0].authors[0] ? (
        <Link external to={d.publications[0].url}>
          {d.publications[0].authors[0]} ({d.publications[0].year})
        </Link>
      ) : d.publications[0] && d.publications[0].pmId ? (
        // this is possibly redundant as all info comes from ot genetics
        <MultiplePmIdsLink pmIds={d.publications.map(p => p.pmId)} />
      ) : (
        'N/A'
      ),
  },
  {
    id: 'variant.id',
    label: 'Variant',
    renderCell: d => (
      <Link external to={d.variant.url}>
        {d.variant.id}
      </Link>
    ),
  },
  {
    id: 'pval',
    label: 'Association p-value',
    renderCell: d =>
      d.pval.mantissa && d.pval.exponent
        ? `${d.pval.mantissa}e${d.pval.exponent}`
        : d.pval.value,
  },
  {
    id: 'genePrioritisationScore',
    label: 'Gene prioritisation score',
  },
];

const Section = ({ ensgId, efoId, data }) => {
  console.log('data: ', data);
  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns}
      data={data.rows}
    />
  );
};

export default Section;

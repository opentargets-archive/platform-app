import React from 'react';

import { Link, OtTableRF, significantFigures } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'comparison',
    label: 'Comparison',
  },
  {
    id: 'activity',
    label: 'Activity',
    renderCell: d => (
      <Link external to={d.activity.url}>
        {d.activity.name}
      </Link>
    ),
  },
  {
    id: 'tissue.id',
    label: 'Tissue/cell',
    renderCell: d => d.tissue.name,
  },
  {
    id: 'evidenceSource',
    label: 'Evidence source',
  },
  {
    id: 'log2FoldChange',
    label: 'log2 fold change',
    renderCell: d => significantFigures(d.log2FoldChange),
  },
  {
    id: 'pval',
    label: 'P-value',
    renderCell: d => significantFigures(d.pval),
  },
  {
    id: 'percentileRank',
    label: 'Percentile rank',
  },
  {
    id: 'experiment.url',
    label: 'Experiment overview and data',
    renderCell: d => (
      <Link external to={d.experiment.url}>
        {d.experiment.name}
      </Link>
    ),
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

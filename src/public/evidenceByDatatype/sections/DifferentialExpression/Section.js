import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF, significantFigures } from 'ot-ui';

import MultiplePmIdsLink from '../../../common/MultiplePmIdsLink';

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
      <React.Fragment>
        {d.experiment.name}
        <br />
        <Link external to={d.experiment.url}>
          View
        </Link>
      </React.Fragment>
    ),
  },
  {
    id: 'pmIds',
    label: 'Publications',
    renderCell: d => <MultiplePmIdsLink pmIds={d.pmIds} />,
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
    <Typography>
      Evidence from <strong>Expression Atlas</strong>.
    </Typography>
    <OtTableRF
      loading={false}
      error={false}
      columns={columns}
      data={data.rows}
    />
  </React.Fragment>
);

export default Section;

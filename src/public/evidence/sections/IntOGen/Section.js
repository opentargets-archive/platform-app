import React from 'react';
import _ from 'lodash';
import { Link, OtTableRF } from 'ot-ui';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'activity',
    label: 'Mutation type',
    renderCell: d => _.lowerCase(d.activity).replace(/_/g, ' '),
  },
  {
    id: 'samples',
    label: 'Mutated samples / Total samples',
    renderCell: d => `${d.mutationMetrics.value} / ${d.mutationMetrics.total}`,
  },
  {
    id: 'pval',
    label: 'P-value',
  },
  {
    id: 'analysisMethods',
    label: 'Methods',
    tooltip:
      'The current version of the intOGen pipeline uses seven methods to identify cancer driver genes from somatic point mutations - HotMAPS, dNDScv, smRegions, CBaSE, FML, MutPanning, and CLUSTL. The pipeline also uses a combination of methods. For further information on the methods, please click here visit the intOGen FAQ.',
    renderCell: d => (
      <>
        {d.analysisMethods.map(am => (
          <Chip
            color="primary"
            label={am}
            style={{ margin: '3px 5px 3px 0' }}
          ></Chip>
        ))}
      </>
    ),
  },
  {
    id: 'cohort',
    label: 'Cohort information',
    renderCell: d => (
      <>
        <Link to={d.source.url} external>
          {d.cohort.name}
        </Link>
        <br />
        {d.cohort.description}
      </>
    ),
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default withStyles(styles)(Section);

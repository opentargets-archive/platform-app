import React from 'react';
import _ from 'lodash';
import { Link, OtTableRF, significantFigures } from 'ot-ui';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import Methods from './custom/Methods';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: (d) => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'activity',
    label: 'Mutation type',
    renderCell: (d) => _.lowerCase(d.activity).replace(/_/g, ' '),
  },
  {
    id: 'samples',
    label: 'Mutated samples / Total samples',
    renderCell: (d) =>
      `${d.mutationMetrics.value} / ${d.mutationMetrics.total}`,
  },
  {
    id: 'pval',
    label: 'P-value',
    renderCell: (d) => significantFigures(d.pval),
  },
  {
    id: 'analysisMethods',
    label: 'Methods',
    tooltip: (
      <>
        The current version of the intOGen pipeline uses seven methods to
        identify cancer driver genes from somatic point mutations - HotMAPS,
        dNDScv, smRegions, CBaSE, FML, MutPanning, and CLUSTL. The pipeline also
        uses a combination of methods. For further information on the methods,
        please{' '}
        <Link to={Methods.columnTooltip.url} external>
          click here
        </Link>{' '}
        visit the intOGen FAQ.
      </>
    ),
    renderCell: (d) => (
      <>
        {d.analysisMethods.map((am) => (
          <Tooltip
            title={(Methods[am] || {}).description}
            placement="top"
            interactive
          >
            <Chip
              color="primary"
              label={am}
              style={{ margin: '3px 5px 3px 0' }}
            ></Chip>
          </Tooltip>
        ))}
      </>
    ),
  },
  {
    id: 'cohort',
    label: 'Cohort information',
    renderCell: (d) => (
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

export default Section;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of Action',
  },
  {
    id: 'targetName',
    label: 'Target Name',
  },
  {
    id: 'targets',
    label: 'Targets',
    renderCell: d =>
      d.targets.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <Link component={RouterLink} to={`/target/${t.id}`}>
            {t.symbol}
          </Link>
        </React.Fragment>
      )),
  },
  {
    id: 'references',
    label: 'References',
    renderCell: d =>
      d.references.map((r, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <Link external to={r.url}>
            {r.name}
          </Link>
        </React.Fragment>
      )),
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

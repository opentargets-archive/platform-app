import React, { Fragment } from 'react';

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
      d.targets.map((target, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : null}
          <Link to={`/target/${target.id}`}>{target.approvedSymbol}</Link>
        </Fragment>
      )),
  },
  {
    id: 'references',
    label: 'References',
    renderCell: d =>
      d.references.map((r, i) => {
        return (
          <Fragment key={i}>
            {i > 0 ? ', ' : null}
            {r.urls ? (
              <Link external to={r.urls[0]}>
                {r.source}
              </Link>
            ) : (
              r.source
            )}
          </Fragment>
        );
      }),
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

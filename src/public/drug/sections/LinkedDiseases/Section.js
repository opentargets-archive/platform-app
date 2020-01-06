import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'name',
    label: 'Name',
    renderCell: d => <Link to={`/disease/${d.id}`}>{d.name}</Link>,
    width: '20%',
  },
  {
    id: 'therapeuticAreas',
    label: 'Therapeutic Areas',
    renderCell: d =>
      d.therapeuticAreas.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <br /> : null}
          <Link to={`/disease/${t.id}`}>{t.name}</Link>
        </React.Fragment>
      )),
  },
  {
    id: 'maxPhase',
    label: 'Max phase',
    width: '15%',
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;

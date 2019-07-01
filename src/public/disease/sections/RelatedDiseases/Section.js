import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { OtTableRF, Link } from 'ot-ui';

import Intersection from '../../../common/Intersection';

const styles = () => ({
  container: {
    width: '204px',
    margin: '8px 0',
  },
});

let SharedTargets = ({ d, classes }) => {
  return (
    <div className={classes.container}>
      <Intersection
        id={d.B.name}
        a={d.targetCountANotB}
        ab={d.targetCountAAndB}
        b={d.targetCountBNotA}
      />
    </div>
  );
};

SharedTargets = withStyles(styles)(SharedTargets);

const columns = name => [
  {
    id: 'B.name',
    label: 'Related disease',
    renderCell: d => <Link to={`../${d.B.id}`}>{d.B.name}</Link>,
    comparator: (a, b) => {
      if (a.B.name <= b.B.name) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'targetCountAAndB',
    label: 'Number of shared target associations',
    renderCell: d => <SharedTargets d={d} />,
  },
  {
    id: 'targetCountANotB',
    label: `Targets associated with the related disease but not ${name}`,
  },
  {
    id: 'targetCountBNotA',
    label: `Targets associated with ${name} but not the related disease`,
  },
];

const Section = ({ efoId, name, data }) => {
  const { rows } = data;
  const rowsMapped = rows.map(d => ({
    ...d,
    targetCountANotB: d.targetCountA - d.targetCountAAndB,
    targetCountBNotA: d.targetCountB - d.targetCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(name)}
      data={rowsMapped}
    />
  );
};

export default Section;

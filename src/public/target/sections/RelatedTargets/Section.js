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

let SharedDiseases = ({ d, classes }) => {
  const ensemblIdRegexA = /ENSG(0)+/g;
  ensemblIdRegexA.exec(d.A.id);
  const compressedA = d.A.id.slice(ensemblIdRegexA.lastIndex);

  const ensemblIdRegexB = /ENSG(0)+/g;
  ensemblIdRegexB.exec(d.B.id);
  const compressedB = d.B.id.slice(ensemblIdRegexB.lastIndex);

  return (
    <div className={classes.container}>
      <Intersection
        id={d.B.symbol}
        a={d.diseaseCountANotB}
        ab={d.diseaseCountAAndB}
        b={d.diseaseCountBNotA}
      />
      <Link
        external
        to={`https://targetvalidation.org/summary?targets=${compressedA},${compressedB}`}
      >
        See all shared disease associations
      </Link>
    </div>
  );
};

SharedDiseases = withStyles(styles)(SharedDiseases);

const columns = symbol => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => <Link to={`../${d.B.id}`}>{d.B.symbol}</Link>,
    comparator: (a, b) => {
      if (a.B.symbol <= b.B.symbol) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'diseaseCountAAndB',
    label: 'Number of shared disease associations',
    renderCell: d => {
      return <SharedDiseases d={d} />;
    },
  },
  {
    id: 'diseaseCountANotB',
    label: `Diseases associated with the related target but not ${symbol}`,
  },
  {
    id: 'diseaseCountBNotA',
    label: `Diseases associated with ${symbol} but not the related target`,
  },
];

const Section = ({ ensgId, symbol, data }) => {
  const { rows } = data;
  const rowsMapped = rows.map(d => ({
    ...d,
    diseaseCountANotB: d.diseaseCountA - d.diseaseCountAAndB,
    diseaseCountBNotA: d.diseaseCountB - d.diseaseCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(symbol)}
      data={rowsMapped}
    />
  );
};

export default Section;

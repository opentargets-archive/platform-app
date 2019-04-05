import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { OtTableRF, ExternalLink } from 'ot-ui';
import Intersection from '../Intersection';

const query = gql`
  query RelatedTargetsQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        relatedTargets {
          rows {
            A {
              id
              symbol
            }
            B {
              id
              symbol
            }
            diseaseCountA
            diseaseCountB
            diseaseCountAAndB
            diseaseCountAOrB
          }
        }
      }
    }
  }
`;

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
      <ExternalLink
        href={`https://targetvalidation.org/summary?targets=${compressedA},${compressedB}`}
      >
        See all shared disease associations
      </ExternalLink>
    </div>
  );
};

SharedDiseases = withStyles(styles)(SharedDiseases);

const columns = symbol => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => (
      <Link component={RouterLink} to={`../${d.B.id}`}>
        {d.B.symbol}
      </Link>
    ),
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

const RelatedTargetsDetail = ({ ensgId, symbol, sources }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        const { rows } = data.target.details.relatedTargets;
        const rowsMapped = rows.map(d => ({
          ...d,
          diseaseCountANotB: d.diseaseCountA - d.diseaseCountAAndB,
          diseaseCountBNotA: d.diseaseCountB - d.diseaseCountAAndB,
        }));

        return (
          <OtTableRF
            loading={loading}
            error={error}
            columns={columns(symbol)}
            data={rowsMapped}
          />
        );
      }}
    </Query>
  );
};

export default RelatedTargetsDetail;

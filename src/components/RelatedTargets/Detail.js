import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { DataDownloader, OtTableRF } from 'ot-ui';
import Venn from './Venn';

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

const columns = symbol => [
  {
    id: 'B.symbol',
    label: 'Related target',
    renderCell: d => <Link to={`target/${d.B.id}`}>{d.B.symbol}</Link>,
  },
  {
    id: 'diseaseCountAAndB',
    label: 'Venn diagram',
    renderCell: d => (
      <Venn
        sets={[
          { sets: [d.A.symbol], size: d.diseaseCountA },
          { sets: [d.B.symbol], size: d.diseaseCountB },
          { sets: [d.A.symbol, d.B.symbol], size: d.diseaseCountAOrB },
        ]}
      />
    ),
  },
  {
    id: 'venn',
    label: 'Number of shared disease associations',
    renderCell: d => {
      const ensemblIdRegexA = /ENSG(0)+/g;
      ensemblIdRegexA.exec(d.A.id);
      const compressedA = d.A.id.slice(ensemblIdRegexA.lastIndex);

      const ensemblIdRegexB = /ENSG(0)+/g;
      ensemblIdRegexB.exec(d.B.id);
      const compressedB = d.B.id.slice(ensemblIdRegexB.lastIndex);

      return (
        <React.Fragment>
          {d.diseaseCountAAndB}
          <br />
          <a
            href={`https://targetvalidation.org/summary?targets=${compressedA},${compressedB}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See associated diseases
          </a>
        </React.Fragment>
      );
    },
  },
  {
    id: 'diseaseCountANotB',
    label: `Number of diseases associated with ${symbol} but not the related target`,
  },
  {
    id: 'diseaseCountBNotA',
    label: `Number of diseases associated with the related target but not ${symbol}`,
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
          <Fragment>
            <DataDownloader
              tableHeaders={columns(symbol)}
              rows={rowsMapped}
              fileStem={`${symbol}-related-targets`}
            />
            <OtTableRF
              loading={loading}
              error={error}
              columns={columns(symbol)}
              data={rowsMapped}
            />
          </Fragment>
        );
      }}
    </Query>
  );
};

export default RelatedTargetsDetail;

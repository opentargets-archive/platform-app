import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';

import FilterTable from './FilterTable';

const query = gql`
  query CancerBiomarkersQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        cancerBiomarkers {
          rows {
            biomarker
            diseases {
              name
            }
            drugName
            associationType
            evidenceLevel
            sources {
              url
              name
            }
          }
        }
      }
    }
  }
`;

const CancerBiomarkersDetail = ({ ensgId, symbol, sources }) => {
  return (
    <React.Fragment>
      <Typography variant="h5">{symbol} - Cancer Biomarkers</Typography>
      <Typography>
        Genomic biomarkers of drug responses, and their levels of clinical
        significance as described by{' '}
        <a
          href="https://europepmc.org/articles/PMC5875005"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tamborero et al. (2018)
        </a>
        . This data is manually curated by clinical and scientific communities
        in the field of precision oncology.
      </Typography>
      <Typography variant="caption">
        Source{sources.length > 1 ? 's' : null}:{' '}
        {sources.map(d => (
          <a
            key={d.name}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.name}
          </a>
        ))}
      </Typography>
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.cancerBiomarkers;
          return <FilterTable rows={rows} />;
        }}
      </Query>
    </React.Fragment>
  );
};

export default CancerBiomarkersDetail;

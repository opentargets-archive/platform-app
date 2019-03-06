import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      <Query query={query} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          const { rows } = data.target.details.cancerBiomarkers;
          return <FilterTable rows={rows} symbol={symbol} />;
        }}
      </Query>
    </React.Fragment>
  );
};

export default CancerBiomarkersDetail;

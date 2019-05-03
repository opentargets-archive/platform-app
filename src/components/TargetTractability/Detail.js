import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query TargetTractabilityQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        tractability {
          smallMolecule {
            chemblBucket
            description
            value
          }
          antibody {
            chemblBucket
            description
            value
          }
        }
      }
    }
  }
`;

const TargetTractabilityDetail = ({ ensgId }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;
        return <div>Details!</div>;
      }}
    </Query>
  );
};

export default TargetTractabilityDetail;

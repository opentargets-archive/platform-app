import gql from 'graphql-tag';

export default gql`
  query TargetTractabilitySectionQuery($ensgId: String!) {
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

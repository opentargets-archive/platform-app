import gql from 'graphql-tag';

export default gql`
  query PathwaysSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        pathways {
          topLevelPathways {
            id
            name
            isAssociated
          }
          lowLevelPathways {
            id
            name
            parents {
              id
              name
            }
          }
        }
      }
    }
  }
`;

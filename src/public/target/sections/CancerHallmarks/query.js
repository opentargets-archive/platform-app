import gql from 'graphql-tag';

export default gql`
  query CancerHallmarksSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        cancerHallmarks {
          roleInCancer {
            name
            pmId
          }
          rows {
            name
            promotes
            suppresses
            pmId
            description
          }
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  query KnownDrugsSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        drugs {
          rows {
            disease {
              id
              name
            }
            target {
              id
              symbol
            }
            drug {
              id
              name
              type
              activity
            }
            clinicalTrial {
              phase
              status
              sourceUrl
              sourceName
            }
            mechanismOfAction {
              name
              sourceName
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

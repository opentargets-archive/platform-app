import gql from 'graphql-tag';

export default gql`
  query CancerBiomarkersSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        cancerBiomarkers {
          rows {
            biomarker
            diseases {
              id
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

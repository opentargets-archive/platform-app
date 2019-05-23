import gql from 'graphql-tag';

export default gql`
  query ChemicalProbesSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        chemicalProbes {
          rows {
            chemicalProbe
            note
            sources {
              url
              name
            }
          }
          probeMinerUrl
        }
      }
    }
  }
`;

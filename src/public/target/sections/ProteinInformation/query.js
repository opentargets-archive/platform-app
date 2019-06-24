import gql from 'graphql-tag';

export default gql`
  query ProteinInfoSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        protein {
          uniprotId
          pdbId
          pdbs {
            pdbId
            chain
            start
            end
            coverage
            resolution
            method
          }
          keywords {
            id
            name
            category
          }
          subCellularLocations {
            id
            name
          }
          subUnit
          structuralFeatures {
            type
            start
            end
          }
          sequenceLength
        }
      }
    }
  }
`;

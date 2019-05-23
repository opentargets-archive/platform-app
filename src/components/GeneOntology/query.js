import gql from 'graphql-tag';

export default gql`
  query GeneOntologySectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        geneOntology {
          rows {
            id
            term
            category
          }
        }
      }
    }
  }
`;

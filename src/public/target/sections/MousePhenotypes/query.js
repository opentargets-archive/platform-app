import gql from 'graphql-tag';

export default gql`
  query MousePhenotypesSectionQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        mousePhenotypes {
          categories {
            id
            name
            isAssociated
          }
          rows {
            mouseGeneId
            mouseGeneSymbol
            categoryLabel
            phenotypeLabel
            subjectAllelicComposition
            subjectBackground
            pmIds
          }
        }
      }
    }
  }
`;

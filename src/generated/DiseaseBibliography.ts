/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DiseaseBibliography
// ====================================================

export interface DiseaseBibliography_literatureOcurrences {
  __typename: "Publications";
  count: any;
}

export interface DiseaseBibliography {
  __typename: "Disease";
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: DiseaseBibliography_literatureOcurrences;
}

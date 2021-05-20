/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DrugBibliography
// ====================================================

export interface DrugBibliography_literatureOcurrences {
  __typename: "Publications";
  count: any;
}

export interface DrugBibliography {
  __typename: "Drug";
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: DrugBibliography_literatureOcurrences;
}

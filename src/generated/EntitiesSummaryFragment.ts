/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EntitiesSummaryFragment
// ====================================================

export interface EntitiesSummaryFragment_literatureOcurrences {
  __typename: "Publications";
  count: any;
}

export interface EntitiesSummaryFragment {
  __typename: "Target";
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: EntitiesSummaryFragment_literatureOcurrences;
}

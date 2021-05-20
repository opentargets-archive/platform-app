/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OpenTargetsGeneticsSummaryFragment
// ====================================================

export interface OpenTargetsGeneticsSummaryFragment_openTargetsGenetics {
  __typename: "Evidences";
  count: any;
}

export interface OpenTargetsGeneticsSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  openTargetsGenetics: OpenTargetsGeneticsSummaryFragment_openTargetsGenetics;
}

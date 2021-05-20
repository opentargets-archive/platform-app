/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SlapEnrichSummaryFragment
// ====================================================

export interface SlapEnrichSummaryFragment_slapEnrich {
  __typename: "Evidences";
  count: any;
}

export interface SlapEnrichSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  slapEnrich: SlapEnrichSummaryFragment_slapEnrich;
}

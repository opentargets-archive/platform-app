/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClinGenSummaryFragment
// ====================================================

export interface ClinGenSummaryFragment_clingenSummary {
  __typename: "Evidences";
  count: any;
}

export interface ClinGenSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  clingenSummary: ClinGenSummaryFragment_clingenSummary;
}

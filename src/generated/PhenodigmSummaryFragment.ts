/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhenodigmSummaryFragment
// ====================================================

export interface PhenodigmSummaryFragment_phenodigm {
  __typename: "Evidences";
  count: any;
}

export interface PhenodigmSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  phenodigm: PhenodigmSummaryFragment_phenodigm;
}

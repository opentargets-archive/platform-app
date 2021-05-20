/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChemblSummaryFragment
// ====================================================

export interface ChemblSummaryFragment_chemblSummary {
  __typename: "Evidences";
  count: any;
}

export interface ChemblSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  chemblSummary: ChemblSummaryFragment_chemblSummary;
}

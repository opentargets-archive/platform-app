/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SysBioSummaryFragment
// ====================================================

export interface SysBioSummaryFragment_sysBio {
  __typename: "Evidences";
  count: any;
}

export interface SysBioSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  sysBio: SysBioSummaryFragment_sysBio;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TargetMolecularInteractionsSummaryFragment
// ====================================================

export interface TargetMolecularInteractionsSummaryFragment_interactions {
  __typename: "Interactions";
  count: any;
}

export interface TargetMolecularInteractionsSummaryFragment {
  __typename: "Target";
  /**
   * Biological pathway membership from Reactome
   */
  interactions: TargetMolecularInteractionsSummaryFragment_interactions | null;
}

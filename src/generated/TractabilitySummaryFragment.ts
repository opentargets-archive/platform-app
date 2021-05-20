/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TractabilitySummaryFragment
// ====================================================

export interface TractabilitySummaryFragment_tractability_smallmolecule {
  __typename: "TractabilitySmallMolecule";
  buckets: any[];
}

export interface TractabilitySummaryFragment_tractability_antibody {
  __typename: "TractabilityAntibody";
  buckets: any[];
}

export interface TractabilitySummaryFragment_tractability_otherModalities {
  __typename: "OtherModalities";
  buckets: any[];
}

export interface TractabilitySummaryFragment_tractability {
  __typename: "Tractability";
  smallmolecule: TractabilitySummaryFragment_tractability_smallmolecule | null;
  antibody: TractabilitySummaryFragment_tractability_antibody | null;
  otherModalities: TractabilitySummaryFragment_tractability_otherModalities | null;
}

export interface TractabilitySummaryFragment {
  __typename: "Target";
  /**
   * Target druggability assessment
   */
  tractability: TractabilitySummaryFragment_tractability | null;
}

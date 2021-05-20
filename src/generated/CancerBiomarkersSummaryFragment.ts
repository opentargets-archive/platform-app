/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancerBiomarkersSummaryFragment
// ====================================================

export interface CancerBiomarkersSummaryFragment_cancerBiomarkers {
  __typename: "CancerBiomarkers";
  /**
   * Number of unique drugs with response information
   */
  uniqueDrugs: any;
  /**
   * Number of unique cancer diseases with drug response information
   */
  uniqueDiseases: any;
  /**
   * Number of unique biomarkers with drug response information
   */
  uniqueBiomarkers: any;
}

export interface CancerBiomarkersSummaryFragment {
  __typename: "Target";
  /**
   * Clinical relevance and drug responses of tumor genomic alterations on the target
   */
  cancerBiomarkers: CancerBiomarkersSummaryFragment_cancerBiomarkers | null;
}

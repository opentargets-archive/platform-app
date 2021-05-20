/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProteinInformationSummaryFragment
// ====================================================

export interface ProteinInformationSummaryFragment_proteinAnnotations {
  __typename: "ProteinAnnotations";
  /**
   * Uniprot reference accession
   */
  id: string;
  /**
   * Subcellular locations
   */
  subcellularLocations: string[];
  /**
   * Protein subunits
   */
  subunits: string[];
}

export interface ProteinInformationSummaryFragment {
  __typename: "Target";
  /**
   * Various protein coding annotation
   */
  proteinAnnotations: ProteinInformationSummaryFragment_proteinAnnotations | null;
}

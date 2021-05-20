/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProteinInfoSectionQuery
// ====================================================

export interface ProteinInfoSectionQuery_target_proteinAnnotations {
  __typename: "ProteinAnnotations";
  /**
   * Uniprot reference accession
   */
  id: string;
  /**
   * All accessions
   */
  accessions: string[];
  /**
   * Protein function
   */
  functions: string[];
  /**
   * Pathway membership
   */
  pathways: string[];
  /**
   * Protein similarities (families, etc.)
   */
  similarities: string[];
  /**
   * Subcellular locations
   */
  subcellularLocations: string[];
  /**
   * Protein subunits
   */
  subunits: string[];
}

export interface ProteinInfoSectionQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Various protein coding annotation
   */
  proteinAnnotations: ProteinInfoSectionQuery_target_proteinAnnotations | null;
}

export interface ProteinInfoSectionQuery {
  /**
   * Return a Target
   */
  target: ProteinInfoSectionQuery_target | null;
}

export interface ProteinInfoSectionQueryVariables {
  ensgId: string;
}

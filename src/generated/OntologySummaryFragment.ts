/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OntologySummaryFragment
// ====================================================

export interface OntologySummaryFragment_therapeuticAreas {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
}

export interface OntologySummaryFragment {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Disease name
   */
  name: string;
  /**
   * Is disease a therapeutic area itself
   */
  isTherapeuticArea: boolean;
  /**
   * Ancestor therapeutic area disease entities in ontology
   */
  therapeuticAreas: OntologySummaryFragment_therapeuticAreas[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InteractionsSectionQuery
// ====================================================

export interface InteractionsSectionQuery_target_interactions_rows_targetA {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface InteractionsSectionQuery_target_interactions_rows_speciesA {
  __typename: "InteractionSpecies";
  mnemonic: string | null;
}

export interface InteractionsSectionQuery_target_interactions_rows_targetB {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface InteractionsSectionQuery_target_interactions_rows_speciesB {
  __typename: "InteractionSpecies";
  mnemonic: string | null;
}

export interface InteractionsSectionQuery_target_interactions_rows_evidences_participantDetectionMethodA {
  __typename: "InteractionEvidencePDM";
  miIdentifier: string | null;
  shortName: string | null;
}

export interface InteractionsSectionQuery_target_interactions_rows_evidences_participantDetectionMethodB {
  __typename: "InteractionEvidencePDM";
  miIdentifier: string | null;
  shortName: string | null;
}

export interface InteractionsSectionQuery_target_interactions_rows_evidences {
  __typename: "InteractionEvidence";
  evidenceScore: number | null;
  hostOrganismScientificName: string | null;
  interactionDetectionMethodMiIdentifier: string;
  interactionDetectionMethodShortName: string;
  interactionIdentifier: string | null;
  interactionTypeShortName: string | null;
  participantDetectionMethodA: InteractionsSectionQuery_target_interactions_rows_evidences_participantDetectionMethodA[] | null;
  participantDetectionMethodB: InteractionsSectionQuery_target_interactions_rows_evidences_participantDetectionMethodB[] | null;
  expansionMethodShortName: string | null;
  pubmedId: string | null;
}

export interface InteractionsSectionQuery_target_interactions_rows {
  __typename: "Interaction";
  intA: string;
  intABiologicalRole: string;
  targetA: InteractionsSectionQuery_target_interactions_rows_targetA | null;
  speciesA: InteractionsSectionQuery_target_interactions_rows_speciesA | null;
  intB: string;
  intBBiologicalRole: string;
  targetB: InteractionsSectionQuery_target_interactions_rows_targetB | null;
  speciesB: InteractionsSectionQuery_target_interactions_rows_speciesB | null;
  score: number | null;
  count: any;
  sourceDatabase: string;
  /**
   * List of evidences for this interaction
   */
  evidences: InteractionsSectionQuery_target_interactions_rows_evidences[];
}

export interface InteractionsSectionQuery_target_interactions {
  __typename: "Interactions";
  count: any;
  rows: InteractionsSectionQuery_target_interactions_rows[];
}

export interface InteractionsSectionQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Approved gene name
   */
  approvedName: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
  /**
   * Biological pathway membership from Reactome
   */
  interactions: InteractionsSectionQuery_target_interactions | null;
}

export interface InteractionsSectionQuery {
  /**
   * Return a Target
   */
  target: InteractionsSectionQuery_target | null;
}

export interface InteractionsSectionQueryVariables {
  ensgId: string;
  sourceDatabase?: string | null;
  index?: number | null;
  size?: number | null;
}

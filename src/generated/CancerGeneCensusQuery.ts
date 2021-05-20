/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CancerGeneCensusQuery
// ====================================================

export interface CancerGeneCensusQuery_disease_evidences_rows_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Disease name
   */
  name: string;
}

export interface CancerGeneCensusQuery_disease_evidences_rows_mutatedSamples_functionalConsequence {
  __typename: "SequenceOntologyTerm";
  /**
   * Sequence Ontology ID
   */
  id: string;
  /**
   * Sequence Ontology Label
   */
  label: string;
}

export interface CancerGeneCensusQuery_disease_evidences_rows_mutatedSamples {
  __typename: "EvidenceVariation";
  functionalConsequence: CancerGeneCensusQuery_disease_evidences_rows_mutatedSamples_functionalConsequence | null;
  numberSamplesWithMutationType: any | null;
  numberSamplesTested: any | null;
}

export interface CancerGeneCensusQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: CancerGeneCensusQuery_disease_evidences_rows_disease;
  mutatedSamples: CancerGeneCensusQuery_disease_evidences_rows_mutatedSamples[] | null;
  literature: string[] | null;
}

export interface CancerGeneCensusQuery_disease_evidences {
  __typename: "Evidences";
  rows: CancerGeneCensusQuery_disease_evidences_rows[];
}

export interface CancerGeneCensusQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: CancerGeneCensusQuery_disease_evidences;
}

export interface CancerGeneCensusQuery_target_hallmarks_attributes_reference {
  __typename: "LiteratureReference";
  pubmedId: any | null;
  description: string;
}

export interface CancerGeneCensusQuery_target_hallmarks_attributes {
  __typename: "HallmarkAttribute";
  reference: CancerGeneCensusQuery_target_hallmarks_attributes_reference;
  name: string;
}

export interface CancerGeneCensusQuery_target_hallmarks {
  __typename: "Hallmarks";
  attributes: CancerGeneCensusQuery_target_hallmarks_attributes[];
}

export interface CancerGeneCensusQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Target-modulated essential alterations in cell physiology that dictate malignant growth
   */
  hallmarks: CancerGeneCensusQuery_target_hallmarks | null;
}

export interface CancerGeneCensusQuery {
  /**
   * Return a Disease
   */
  disease: CancerGeneCensusQuery_disease | null;
  /**
   * Return a Target
   */
  target: CancerGeneCensusQuery_target | null;
}

export interface CancerGeneCensusQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntOgenQuery
// ====================================================

export interface IntOgenQuery_disease_evidences_rows_disease {
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

export interface IntOgenQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface IntOgenQuery_disease_evidences_rows_mutatedSamples_functionalConsequence {
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

export interface IntOgenQuery_disease_evidences_rows_mutatedSamples {
  __typename: "EvidenceVariation";
  functionalConsequence: IntOgenQuery_disease_evidences_rows_mutatedSamples_functionalConsequence | null;
  numberSamplesTested: any | null;
  numberMutatedSamples: any | null;
}

export interface IntOgenQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: IntOgenQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  /**
   * Target evidence
   */
  target: IntOgenQuery_disease_evidences_rows_target;
  mutatedSamples: IntOgenQuery_disease_evidences_rows_mutatedSamples[] | null;
  resourceScore: number | null;
  significantDriverMethods: string[] | null;
  cohortId: string | null;
  cohortShortName: string | null;
  cohortDescription: string | null;
}

export interface IntOgenQuery_disease_evidences {
  __typename: "Evidences";
  rows: IntOgenQuery_disease_evidences_rows[];
}

export interface IntOgenQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: IntOgenQuery_disease_evidences;
}

export interface IntOgenQuery_target_hallmarks_attributes_reference {
  __typename: "LiteratureReference";
  pubmedId: any | null;
  description: string;
}

export interface IntOgenQuery_target_hallmarks_attributes {
  __typename: "HallmarkAttribute";
  reference: IntOgenQuery_target_hallmarks_attributes_reference;
  name: string;
}

export interface IntOgenQuery_target_hallmarks {
  __typename: "Hallmarks";
  attributes: IntOgenQuery_target_hallmarks_attributes[];
}

export interface IntOgenQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Target-modulated essential alterations in cell physiology that dictate malignant growth
   */
  hallmarks: IntOgenQuery_target_hallmarks | null;
}

export interface IntOgenQuery {
  /**
   * Return a Disease
   */
  disease: IntOgenQuery_disease | null;
  /**
   * Return a Target
   */
  target: IntOgenQuery_target | null;
}

export interface IntOgenQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}

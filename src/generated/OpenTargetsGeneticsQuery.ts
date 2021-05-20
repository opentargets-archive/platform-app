/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OpenTargetsGeneticsQuery
// ====================================================

export interface OpenTargetsGeneticsQuery_disease_evidences_rows_disease {
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

export interface OpenTargetsGeneticsQuery_disease_evidences_rows_variantFunctionalConsequence {
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

export interface OpenTargetsGeneticsQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Evidence identifier
   */
  id: string;
  /**
   * Disease evidence
   */
  disease: OpenTargetsGeneticsQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  studyId: string | null;
  /**
   * Sample size
   */
  studySampleSize: any | null;
  /**
   * Variant evidence
   */
  variantId: string | null;
  /**
   * Variant dbSNP identifier
   */
  variantRsId: string | null;
  literature: string[] | null;
  publicationYear: any | null;
  publicationFirstAuthor: string | null;
  pValueExponent: any | null;
  pValueMantissa: number | null;
  oddsRatio: number | null;
  /**
   * Confidence interval lower-bound  
   */
  oddsRatioConfidenceIntervalLower: number | null;
  oddsRatioConfidenceIntervalUpper: number | null;
  beta: number | null;
  betaConfidenceIntervalLower: number | null;
  betaConfidenceIntervalUpper: number | null;
  variantFunctionalConsequence: OpenTargetsGeneticsQuery_disease_evidences_rows_variantFunctionalConsequence | null;
  resourceScore: number | null;
}

export interface OpenTargetsGeneticsQuery_disease_evidences {
  __typename: "Evidences";
  rows: OpenTargetsGeneticsQuery_disease_evidences_rows[];
}

export interface OpenTargetsGeneticsQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: OpenTargetsGeneticsQuery_disease_evidences;
}

export interface OpenTargetsGeneticsQuery {
  /**
   * Return a Disease
   */
  disease: OpenTargetsGeneticsQuery_disease | null;
}

export interface OpenTargetsGeneticsQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}

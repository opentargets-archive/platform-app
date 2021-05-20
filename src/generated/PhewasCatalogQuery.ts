/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PhewasCatalogQuery
// ====================================================

export interface PhewasCatalogQuery_disease_evidences_rows_disease {
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

export interface PhewasCatalogQuery_disease_evidences_rows_variantFunctionalConsequence {
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

export interface PhewasCatalogQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: PhewasCatalogQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  /**
   * Variant dbSNP identifier
   */
  variantRsId: string | null;
  /**
   * Variant evidence
   */
  variantId: string | null;
  variantFunctionalConsequence: PhewasCatalogQuery_disease_evidences_rows_variantFunctionalConsequence | null;
  resourceScore: number | null;
  studyCases: any | null;
  oddsRatio: number | null;
}

export interface PhewasCatalogQuery_disease_evidences {
  __typename: "Evidences";
  rows: PhewasCatalogQuery_disease_evidences_rows[];
}

export interface PhewasCatalogQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: PhewasCatalogQuery_disease_evidences;
}

export interface PhewasCatalogQuery {
  /**
   * Return a Disease
   */
  disease: PhewasCatalogQuery_disease | null;
}

export interface PhewasCatalogQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}

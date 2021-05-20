/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PhenotypesQuery
// ====================================================

export interface PhenotypesQuery_disease_phenotypes_rows_phenotypeHPO {
  __typename: "HPO";
  /**
   * Open Targets hpo id
   */
  id: string;
  /**
   * Phenotype name
   */
  name: string;
  /**
   * Phenotype description
   */
  description: string | null;
  /**
   * namespace
   */
  namespace: string[] | null;
}

export interface PhenotypesQuery_disease_phenotypes_rows_phenotypeEFO {
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

export interface PhenotypesQuery_disease_phenotypes_rows_evidence_frequencyHPO {
  __typename: "HPO";
  /**
   * Phenotype name
   */
  name: string;
  /**
   * Open Targets hpo id
   */
  id: string;
}

export interface PhenotypesQuery_disease_phenotypes_rows_evidence_onset {
  __typename: "HPO";
  /**
   * Phenotype name
   */
  name: string;
  /**
   * Open Targets hpo id
   */
  id: string;
}

export interface PhenotypesQuery_disease_phenotypes_rows_evidence_modifiers {
  __typename: "HPO";
  /**
   * Phenotype name
   */
  name: string;
  /**
   * Open Targets hpo id
   */
  id: string;
}

export interface PhenotypesQuery_disease_phenotypes_rows_evidence {
  __typename: "DiseaseHPOEvidences";
  /**
   * One of P (Phenotypic abnormality), I (inheritance), C (onset and clinical course). Might be null (MONDO)
   */
  aspect: string | null;
  /**
   * This refers to the center or user making the annotation and the date on which the annotation was made
   */
  bioCuration: string | null;
  /**
   * This field refers to the database and database identifier. EG. OMIM
   */
  diseaseFromSourceId: string;
  /**
   * Related name from the field diseaseFromSourceId
   */
  diseaseFromSource: string;
  /**
   * This field indicates the level of evidence supporting the annotation.
   */
  evidenceType: string | null;
  /**
   * A term-id from the HPO-sub-ontology
   */
  frequency: string | null;
  /**
   * HPO Entity
   */
  frequencyHPO: PhenotypesQuery_disease_phenotypes_rows_evidence_frequencyHPO | null;
  /**
   * This optional field can be used to qualify the annotation. Values: [True or False]
   */
  qualifierNot: boolean;
  /**
   * A term-id from the HPO-sub-ontology below the term Age of onset.
   */
  onset: PhenotypesQuery_disease_phenotypes_rows_evidence_onset[];
  /**
   * HP terms from the Clinical modifier subontology
   */
  modifiers: PhenotypesQuery_disease_phenotypes_rows_evidence_modifiers[];
  /**
   * This field indicates the source of the information used for the annotation (phenotype.hpoa)
   */
  references: string[];
  /**
   * This field contains the strings MALE or FEMALE if the annotation in question is limited to males or females.
   */
  sex: string | null;
  /**
   * Possible source mapping: HPO or MONDO
   */
  resource: string;
}

export interface PhenotypesQuery_disease_phenotypes_rows {
  __typename: "DiseaseHPO";
  /**
   * Phenotype entity
   */
  phenotypeHPO: PhenotypesQuery_disease_phenotypes_rows_phenotypeHPO | null;
  /**
   * Disease Entity
   */
  phenotypeEFO: PhenotypesQuery_disease_phenotypes_rows_phenotypeEFO | null;
  /**
   * List of phenotype annotations.
   */
  evidence: PhenotypesQuery_disease_phenotypes_rows_evidence[];
}

export interface PhenotypesQuery_disease_phenotypes {
  __typename: "DiseaseHPOs";
  /**
   * Number of entries
   */
  count: any;
  /**
   * List of Disease and phenotypes annotations
   */
  rows: PhenotypesQuery_disease_phenotypes_rows[];
}

export interface PhenotypesQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Phenotype from HPO index
   */
  phenotypes: PhenotypesQuery_disease_phenotypes | null;
}

export interface PhenotypesQuery {
  /**
   * Return a Disease
   */
  disease: PhenotypesQuery_disease | null;
}

export interface PhenotypesQueryVariables {
  efoId: string;
  index: number;
  size: number;
}

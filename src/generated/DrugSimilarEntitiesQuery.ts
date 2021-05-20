/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DrugSimilarEntitiesQuery
// ====================================================

export interface DrugSimilarEntitiesQuery_drug_similarEntities_object_Target {
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

export interface DrugSimilarEntitiesQuery_drug_similarEntities_object_Drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Molecule preferred name
   */
  name: string;
}

export interface DrugSimilarEntitiesQuery_drug_similarEntities_object_Disease {
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

export type DrugSimilarEntitiesQuery_drug_similarEntities_object = DrugSimilarEntitiesQuery_drug_similarEntities_object_Target | DrugSimilarEntitiesQuery_drug_similarEntities_object_Drug | DrugSimilarEntitiesQuery_drug_similarEntities_object_Disease;

export interface DrugSimilarEntitiesQuery_drug_similarEntities {
  __typename: "Similarity";
  score: number;
  /**
   * Similarity label optionally resolved into an entity
   */
  object: DrugSimilarEntitiesQuery_drug_similarEntities_object | null;
}

export interface DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows_sentences_matches {
  __typename: "Match";
  mappedId: string;
  matchedLabel: string;
  sectionStart: any | null;
  sectionEnd: any | null;
  startInSentence: any;
  endInSentence: any;
}

export interface DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows_sentences {
  __typename: "Sentence";
  /**
   * Section of the publication (either title or abstract)
   */
  section: string;
  /**
   * List of matches
   */
  matches: DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows_sentences_matches[];
}

export interface DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows {
  __typename: "Publication";
  pmid: string;
  pmcid: string | null;
  /**
   * Publication Date
   */
  publicationDate: string | null;
  /**
   * Unique counts per matched keyword
   */
  sentences: DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows_sentences[] | null;
}

export interface DrugSimilarEntitiesQuery_drug_literatureOcurrences {
  __typename: "Publications";
  count: any;
  cursor: string | null;
  rows: DrugSimilarEntitiesQuery_drug_literatureOcurrences_rows[];
}

export interface DrugSimilarEntitiesQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Molecule preferred name
   */
  name: string;
  /**
   * Return similar labels using a model Word2CVec trained with PubMed
   */
  similarEntities: DrugSimilarEntitiesQuery_drug_similarEntities[];
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: DrugSimilarEntitiesQuery_drug_literatureOcurrences;
}

export interface DrugSimilarEntitiesQuery {
  /**
   * Return a drug
   */
  drug: DrugSimilarEntitiesQuery_drug | null;
}

export interface DrugSimilarEntitiesQueryVariables {
  id: string;
  ids?: string[] | null;
  threshold?: number | null;
  size: number;
  entityNames?: string[] | null;
  cursor?: string | null;
}

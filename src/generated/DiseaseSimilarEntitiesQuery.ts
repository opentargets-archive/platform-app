/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiseaseSimilarEntitiesQuery
// ====================================================

export interface DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Target {
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

export interface DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Drug {
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

export interface DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Disease {
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

export type DiseaseSimilarEntitiesQuery_disease_similarEntities_object = DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Target | DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Drug | DiseaseSimilarEntitiesQuery_disease_similarEntities_object_Disease;

export interface DiseaseSimilarEntitiesQuery_disease_similarEntities {
  __typename: "Similarity";
  score: number;
  /**
   * Similarity label optionally resolved into an entity
   */
  object: DiseaseSimilarEntitiesQuery_disease_similarEntities_object | null;
}

export interface DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows_sentences_matches {
  __typename: "Match";
  mappedId: string;
  matchedLabel: string;
  sectionStart: any | null;
  sectionEnd: any | null;
  startInSentence: any;
  endInSentence: any;
}

export interface DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows_sentences {
  __typename: "Sentence";
  /**
   * Section of the publication (either title or abstract)
   */
  section: string;
  /**
   * List of matches
   */
  matches: DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows_sentences_matches[];
}

export interface DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows {
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
  sentences: DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows_sentences[] | null;
}

export interface DiseaseSimilarEntitiesQuery_disease_literatureOcurrences {
  __typename: "Publications";
  count: any;
  cursor: string | null;
  rows: DiseaseSimilarEntitiesQuery_disease_literatureOcurrences_rows[];
}

export interface DiseaseSimilarEntitiesQuery_disease {
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
   * Return similar labels using a model Word2CVec trained with PubMed
   */
  similarEntities: DiseaseSimilarEntitiesQuery_disease_similarEntities[];
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: DiseaseSimilarEntitiesQuery_disease_literatureOcurrences;
}

export interface DiseaseSimilarEntitiesQuery {
  /**
   * Return a Disease
   */
  disease: DiseaseSimilarEntitiesQuery_disease | null;
}

export interface DiseaseSimilarEntitiesQueryVariables {
  id: string;
  ids?: string[] | null;
  threshold?: number | null;
  size: number;
  entityNames?: string[] | null;
  cursor?: string | null;
}

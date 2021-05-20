/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SafetySummaryFragment
// ====================================================

export interface SafetySummaryFragment_safety_adverseEffects_organsSystemsAffected {
  __typename: "SafetyCode";
  code: string | null;
  mappedTerm: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_activationEffects_acuteDosing {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_activationEffects_chronicDosing {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_activationEffects_general {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_activationEffects {
  __typename: "AdverseEffectsActivationEffects";
  acuteDosing: SafetySummaryFragment_safety_adverseEffects_activationEffects_acuteDosing[];
  chronicDosing: SafetySummaryFragment_safety_adverseEffects_activationEffects_chronicDosing[];
  general: SafetySummaryFragment_safety_adverseEffects_activationEffects_general[];
}

export interface SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_acuteDosing {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_chronicDosing {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_general {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_developmental {
  __typename: "SafetyCode";
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects_inhibitionEffects {
  __typename: "AdverseEffectsInhibitionEffects";
  acuteDosing: SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_acuteDosing[];
  chronicDosing: SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_chronicDosing[];
  general: SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_general[];
  developmental: SafetySummaryFragment_safety_adverseEffects_inhibitionEffects_developmental[];
}

export interface SafetySummaryFragment_safety_adverseEffects_references {
  __typename: "SafetyReference";
  pubmedId: any | null;
  refLink: string | null;
  refLabel: string | null;
}

export interface SafetySummaryFragment_safety_adverseEffects {
  __typename: "AdverseEffects";
  organsSystemsAffected: SafetySummaryFragment_safety_adverseEffects_organsSystemsAffected[];
  activationEffects: SafetySummaryFragment_safety_adverseEffects_activationEffects;
  inhibitionEffects: SafetySummaryFragment_safety_adverseEffects_inhibitionEffects;
  references: SafetySummaryFragment_safety_adverseEffects_references[];
}

export interface SafetySummaryFragment_safety_safetyRiskInfo_organsSystemsAffected {
  __typename: "SafetyCode";
  code: string | null;
  mappedTerm: string | null;
  termInPaper: string | null;
}

export interface SafetySummaryFragment_safety_safetyRiskInfo_references {
  __typename: "SafetyReference";
  pubmedId: any | null;
  refLink: string | null;
  refLabel: string | null;
}

export interface SafetySummaryFragment_safety_safetyRiskInfo {
  __typename: "SafetyRiskInfo";
  organsSystemsAffected: SafetySummaryFragment_safety_safetyRiskInfo_organsSystemsAffected[];
  safetyLiability: string;
  references: SafetySummaryFragment_safety_safetyRiskInfo_references[];
}

export interface SafetySummaryFragment_safety_experimentalToxicity_experimentDetails {
  __typename: "ExperimentDetails";
  tissue: string | null;
  assayFormat: string;
  assayDescription: string;
  cellShortName: string | null;
  assayFormatType: string;
}

export interface SafetySummaryFragment_safety_experimentalToxicity {
  __typename: "ExperimentalToxicity";
  experimentDetails: SafetySummaryFragment_safety_experimentalToxicity_experimentDetails;
  dataSource: string;
  dataSourceReferenceLink: string;
}

export interface SafetySummaryFragment_safety {
  __typename: "Safety";
  adverseEffects: SafetySummaryFragment_safety_adverseEffects[];
  safetyRiskInfo: SafetySummaryFragment_safety_safetyRiskInfo[];
  experimentalToxicity: SafetySummaryFragment_safety_experimentalToxicity[];
}

export interface SafetySummaryFragment {
  __typename: "Target";
  /**
   * Known target safety effects and target safety risk information
   */
  safety: SafetySummaryFragment_safety | null;
}

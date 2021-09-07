import config from '../config';

export const isPrivateTargetSection = id =>
  config.partnerTargetSectionIds.split(',').includes(id);
export const isPrivateDiseaseSection = id =>
  config.partnerDiseaseSectionIds.split(',').includes(id);
export const isPrivateDrugSection = id =>
  config.partnerDrugSectionIds.split(',').includes(id);
export const isPrivateEvidenceSection = id =>
  config.partnerEvidenceSectionIds.split(',').includes(id);

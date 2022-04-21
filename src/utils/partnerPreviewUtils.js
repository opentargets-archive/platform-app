import config from '../config';

// page sections
export const isPrivateTargetSection = id =>
  config.profile.partnerTargetSectionIds.includes(id);
export const isPrivateDiseaseSection = id =>
  config.profile.partnerDiseaseSectionIds.includes(id);
export const isPrivateDrugSection = id =>
  config.profile.partnerDrugSectionIds.includes(id);
export const isPrivateEvidenceSection = id =>
  config.profile.partnerEvidenceSectionIds.includes(id);

// associations
export const isPrivateDataType = id =>
  config.profile.partnerDataTypes.includes(id);
export const isPrivateDataSource = id =>
  config.profile.partnerDataSources.includes(id);

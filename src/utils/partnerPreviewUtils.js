import config from '../config';

// page sections
export const isPrivateTargetSection = id =>
  config.profile.partnerTargetSectionIds.split(',').includes(id);
export const isPrivateDiseaseSection = id =>
  config.profile.partnerDiseaseSectionIds.includes(id);
export const isPrivateDrugSection = id =>
  config.profile.partnerDrugSectionIds.split(',').includes(id);
export const isPrivateEvidenceSection = id =>
  config.profile.partnerEvidenceSectionIds.split(',').includes(id);

// associations
export const isPrivateDataType = id =>
  config.profile.partnerDataTypes.split(',').includes(id);
export const isPrivateDataSource = id =>
  config.profile.partnerDataSources.split(',').includes(id);

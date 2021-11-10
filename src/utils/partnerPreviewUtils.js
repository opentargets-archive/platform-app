import config from '../config';

// page sections
export const isPrivateTargetSection = id =>
  config.configProfile.partnerTargetSectionIds.split(',').includes(id);
export const isPrivateDiseaseSection = id =>
  config.configProfile.partnerDiseaseSectionIds.includes(id);
export const isPrivateDrugSection = id =>
  config.configProfile.partnerDrugSectionIds.split(',').includes(id);
export const isPrivateEvidenceSection = id =>
  config.configProfile.partnerEvidenceSectionIds.split(',').includes(id);

// associations
export const isPrivateDataType = id =>
  config.configProfile.partnerDataTypes.split(',').includes(id);
export const isPrivateDataSource = id =>
  config.configProfile.partnerDataSources.split(',').includes(id);

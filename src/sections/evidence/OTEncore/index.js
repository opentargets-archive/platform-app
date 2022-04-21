import { isPrivateEvidenceSection } from '../../../utils/partnerPreviewUtils';

const id = 'encore';
export const definition = {
  id: id,
  name: 'Open Targets ENCORE',
  shortName: 'OT',
  hasData: ({ otEncoreSummary }) => otEncoreSummary.count > 0,
  isPrivate: isPrivateEvidenceSection(id),
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

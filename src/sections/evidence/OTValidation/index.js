import { isPrivateEvidenceSection } from '../../../utils/partnerPreviewUtils';

const id = 'validationlab';
export const definition = {
  id: id,
  name: 'Open Targets Validation Lab',
  shortName: 'VL',
  hasData: () => true, // ({ otValidationSummary }) => otValidationSummary.count > 0,
  isPrivate: isPrivateEvidenceSection(id),
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

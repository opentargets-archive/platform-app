import { isPrivateEvidenceSection } from '../../../utils/partnerPreviewUtils';

const id = 'otCrispr';
export const definition = {
  id: id,
  name: 'Open Targets CRISPR',
  shortName: 'OT',
  hasData: ({ OtCrisprSummary }) => OtCrisprSummary.count > 0,
  isPrivate: isPrivateEvidenceSection(id),
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

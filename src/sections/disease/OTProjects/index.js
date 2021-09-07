import { isPrivateDiseaseSection } from '../../../utils/partnerPreviewUtils';

const id = 'otProjects';
export const definition = {
  id: id,
  name: 'Open Targets Projects',
  shortName: 'OP',
  hasData: data => data.otarProjects?.length > 0,
  isPrivate: isPrivateDiseaseSection(id),
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

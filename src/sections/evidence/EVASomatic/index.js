export const definition = {
  id: 'evaSomatic',
  name: 'ClinVar (somatic)',
  shortName: 'ES',
  hasData: ({ evaSomaticSummary }) => evaSomaticSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

export const definition = {
  id: 'cancerBiomarkers',
  name: 'Cancer Biomarkers',
  shortName: 'CB',
  hasData: data => data.cancerBiomarkers?.uniqueBiomarkers > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

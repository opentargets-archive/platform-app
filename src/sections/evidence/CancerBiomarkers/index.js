export const definition = {
  id: 'cancerBiomarkers',
  name: 'Cancer Biomarkers',
  shortName: 'CB',
  hasData: data => {
    return data.cancerBiomarkersSummary.count > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

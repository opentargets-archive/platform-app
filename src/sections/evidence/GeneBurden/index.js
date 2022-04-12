export const definition = {
  id: 'geneBurden',
  name: 'Gene Burden',
  shortName: 'GB',
  hasData: data => {
    // return data.cancerBiomarkersSummary.count > 0;
    return true;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

export const definition = {
  id: 'geneBurden',
  name: 'Gene Burden',
  shortName: 'GB',
  hasData: data => {
    return data.geneBurdenSummary.count > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

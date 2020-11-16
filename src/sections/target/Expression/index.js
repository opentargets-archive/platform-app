export const definition = {
  id: 'expressions',
  name: 'Baseline Expression',
  shortName: 'BE',
  hasData: data => {
    const hasRNA = data.expressions.some(d => d.rna.level >= 0);
    const hasProtein = data.expressions.some(d => d.protein.level >= 0);
    return hasRNA || hasProtein;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

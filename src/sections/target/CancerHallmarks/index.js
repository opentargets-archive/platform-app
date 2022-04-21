export const definition = {
  id: 'cancerHallmarks',
  name: 'Cancer Hallmarks',
  shortName: 'CH',
  hasData: data => data.hallmarks?.cancerHallmarks?.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

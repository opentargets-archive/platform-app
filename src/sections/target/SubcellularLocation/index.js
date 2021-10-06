export const definition = {
  id: 'subcellularLocation',
  name: 'Subcellular Location',
  shortName: 'SL',
  hasData: ({ subcellularLocations }) => subcellularLocations.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

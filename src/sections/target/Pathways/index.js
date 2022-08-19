export const definition = {
  id: 'pathways',
  name: 'Pathways',
  shortName: 'PW',
  hasData: data => {
    return data.pathways.length > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

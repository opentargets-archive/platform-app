export const definition = {
  id: 'protVista',
  name: 'ProtVista',
  shortName: 'PV',
  hasData: ({ proteinIds }) => {
    for (let i = 0; i < proteinIds.length; i++) {
      if (proteinIds[i].source === 'uniprot_swissprot') {
        return true;
      }
    }
    return false;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

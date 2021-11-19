export const definition = {
  id: 'openPedCanSomaticAlterations',
  name: 'OpenPedCan Somatic Alterations',
  shortName: 'SA',
  hasData: ( data ) => {
    const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = data;
    const hasCount = snvByGene.count > 0 || snvByVariant.count > 0 || cnvByGene.count > 0 
                      || fusionByGene.count > 0 || fusion.count > 0
    return hasCount
  
  },
}

export { default as Summary } from './Summary';
export { default as Body } from './Body';

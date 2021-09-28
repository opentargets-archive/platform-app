export const definition = {
  id: 'somaticMutation',
  name: 'Somatic Mutation',
  shortName: 'SM',
  hasData: ( somaticMutationSummary ) => {
    const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = somaticMutationSummary;
    const hasCount = snvByGene.count > 0 || snvByVariant.count > 0 || cnvByGene.count > 0 
                      || fusionByGene.count > 0 || fusion.count > 0
    return hasCount
  
  },
}

export { default as Summary } from './Summary';
export { default as Body } from './Body';

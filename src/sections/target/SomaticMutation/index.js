export const definition = {
  id: 'somaticMutationT',
  name: 'Somatic Mutation',
  shortName: 'SM',
  hasData: ( somaticMutationSummaryT ) => {
    const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = somaticMutationSummaryT;
    const hasCount = snvByGene.count > 0 || snvByVariant.count > 0 || cnvByGene.count > 0 
                      || fusionByGene.count > 0 || fusion.count > 0
    return hasCount
  
  },
}

export { default as Summary } from './Summary';
export { default as Body } from './Body';

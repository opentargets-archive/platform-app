export const definition = {
  id: 'somaticMutation',
  name: 'Somatic Mutation',
  shortName: 'SM',
  hasData: ( somaticMutationSummary ) => {
    const {SnvByGene, SnvByVariant, CnvByGene, FusionByGene, Fusion} = somaticMutationSummary;
    const hasCount = SnvByGene.count > 0 || SnvByVariant.count > 0 || CnvByGene.count > 0 || FusionByGene.count > 0 || Fusion.count > 0

    return hasCount
  
  },
}

export { default as Summary } from './Summary';
export { default as Body } from './Body';

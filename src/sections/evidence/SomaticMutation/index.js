export const definition = {
  id: 'somaticMutation',
  name: 'Somatic Mutation',
  shortName: 'SM',
  hasData: ( somaticMutationSummary ) => somaticMutationSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

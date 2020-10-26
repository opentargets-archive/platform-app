export const definition = {
  id: 'tractability',
  name: 'Tractability',
  shortName: 'TR',
  hasData: data =>
    data.tractability?.antibody?.buckets?.length > 0 ||
    data.tractability?.smallmolecule?.buckets?.length > 0 ||
    data.tractability?.otherModalities?.buckets?.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

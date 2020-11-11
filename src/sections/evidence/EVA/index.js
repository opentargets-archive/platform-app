export const definition = {
  id: 'eva',
  name: 'EVA',
  shortName: 'EV',
  hasData: ({ evaSummary }) => evaSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

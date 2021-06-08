export const definition = {
  id: 'otarProjects',
  name: 'Open Targets Projects',
  shortName: 'OP',
  // TODO: determine if there's data using real data from API
  hasData: () => true,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

export const definition = {
  id: 'otarProjects',
  name: 'Open Targets Projects',
  shortName: 'OP',
  hasData: data => data.otarProjects?.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

export const definition = {
  id: 'mechanismsOfAction',
  name: 'Mechanisms of Action',
  shortName: 'MA',
  hasData: data =>
    (data.mechanismsOfAction?.uniqueActionTypes.length > 0 &&
      data.mechanismsOfAction?.uniqueTargetTypes.length > 0) ||
    false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';

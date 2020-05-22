export const label = str =>
  str
    ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`.replace(
        /_/g,
        ' '
      )
    : 'N/A';

export const safeToString = x => {
  switch (typeof x) {
    case 'object':
      return 'object';
    case 'function':
      return 'function';
    case undefined:
    case null:
      return '';
    default:
      return x + '';
  }
};

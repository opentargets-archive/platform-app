export const label = str =>
  str
    ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`.replace(
        /_/g,
        ' '
      )
    : 'N/A';

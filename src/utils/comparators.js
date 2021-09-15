/*
Example usage:
const comparatorDiseaseName = generateComparatorFromAccessor(d => d.disease.name);
 */
export const generateComparatorFromAccessor = accessor => (a, b) => {
  const aValue = accessor(a);
  const bValue = accessor(b);
  return aValue > bValue ? 1 : aValue === bValue ? 0 : -1;
};

/*
  Compares a breakpoint against a breakpoint helper.
 */
export const breakpointMatch = (breakpoint, breakpointHelper) => {
  const breakpointMap = { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 };
  const isDownComparator = breakpointHelper.includes('Down');
  const isUpComparator = breakpointHelper.includes('Up');

  const breakpointIndex = breakpointMap[breakpoint];
  const breakpointHelperIndex =
    breakpointMap[breakpointHelper.replace(/Down|Up|Only/g, '')];

  if (breakpointIndex === breakpointHelperIndex) {
    return true;
  }

  if (isDownComparator && breakpointIndex <= breakpointHelperIndex) {
    return true;
  }

  if (isUpComparator && breakpointIndex >= breakpointHelperIndex) {
    return true;
  }

  return false;
};

/*
 * genericComparator: comparing row1 and row2 using the input keyName.
 * return: -1 if first string is lexicographically less than second property
 *          1 if first string is lexicographically greater than second property
 *          0 if both property are equal
 */
export const genericComparator = (row1, row2, keyName) => {
  const a =
    typeof row1[keyName] === 'string'
      ? row1[keyName].toLowerCase()
      : row1[keyName];
  const b =
    typeof row2[keyName] === 'string'
      ? row2[keyName].toLowerCase()
      : row2[keyName];

  return a < b ? -1 : a > b ? 1 : 0;
}
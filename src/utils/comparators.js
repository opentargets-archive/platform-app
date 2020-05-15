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

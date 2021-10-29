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
 * return: -1 if first property is less than second property
 *          1 if first property is greater than second property
 *          0 if both property are equal
 * property type can be number or string
 */
export const genericComparator = (row1, row2, keyName, number=false) => {
  let a = row1[keyName], b = row2[keyName];
  if (number) {
    // Empty column value will be assign as -1
    a = parseFloat(a || -1); 
    b = parseFloat(b || -1);
  } else if ((typeof row1[keyName] === 'string') && (typeof row2[keyName] === 'string')) {
    a = row1[keyName].toLowerCase();
    b = row2[keyName].toLowerCase();
  }
  
  return a < b ? -1 : a > b ? 1 : 0;
}
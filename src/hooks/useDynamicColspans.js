import { breakpointMatch } from '../utils/comparators';

function useDynamicColspan(groups, columns, width) {
  const oldColspans = groups.map(hg => parseInt(hg.colspan));
  const newColspans = oldColspans.map((colspan, i) => {
    const prevColspan = i > 0 ? oldColspans[i - 1] : 0;
    return columns
      .slice(prevColspan, prevColspan + colspan)
      .filter(c =>
        !c.hidden
          ? true
          : c.hidden
              .map(breakpointHelper => breakpointMatch(width, breakpointHelper))
              .every(e => !e)
      ).length;
  });

  return newColspans;
}

export default useDynamicColspan;

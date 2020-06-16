import { breakpointMatch } from '../utils/comparators';

function useDynamicColspan(groups, columns, width) {
  const colCopy = [...columns];
  const oldColspans = groups.map(group => parseInt(group.colspan));
  const columnGroups = oldColspans.map(colspan => colCopy.splice(0, colspan));

  const newColspans = columnGroups.map(columnGroup => {
    return columnGroup.filter(column => {
      if (!column.hidden) return true;

      const isShown = column.hidden
        .map(breakpointHelper => breakpointMatch(width, breakpointHelper))
        .every(e => !e);

      return isShown;
    }).length;
  });

  return newColspans;
}

export default useDynamicColspan;

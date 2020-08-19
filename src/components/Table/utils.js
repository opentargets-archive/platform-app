/*
  Returns a list of breakpoints translating values from hidden prop.
 */
export const getHiddenBreakpoints = column =>
  column.hidden?.reduce(
    (obj, b) => {
      if (b.includes('Only')) {
        return { ...obj, only: [...obj.only, b.replace(/Only/, '')] };
      }
      return { ...obj, [b]: true };
    },
    { only: [] }
  );

export const getPage = (rows, page, pageSize) => {
  return rows.slice(pageSize * page, pageSize * page + pageSize);
};

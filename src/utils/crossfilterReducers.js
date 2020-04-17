/* example usage:
const drugAccessor = d => d.drug.name;
const drugCount = <crossfilterRootObject>.groupAll().reduce(
      upReducerKeyCount(drugAccessor),
      downReducerKeyCount(drugAccessor),
      () => ({})
    );
*/

export const upReducerKeyCount = (accessor) => (acc, data) => {
  const key = accessor(data);
  if (key in acc) {
    acc[key]++;
  } else {
    acc[key] = 1;
  }
  return acc;
};

export const downReducerKeyCount = (accessor) => (acc, data) => {
  const key = accessor(data);
  acc[key]--;
  if (acc[key] === 0) {
    delete acc[key];
  }
  return acc;
};

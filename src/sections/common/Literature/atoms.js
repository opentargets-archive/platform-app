import { atom, selectorFamily, selector } from 'recoil';
import client from '../../../client';
import { europePmcBiblioSearchPOSTQuery } from '../../../utils/urls';

export const fetchLiteratures = ({
  id,
  threshold = 0.5,
  size = 15,
  query,
  cursor = null,
  category = null,
  entities = [],
  categories = [],
}) => {
  return client.query({
    query,
    variables: {
      cursor,
      id,
      ids: entities.map(c => c.object.id),
      threshold,
      size,
      entityNames:
        category.value === categories[0].value ? null : [category.value],
    },
  });
};

export const categoryListState = atom({
  key: 'literatureCategoryListState',
  default: [
    { value: 'all', label: 'All' },
    { value: 'target', label: 'Target' },
    { value: 'disease', label: 'Disease' },
    { value: 'drug', label: 'Drug' },
  ],
});

export const categoryState = atom({
  key: 'literatureCategoryState',
  default: { value: 'all', label: 'All' },
});

export const cursorState = atom({
  key: 'literatureCursorState',
  default: null,
});

export const currentPageState = atom({
  key: 'literatureCurrentPageState',
  default: 0,
});

// export const currentPageState = atom({
//   key: 'literatureCurrentPageState',
//   default: 0,
// });

export const entitiesState = atom({
  key: 'literatureEntitiesState',
  default: [],
});

export const selectedEntitiesState = atom({
  key: 'literatureSelectedEntitiesState',
  default: [],
});

export const literaturesIdsState = atom({
  key: 'literaturesIdsState',
  default: [],
});

export const loadindEntitiesState = atom({
  key: 'literatureLoadindEntitiesState',
  default: false,
});

const fetchLiteraturesFromPMC = async ({ baseUrl, requestOptions }) =>
  fetch(baseUrl, requestOptions).then(response => response.json());

export const similarEntitiesQuery = selectorFamily({
  key: 'similarEntitiesQuery',
  get: queryParams => async ({ get }) => {
    const { id, query, cursor } = queryParams;
    const entities = get(selectedEntitiesState);
    const category = get(categoryState);
    const categories = get(categoryListState);
    const response = await fetchLiteratures({
      id,
      query,
      entities,
      category,
      categories,
      cursor,
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
});

export const literaturesEuropePMCQuery = selectorFamily({
  key: 'literaturesEuropePMCQuery',
  get: queryParams => async () => {
    const { literaturesIds } = queryParams;
    if (literaturesIds.length === 0) return [];
    const { baseUrl, requestOptions } = europePmcBiblioSearchPOSTQuery(
      literaturesIds
    );
    const response = await fetchLiteraturesFromPMC({ baseUrl, requestOptions });
    if (response.error) {
      throw response.error;
    }
    return response.resultList?.result;
  },
});

export const publicationsState = selector({
  key: 'dwdw',
  get: ({ get }) => {
    const literaturesIds = get(literaturesIdsState);
    // const page = get(currentPageState);
    // const ids = page === 0 ? literaturesIds : literaturesIds.slice(5 * page);
    return get(literaturesEuropePMCQuery({ literaturesIds }));
  },
});

// export const pagessState = selector({
//   key: 'dwdwjjj',
//   default: 0,
//   get: ({ get }) => {
//     const literaturesIds = get(literaturesIdsState);
//     const newPage = get(literaturesIdsState);
//     const cursor = get(cursorState);

//     if (
//       5 * newPage + 5 > literaturesIds.length &&
//       cursor !== null
//     ) {

//     }

//   },
// });

export const literaturesState = selectorFamily({
  key: 'literaturesState',
  default: [],
  get: ({ literaturesIds, data }) => () => {
    const mapedResults = new Map(data.map(key => [key.pmid, key]));
    const ordered = literaturesIds.reduce((acc, key) => {
      const pub = mapedResults.get(key);
      if (pub) acc.push(pub);
      return acc;
    }, []);
    return ordered;
  },
});

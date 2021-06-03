import { isEmpty } from 'lodash-es';
import { atom, selectorFamily, selector } from 'recoil';
import client from '../../../client';
import { getPage } from '../../../components/Table';
import { europePmcBiblioSearchPOSTQuery } from '../../../utils/urls';

// ------------------------------------------
// Helpers
// ------------------------------------------
const parsePublications = publications =>
  publications.map(pub => {
    const row = {};
    row.europePmcId = pub.id;
    row.fullTextOpen = pub.inEPMC === 'Y' || pub.inPMC === 'Y' ? true : false;
    row.title = pub.title;
    row.year = pub.pubYear;
    row.abstract = pub.abstractText;
    row.openAccess = pub.isOpenAccess === 'N' ? false : true;
    row.authors = pub.authorList?.author || [];
    row.journal = {
      ...pub.journalInfo,
      page: pub.pageInfo,
    };
    return row;
  });

// ------------------------------------------
// Requests
// ------------------------------------------
const fetchLiteraturesFromPMC = async ({ baseUrl, requestOptions }) =>
  fetch(baseUrl, requestOptions).then(response => response.json());

export const fetchLiteratures = ({
  id,
  threshold = 0.5,
  size = 15,
  query,
  cursor = null,
  category = null,
  entities = [],
}) => {
  const entityNames = category.length === 0 ? null : category;
  const ids = entities.map(c => c.object.id);
  return client.query({
    query,
    variables: {
      cursor,
      id,
      ids,
      threshold,
      size,
      entityNames,
    },
  });
};

// ------------------------------------------
// Atoms
// ------------------------------------------
export const categoryListState = atom({
  key: 'literatureCategoryListState',
  default: [
    { name: 'target', label: 'Target' },
    { name: 'disease', label: 'Disease' },
    { name: 'drug', label: 'Drug' },
  ],
});

export const categoryState = atom({
  key: 'literatureCategoryState',
  default: ['target', 'disease', 'drug'],
});

export const cursorState = atom({
  key: 'literatureCursorState',
  default: null,
});

export const currentPageState = atom({
  key: 'literatureCurrentPageState',
  default: 0,
});

export const selectedEntitiesState = atom({
  key: 'literatureSelectedEntitiesState',
  default: [],
});

export const settingsState = atom({
  key: 'settingsState',
  default: { id: null, query: null, entity: null },
});

export const literaturesOrderedState = atom({
  key: 'literaturesOrderedState',
  default: [],
});

// ------------------------------------------
// Selectors
// ------------------------------------------
export const _literaturesOrderedState = selector({
  key: '_literaturesOrderedState',
  get: ({ get }) => {
    const page = get(currentPageState);
    const local = get(literaturesOrderedState);
    const listFromRequest = get(_literaturesIdsState);
    return page !== 0 ? listFromRequest : [...local, ...listFromRequest];

    // if (isEmpty(data)) return [];
    // const { literatureOcurrences } = data;
    // return literatureOcurrences?.rows?.map(({ pmid }) => pmid);
  },
  set: ({ get, set }, newValue) => {
    const local = get(literaturesOrderedState);
    const listFromRequest = get(_literaturesIdsState);
    return set(literaturesOrderedState, newValue);
  },
});

export const _literaturesIdsState = selector({
  key: '_literaturesIdsState',
  get: ({ get }) => {
    const data = get(_similarEntitiesQuery);
    if (isEmpty(data)) return [];
    const { literatureOcurrences } = data;
    return literatureOcurrences?.rows?.map(({ pmid }) => pmid);
  },
});

export const _literatureNextCursorState = selector({
  key: '_literatureNextCursorState',
  get: ({ get }) => {
    const data = get(_similarEntitiesQuery);
    if (isEmpty(data)) return null;
    const { literatureOcurrences } = data;
    return literatureOcurrences.cursor || null;
  },
});

export const _literaturesCountState = selector({
  key: '_literaturesCountState',
  get: ({ get }) => {
    const data = get(_similarEntitiesQuery);
    if (isEmpty(data)) return 0;
    const { literatureOcurrences } = data;
    return literatureOcurrences.count;
  },
});

export const _entitiesState = selector({
  key: '_entitiesState',
  get: ({ get }) => {
    const data = get(_similarEntitiesQuery);
    if (isEmpty(data)) return [];
    const { similarEntities } = data;
    return similarEntities;
  },
});

export const publicationsState = selector({
  key: 'literaturePublications',
  get: ({ get }) => {
    // const page = get(currentPageState);
    // if(page) = []
    const literaturesIds = get(_literaturesIdsState);
    if (isEmpty(literaturesIds)) return [];
    // const page = get(currentPageState);
    // const ids = page === 0 ? literaturesIds : literaturesIds.slice(5 * page);

    const publications = get(literaturesEuropePMCQuery({ literaturesIds }));
    const parsedPublications = parsePublications(publications);
    return parsedPublications;
  },
});

export const displayedPublications = selector({
  key: 'displayedPublications',
  get: ({ get }) => {
    const page = get(currentPageState);
    const publications = get(publicationsState);
    const literaturesIds = get(_literaturesIdsState);
    if (isEmpty(publications)) return [];
    const rows =
      literaturesIds.length === publications.length || page === 0
        ? getPage(publications, page, 5)
        : getPage(publications, page - 1, 5);
    return rows;
  },
});

// ------------------------------------------
// Selectors with request
// ------------------------------------------
export const _similarEntitiesQuery = selector({
  key: 'some',
  get: ({ get }) => {
    const { id, query, entity } = get(settingsState);
    if (!id || !query) return {};
    const cursor = get(cursorState);
    const entities = get(selectedEntitiesState);
    const category = get(categoryState);
    const categories = get(categoryListState);
    return get(
      similarEntitiesQuery({
        id,
        query,
        cursor,
        entities,
        category,
        categories,
        entity,
      })
    );
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

export const similarEntitiesQuery = selectorFamily({
  key: 'similarEntitiesQuery',
  get: queryParams => async () => {
    const {
      query,
      id,
      cursor,
      entities,
      category,
      categories,
      entity,
    } = queryParams;
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
    return response.data[entity];
  },
});
// export const literaturesState = selectorFamily({
//   key: 'literaturesState',
//   default: [],
//   get: ({ literaturesIds, data }) => () => {
//     const mapedResults = new Map(data.map(key => [key.pmid, key]));
//     const ordered = literaturesIds.reduce((acc, key) => {
//       const pub = mapedResults.get(key);
//       if (pub) acc.push(pub);
//       return acc;
//     }, []);
//     return ordered;
//   },
// });

import { isEmpty } from 'lodash-es';
import { atom, selectorFamily, selector } from 'recoil';
import client from '../../../client';
import { getPage } from '../../../components/Table';
import { europePmcBiblioSearchPOSTQuery } from '../../../utils/urls';

// ------------------------------------------
// Helpers
// ------------------------------------------
export const parsePublications = publications =>
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
// ATOMS
// ------------------------------------------
export const literatureState = atom({
  key: 'literatureState',
  default: {
    id: '',
    cursor: '',
    category: ['disease', 'drug', 'target'],
    query: null,
    globalEntity: null,
    entities: [],
    selectedEntities: [],
    litsIds: [],
    page: 0,
    pageSize: 5,
    litsCount: 0,
    loadingEntities: false,
  },
});

export const publicationsState = atom({
  key: 'publicationsState',
  default: [],
});

// ------------------------------------------
// SELECTORS
// ------------------------------------------
export const loadingEntitiesState = selector({
  key: 'loadingEntitiesState',
  get: ({ get }) => {
    const { loadingEntities } = get(literatureState);
    return loadingEntities;
  },
  set: ({ set, get }, newStatus) => {
    const currentState = get(literatureState);
    return set(literatureState, {
      ...currentState,
      loadingEntities: newStatus,
    });
  },
});

export const selectedCategoriesState = selector({
  key: 'selectedCategoriesState',
  get: ({ get }) => {
    const { category } = get(literatureState);
    const sortedCategories = [...category].sort();
    return sortedCategories;
  },
  set: ({ set, get }, newStatus) => {
    const currentState = get(literatureState);
    return set(literatureState, {
      ...currentState,
      category: newStatus,
    });
  },
});

export const litsCursorState = selector({
  key: 'litsCursorState',
  get: ({ get }) => {
    const { cursor } = get(literatureState);
    return cursor;
  },
});

export const tablePageState = selector({
  key: 'tablePageState',
  get: ({ get }) => {
    const { page } = get(literatureState);
    return page;
  },
  set: ({ set, get }, newPage) => {
    const currentState = get(literatureState);
    return set(literatureState, {
      ...currentState,
      page: newPage,
    });
  },
});

export const tablePageSizeState = selector({
  key: 'tablePageSizeState',
  get: ({ get }) => {
    const { pageSize } = get(literatureState);
    return pageSize;
  },
  set: ({ set, get }, newPageSize) => {
    const currentState = get(literatureState);
    return set(literatureState, {
      ...currentState,
      pageSize: newPageSize,
    });
  },
});

export const litsCountState = selector({
  key: 'litsCountState',
  get: ({ get }) => {
    const { litsCount } = get(literatureState);
    return litsCount;
  },
});

export const litsIdsState = selector({
  key: 'litsIdsState',
  get: ({ get }) => {
    const { litsIds } = get(literatureState);
    return litsIds;
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(literatureState);
    return set(literatureState, {
      ...currentState,
      litsIds: newValue,
    });
  },
});

// export const publicationsLoaded = selector({
//   key: 'publicationsLoaded',
//   get: ({ get }) => {
//     const litsIds = get(litsIdsState);
//     const readyForRequest = litsIds
//       .filter(x => x.status === 'ready')
//       .map(x => x.id);
//     const queryResult = get(
//       literaturesEuropePMCQuery({
//         literaturesIds: readyForRequest,
//       })
//     );

//     const parsedPublications = parsePublications(queryResult);

//     const mapedResults = new Map(
//       parsedPublications.map(key => [key.europePmcId, key])
//     );

//     const some = litsIds.map(x => {
//       const publication = mapedResults.get(x.id);
//       const status = publication ? 'loaded' : 'missing';
//       return { ...x, status, publication };
//     });
//     return some;
//   },
// });

export const displayedPublications = selector({
  key: 'displayedPublications',
  get: ({ get }) => {
    const page = get(tablePageState);
    const pageSize = get(tablePageSizeState);
    const publications = get(litsIdsState);
    if (isEmpty(publications)) return [];
    const rows = getPage(publications, page, pageSize);
    return rows;
  },
});

// export const _litsIdsState = selector({
//   key: '_litsIdsState',
//   get: ({ get }) => {
//     const { litsIds } = get(literatureState);
//     const news = litsIds.map(id => ({
//       id,
//       status: 'missing',
//       publication: null,
//     }));
//     return news;
//   },
// });

export const entitiesState = selector({
  key: 'entitiesState',
  get: ({ get }) => {
    const { entities } = get(literatureState);
    return entities;
  },
});

export const selectedEntitiesState = selector({
  key: 'selectedEntitiesState',
  get: ({ get }) => {
    const { selectedEntities } = get(literatureState);
    return selectedEntities;
  },
  set: ({ set, get }, selectedEntities) => {
    const currentState = get(literatureState);
    return set(literatureState, { ...currentState, selectedEntities });
  },
});

export const updateLiteratureState = selector({
  key: 'updateLiteratureState',
  set: ({ set, get }, stateUpdate) => {
    const currentState = get(literatureState);
    return set(literatureState, { ...currentState, ...stateUpdate });
  },
});

// ------------------------------------------
// QUERY
// ------------------------------------------

// export const similarEntitiesQuery = selectorFamily({
//   key: 'similarEntitiesQuery',
//   get: queryParams => async () => {
//     const { query, id, cursor, entities, category, entity } = queryParams;
//     const response = await fetchLiteratures({
//       id,
//       query,
//       entities,
//       category,
//       cursor,
//     });
//     if (response.error) {
//       throw response.error;
//     }
//     return response.data[entity];
//   },
// });

// ------------------------------------------
// Requests
// ------------------------------------------
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

const fetchLiteraturesFromPMC = async ({ baseUrl, requestOptions }) =>
  fetch(baseUrl, requestOptions).then(response => response.json());

export const fetchLiteratures = ({
  id,
  threshold = 0.5,
  size = 15,
  query,
  cursor = null,
  category = [],
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

export const fetchSimilarEntities = ({
  id = '',
  threshold = 0.5,
  size = 15,
  query,
  cursor = null,
  category = [],
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

import React, { useEffect } from 'react';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { Table } from '../../../components/Table';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
} from 'recoil';
import {
  _literaturesIdsState,
  _nextCursorState,
  displayedPublications,
  currentPageState,
  publicationsState,
  selectedEntitiesState,
  _literaturesOrderedState,
  _literatureCursorState,
  categoryState,
  categoryListState,
  settingsState,
  fetchLiteratures,
  allPublicationsState,
} from './atoms';

const PublicationsList = ({
  hideSearch = false,
  handleRowsPerPageChange,
  count,
}) => {
  const category = useRecoilValue(categoryState);
  const categories = useRecoilValue(categoryListState);
  const { id, query, entity } = useRecoilValue(settingsState);
  const nextCursor = useRecoilValue(_nextCursorState);
  const cursor = useRecoilValue(_literatureCursorState);
  const displayedPubs = useRecoilValue(displayedPublications);
  const listIds = useRecoilValue(_literaturesIdsState);
  const selectedEntities = useRecoilValue(selectedEntitiesState);
  const publications = useRecoilValue(publicationsState);

  const setAllPubs = useSetRecoilState(allPublicationsState);
  const setNextCursor = useSetRecoilState(_nextCursorState);

  const [orderedIds, setOrderedIds] = useRecoilState(_literaturesOrderedState);
  const [page, setPage] = useRecoilState(currentPageState);

  const syncAllPublications = useRecoilCallback(() => () => {
    if (!listIds) return;
    setAllPubs(oldPubs => [...oldPubs, ...publications]);
  });

  const resetPublicationListState = useRecoilCallback(() => () => {
    if (!listIds) return;
    setPage(0);
    setAllPubs([]);
    setOrderedIds(listIds);
    setNextCursor(cursor);
  });

  useEffect(
    () => {
      syncAllPublications();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publications]
  );

  useEffect(
    () => {
      resetPublicationListState();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listIds, selectedEntitiesState]
  );

  const handlePageChange = useRecoilCallback(() => async newPage => {
    if (5 * newPage + 5 > orderedIds.length && nextCursor !== null) {
      const updatedQuery = await fetchLiteratures({
        id,
        query,
        cursor: nextCursor,
        entities: selectedEntities,
        category,
        categories,
        entity,
      });
      const {
        literatureOcurrences: { rows, cursor },
      } = updatedQuery.data[entity];
      const newLiteratureIds = rows.map(({ pmid }) => pmid);
      setNextCursor(cursor);
      setOrderedIds(oldValue => {
        return [...oldValue, ...newLiteratureIds];
      });
      setPage(newPage);
    } else {
      setPage(newPage);
    }
  });

  const columns = [
    {
      id: 'publications',
      label: ' ',
      renderCell: publication => {
        return <PublicationWrapper {...publication} />;
      },
      filterValue: row =>
        `${row.journal.journal?.title} ${row?.title} ${row?.year}
        ${row.authors
          .reduce((acc, author) => {
            if (author.fullName) acc.push(author.fullName);
            return acc;
          }, [])
          .join(' ')}`,
    },
  ];

  return (
    <Table
      showGlobalFilter={!hideSearch}
      columns={columns}
      rows={displayedPubs}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25]}
      page={page}
      pageSize={5}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default PublicationsList;

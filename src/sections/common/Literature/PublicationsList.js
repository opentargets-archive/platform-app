import React, { useEffect } from 'react';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { getPage, Table } from '../../../components/Table';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
} from 'recoil';
import {
  _literaturesIdsState,
  fetchLiteratures,
  _literatureNextCursorState,
  displayedPublications,
  currentPageState,
  publicationsState,
  cursorState,
  selectedEntitiesState,
  similarEntitiesQuery,
  _literaturesOrderedState,
  literaturesOrderedState,
  categoryState,
  categoryListState,
  settingsState,
} from './atoms';
import { useState } from 'react';

const PublicationsList = ({
  hideSearch = false,
  handleRowsPerPageChange,
  count,
}) => {
  const category = useRecoilValue(categoryState);
  const categories = useRecoilValue(categoryListState);
  const { id, query, entity } = useRecoilValue(settingsState);
  const [nextCursor, setNextCursor] = useRecoilState(
    _literatureNextCursorState
  );
  const displayedPubs = useRecoilValue(displayedPublications);
  const litsIds = useRecoilValue(_literaturesIdsState);
  // const [orderedIds, setOrderedIds] = useRecoilState(_literaturesOrderedState);
  const [localIds, setLocalIds] = useRecoilState(literaturesOrderedState);
  // const setCursor = useRecoilValue(displayedPublications);
  const setCursor = useSetRecoilState(cursorState);

  const [compPage, setCompPage] = useState(0);
  const [compPagePubs, setCompPagePubs] = useState([]);
  const selectedEntities = useRecoilValue(selectedEntitiesState);

  const [page, setPage] = useRecoilState(currentPageState);
  const publications = useRecoilValue(publicationsState);

  useEffect(
    () => {
      const list = page !== 0 ? [...localIds, ...litsIds] : litsIds;
      console.log({ list });
      setLocalIds(list);
      console.log({ litsIds, localIds });
    },
    [litsIds]
  );

  const handlePageChange = useRecoilCallback(
    ({ snapshot, set }) => async newPage => {
      if (5 * newPage + 5 > compPagePubs.length && nextCursor !== null) {
        // const response = await fetchLiteratures({
        //   id,
        //   query,
        //   cursor: nextCursor,
        //   entities: selectedEntities,
        //   category,
        //   categories,
        //   entity,
        // });
        // const data = response.data[entity];
        // const {
        //   literatureOcurrences: { rows, cursor },
        // } = data;
        setCursor(nextCursor);
        // const newLiteratureIds = rows.map(({ pmid }) => pmid);

        // const currentLits = snapshot.getPromise(_literaturesIdsState);

        // console.log({ currentLits, newLiteratureIds });

        setPage(newPage);
      } else {
        setPage(newPage);
      }
      // pre-fetch user info
      // set(currentUserIDState, userID); // change current user to start new render
    }
  );

  const _handlePageChange = newPage => {
    if (5 * newPage + 5 > compPagePubs.length && nextCursor !== null) {
      setCursor(nextCursor);
      setPage(newPage);
    } else {
      setPage(newPage);
    }
  };

  useEffect(
    () => {
      setCompPagePubs([]);
      setPage(0);
      return () => {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedEntities]
  );

  // useEffect(
  //   () => {
  //     if (page !== compPage) {
  //       setCompPage(page);
  //     }
  //     return () => {};
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [page]
  // );

  useEffect(
    () => {
      const all = [...compPagePubs, ...publications];
      setCompPagePubs(all);
      return () => {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publications]
  );

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

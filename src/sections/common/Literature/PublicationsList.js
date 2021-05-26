import React, { useEffect } from 'react';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { getPage, Table } from '../../../components/Table';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  literaturesIdsState,
  currentPageState,
  publicationsState,
  cursorState,
} from './atoms';
import { useState } from 'react';

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

const PublicationsList = ({
  hideSearch = false,
  handleRowsPerPageChange,
  count,
  newCursor = null,
  loading: parentLoading,
}) => {
  const literaturesIds = useRecoilValue(literaturesIdsState);
  const setCursor = useSetRecoilState(cursorState);

  const [compPage, setCompPage] = useState(0);
  const [compPagePubs, setCompPagePubs] = useState([]);

  const [page, setPage] = useRecoilState(currentPageState);
  const publications = useRecoilValue(publicationsState);

  const _handlePageChange = newPage => {
    if (5 * newPage + 5 > compPagePubs.length && newCursor !== null) {
      setCursor(newCursor);
      setPage(newPage);
      setCompPage(newPage);
    } else {
      setCompPage(newPage);
    }
  };

  useEffect(
    () => {
      if (page !== compPage) {
        setCompPage(page);
      }
      return () => {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

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

  const parsedPublications = parsePublications(compPagePubs);

  const rows =
    literaturesIds.length === compPagePubs.length || compPage === 0
      ? getPage(parsedPublications, compPage, 5)
      : getPage(parsedPublications, compPage - 1, 5);

  return (
    <Table
      showGlobalFilter={!hideSearch}
      loading={parentLoading}
      columns={columns}
      rows={rows}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25]}
      page={compPage}
      pageSize={5}
      onPageChange={_handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default PublicationsList;

import React, { useState, useEffect } from 'react';
import { europePmcSearchPOSTQuery } from '../../../utils/urls';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { getPage, Table } from '../../../components/Table';

const parsedPublications = publications =>
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
  handlePageChange,
  handleRowsPerPageChange,
  entriesIds,
  pageSize,
  page,
  count,
  loading: parentLoading,
}) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const ids =
        page === 0 ? entriesIds : entriesIds.slice(pageSize * page + pageSize);
      const { baseUrl, formBody } = europePmcSearchPOSTQuery(ids);
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      };
      fetch(baseUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (page === 0) {
            setPublications(parsedPublications(data.resultList.result));
          } else {
            setPublications([
              ...publications,
              ...parsedPublications(data.resultList.result),
            ]);
          }
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entriesIds]
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

  const rows =
    entriesIds.length === publications.length || page === 0
      ? getPage(publications, page, pageSize)
      : getPage(publications, page - 1, pageSize);
  return (
    <Table
      showGlobalFilter={!hideSearch}
      loading={parentLoading || loading}
      columns={columns}
      rows={rows}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25, 100]}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default PublicationsList;

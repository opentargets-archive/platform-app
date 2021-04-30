import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { europePmcBiblioSearchPOSTQuery } from '../../../utils/urls';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { getPage, Table } from '../../../components/Table';

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
      const ids = page === 0 ? entriesIds : entriesIds.slice(pageSize * page);
      const { baseUrl, formBody } = europePmcBiblioSearchPOSTQuery(ids);
      setLoading(true);

      if (page === 0) {
        setPublications([]);
      }

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
          const all = [...publications, ...data.resultList.result];
          const mapedResults = new Map(all.map(key => [key.pmid, key]));
          const ordered = entriesIds.reduce((acc, key) => {
            const pub = mapedResults.get(key);
            if (pub) acc.push(pub);
            return acc;
          }, []);
          setPublications(ordered);
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

  const parsedPublications = parsePublications(publications);

  const rows =
    entriesIds.length === publications.length || page === 0
      ? getPage(parsedPublications, page, pageSize)
      : getPage(parsedPublications, page - 1, pageSize);
  return page === 0 && (parentLoading || loading) ? (
    <Loader />
  ) : (
    <Table
      showGlobalFilter={!hideSearch}
      loading={parentLoading || loading}
      columns={columns}
      rows={rows}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25]}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

const Loader = () => (
  <Box
    my={20}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <CircularProgress size={60} />
    <Box mt={6}>
      <Typography className={listComponetStyles.AccordionSubtitle}>
        Loading Europe PMC search results
      </Typography>
    </Box>
  </Box>
);

const listComponetStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default PublicationsList;

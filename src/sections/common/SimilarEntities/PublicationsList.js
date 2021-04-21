import React, { useState, useEffect } from 'react';
import {
  Box,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { europePmcSearchPOSTQuery } from '../../../utils/urls';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { getPage, Table } from '../../../components/Table';

const listComponetStyles = makeStyles(theme => ({
  AccordionSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
}));

const PublicationsList = ({
  entriesIds,
  hideSearch = false,
  pageSize,
  handlePageChange,
  page,
  count,
}) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const { baseUrl, formBody } = europePmcSearchPOSTQuery(entriesIds);
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
          setLoading(false);
          setPublications(data.resultList.result);
        });
    },
    [entriesIds]
  );

  if (loading)
    return (
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

  const parsedPublications = publications.map(pub => {
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
      columns={columns}
      rows={getPage(parsedPublications, page, pageSize)}
      showGlobalFilter={!hideSearch}
      rowsPerPageOptions={[5, 10, 25, 100]}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      rowCount={count}
    />
  );
};

export default PublicationsList;

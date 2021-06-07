import React, { useState, useEffect } from 'react';
import PublicationsList from './PublicationsList';
import { makeStyles, Box, Typography } from '@material-ui/core';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentPageState,
  _literaturesIdsState,
  _literaturesCountState,
  settingsState,
} from './atoms';
import Loader from './Loader';
import Entities from './Entities';
import Category from './Category';

const useStyles = makeStyles(theme => ({
  categoryAutocomplete: {
    width: '20em',
    marginLeft: '20px',
    '& .MuiFormControl-root': { marginTop: 0 },
  },
  filterCategoryContainer: { display: 'flex' },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  AccordionSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  resultCount: {
    marginLeft: '2rem',
  },
}));

const INIT_PAGE_SIZE = 5;

function LiteratureList({ id, name, entity, BODY_QUERY }) {
  const classes = useStyles();
  const [pageSize] = useState(INIT_PAGE_SIZE);
  const page = useRecoilValue(currentPageState);
  // const [cursor, setCursor] = useRecoilState(cursorState);

  const count = useRecoilValue(_literaturesCountState);
  const literaturesIds = useRecoilValue(_literaturesIdsState);

  const setSettings = useSetRecoilState(settingsState);

  useEffect(
    () => {
      // const newCursor = data[entity].literatureOcurrences.cursor || null;
      // const { literatureOcurrences, similarEntities } = data[entity];
      // setCount(literatureOcurrences.count);
      // setNewCursor(newCursor);
      // setLiteraturesIds(literatureOcurrences?.rows?.map(({ pmid }) => pmid));
      // setEntities(similarEntities);
      setSettings({ id, query: BODY_QUERY, entity });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRowsPerPageChange = newPageSize => {
    // if (newPageSize > literaturesIds.length && cursor !== null) {
    //   fetchLiteratures(cursor).then(res => {
    //     const { cursor: newCursor } = res.data[entity].literatureOcurrences;
    //     setCursor(newCursor);
    //     setPageSize(newPageSize);
    //     setPage(0);
    //   });
    // } else {
    //   setPage(0);
    //   setPageSize(newPageSize);
    // }
  };

  return (
    <div>
      <Box className={classes.controlsContainer}>
        <Category />
        <Typography variant="body2" className={classes.resultCount}>
          Showing {count > pageSize ? pageSize : count} of {count} results
        </Typography>
      </Box>
      <Entities id={id} name={name} />
      <div>
        <React.Suspense
          fallback={<Loader message="Loading Europe PMC search results" />}
        >
          <PublicationsList
            hideSearch
            handleRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            count={count}
          />
        </React.Suspense>
        {literaturesIds.length === 0 && (
          <Box
            my={20}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box mt={6}>
              <Typography className={classes.AccordionSubtitle}>
                No results for the query
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}

function Body({ definition, name, id, entity, BODY_QUERY }) {
  return (
    <SectionItem
      definition={definition}
      request={{ loading: false, error: null, data: true }}
      renderDescription={() => <Description name={name} />}
      renderBody={() => {
        return (
          <React.Suspense
            fallback={
              <Loader message="Loading similar entities search results" />
            }
          >
            <LiteratureList
              id={id}
              name={name}
              entity={entity}
              BODY_QUERY={BODY_QUERY}
            />
          </React.Suspense>
        );
      }}
    />
  );
}

export default Body;

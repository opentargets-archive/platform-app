import React, { useState, useEffect } from 'react';
import PublicationsList from './PublicationsList';
import { Autocomplete } from '@material-ui/lab';
import {
  Chip,
  makeStyles,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  fetchLiteratures,
  cursorState,
  currentPageState,
  literaturesIdsState,
  entitiesState,
  selectedEntitiesState,
  loadindEntitiesState,
  categoryState,
  similarEntitiesQuery,
} from './atoms';
import Loader from './Loader';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'target', label: 'Target' },
  { value: 'disease', label: 'Disease' },
  { value: 'drug', label: 'Drug' },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
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
  const [initialLoading, setInitialLoading] = useState(true);
  const [newCursor, setNewCursor] = useState(null);
  const [loading, setLoading] = useRecoilState(loadindEntitiesState);

  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE);

  const [category, setCategory] = useRecoilState(categoryState);

  const [page, setPage] = useRecoilState(currentPageState);
  const [cursor, setCursor] = useRecoilState(cursorState);

  const [selectedChips, setSelectedChips] = useRecoilState(
    selectedEntitiesState
  );
  const [entities, setEntities] = useRecoilState(entitiesState);

  const [literaturesIds, setLiteraturesIds] = useRecoilState(
    literaturesIdsState
  );

  const data = useRecoilValue(
    similarEntitiesQuery({ id, query: BODY_QUERY, cursor })
  );

  useEffect(
    () => {
      setLoading(true);
      const newCursor = data[entity].literatureOcurrences.cursor || null;
      const { literatureOcurrences, similarEntities } = data[entity];
      setCount(literatureOcurrences.count);
      setInitialLoading(false);
      setLoading(false);
      setNewCursor(newCursor);
      setLiteraturesIds(literatureOcurrences?.rows?.map(({ pmid }) => pmid));
      setEntities(similarEntities);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const handleSetCategory = (e, selection) => {
    setLoading(true);
    setCategory(selection);
  };

  // const handleAddChip = e => {
  //   const newChimps = [
  //     ...selectedChips,
  //     {
  //       score: e.score,
  //       object: {
  //         name: e.object.name || e.object.approvedSymbol,
  //         id: e.object.id,
  //       },
  //     },
  //   ];
  //   setLoading(true);
  //   setCursor(null);
  //   setSelectedChips(newChimps);
  //   setPage(0);
  // };

  const handleDeleteChip = index => {
    const newChips = [
      ...selectedChips.slice(0, index),
      ...selectedChips.slice(index + 1),
    ];
    setLoading(true);
    setCursor(null);
    setSelectedChips(newChips);
  };

  const handleRowsPerPageChange = newPageSize => {
    if (newPageSize > literaturesIds.length && cursor !== null) {
      setLoading(true);
      fetchLiteratures(cursor).then(res => {
        const { cursor: newCursor } = res.data[entity].literatureOcurrences;
        setCursor(newCursor);
        setPageSize(newPageSize);
        setPage(0);
        // setRows([...rows, ...newRows?.map(({ pmid }) => pmid)]);
        setLoading(false);
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  };

  return (
    <>
      <Box className={classes.controlsContainer}>
        <Box className={classes.filterCategoryContainer}>
          <Typography>Tag category:</Typography>
          <Autocomplete
            classes={{ root: classes.categoryAutocomplete }}
            disableClearable
            getOptionLabel={option => option.label}
            getOptionSelected={option => option.value}
            onChange={handleSetCategory}
            options={categories}
            renderInput={params => <TextField {...params} margin="normal" />}
            value={category}
          />
        </Box>
        {!initialLoading && (
          <Typography variant="body2" className={classes.resultCount}>
            Showing {count > pageSize ? pageSize : count} of {count} results
          </Typography>
        )}
      </Box>

      <div className={classes.root}>
        <Chip label={name} title={`ID: ${id}`} color="primary" />
        {selectedChips.map((e, i) => (
          <Chip
            label={e.object.name}
            key={e.object.id}
            title={`Score: ${e.score} ID: ${e.object.id}`}
            color="primary"
            clickable
            onClick={() => {
              handleDeleteChip(i);
            }}
            onDelete={() => {
              handleDeleteChip(i);
            }}
          />
        ))}
      </div>
      <div className={classes.root}>
        {/* API response chips: remove those already selected and the page entity */}
        {!initialLoading &&
          entities.map(e => {
            return id === e.object.id ||
              selectedChips.find(s => s.object.id === e.object.id) ? null : (
              <Chip
                label={e.object.name || e.object.approvedSymbol}
                key={e.object.id}
                disabled={literaturesIds.length === 0 || loading}
                clickable
                onClick={() => {
                  const newChimps = [
                    ...selectedChips,
                    {
                      score: e.score,
                      object: {
                        name: e.object.name || e.object.approvedSymbol,
                        id: e.object.id,
                      },
                    },
                  ];
                  setLoading(true);
                  setCursor(null);
                  setSelectedChips(newChimps);
                  setPage(0);
                }}
                title={`Score: ${e.score} ID: ${e.object.id}`}
                color="primary"
                variant="outlined"
              />
            );
          })}
      </div>
      <div>
        <React.Suspense
          fallback={<Loader message="Loading Europe PMC search results" />}
        >
          <PublicationsList
            hideSearch
            // handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            count={count}
            newCursor={newCursor}
          />
        </React.Suspense>
        {!initialLoading && literaturesIds.length === 0 && (
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
    </>
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

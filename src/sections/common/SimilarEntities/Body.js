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
import client from '../../../client';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';

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
  const [loading, setLoading] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [rows, setRows] = useState([]);
  const [entities, setEntities] = useState([]);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(categories[0]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE);

  const threshold = 0.5;
  const size = 15;

  const fetchLiteratures = (cursor = null) => {
    return client.query({
      query: BODY_QUERY,
      variables: {
        cursor,
        id,
        ids: selectedChips.map(c => c.object.id),
        threshold,
        size,
        entityNames: category === categories[0] ? null : [category.value],
      },
    });
  };

  useEffect(
    () => {
      fetchLiteratures(cursor).then(res => {
        const newCursor = res.data[entity].literatureOcurrences.cursor || null;
        const { literatureOcurrences, similarEntities } = res.data[entity];
        setCount(literatureOcurrences.count);
        setInitialLoading(false);
        setLoading(false);
        setCursor(newCursor);
        setPage(0);
        setRows(literatureOcurrences?.rows?.map(({ pmid }) => pmid));
        setEntities(similarEntities);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedChips]
  );

  useEffect(
    () => {
      let isCurrent = true;
      fetchLiteratures().then(res => {
        if (isCurrent) {
          const { similarEntities } = res.data[entity];
          setEntities(similarEntities);
          setLoading(false);
        }
      });
      return () => {
        isCurrent = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category]
  );

  const handleSetCategory = (e, selection) => {
    setLoading(true);
    setCategory(selection);
  };

  const handleDeleteChip = index => {
    const newChips = [
      ...selectedChips.slice(0, index),
      ...selectedChips.slice(index + 1),
    ];
    setLoading(true);
    setCursor(null);
    setSelectedChips(newChips);
  };

  const handlePageChange = newPage => {
    if (pageSize * newPage + pageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchLiteratures(cursor).then(res => {
        const { cursor: newCursor, rows: newRows } = res.data[
          entity
        ].literatureOcurrences;
        setCursor(newCursor);
        setPage(newPage);
        setRows([...rows, ...newRows?.map(({ pmid }) => pmid)]);
        setLoading(false);
      });
    } else {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = newPageSize => {
    if (newPageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchLiteratures(cursor).then(res => {
        const { cursor: newCursor, rows: newRows } = res.data[
          entity
        ].literatureOcurrences;
        setCursor(newCursor);
        setPage(0);
        setRows([...rows, ...newRows?.map(({ pmid }) => pmid)]);
        setPageSize(newPageSize);
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
            Showing {count > 5 ? 5 : count} of {count} results
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
                disabled={rows.length === 0 || loading}
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
                }}
                title={`Score: ${e.score} ID: ${e.object.id}`}
                color="primary"
                variant="outlined"
              />
            );
          })}
      </div>
      <div>
        {!initialLoading && rows.length > 0 && (
          <PublicationsList
            hideSearch
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            entriesIds={rows}
            pageSize={pageSize}
            page={page}
            count={count}
            loading={loading}
          />
        )}
        {!initialLoading && rows.length === 0 && (
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
          <>
            <LiteratureList
              id={id}
              name={name}
              entity={entity}
              BODY_QUERY={BODY_QUERY}
            />
          </>
        );
      }}
    />
  );
}

export default Body;

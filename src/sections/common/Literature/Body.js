import React, { Suspense, useState, useEffect } from 'react';
import PublicationsList from './PublicationsList';
import { makeStyles, Box, Typography } from '@material-ui/core';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { _literaturesCountState, settingsState } from './atoms';
import Loader from './Loader';
import Entities from './Entities';
import Category from './Category';
import TimeTravelObserver from './TimeTravelObserver';

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
    marginRight: '6rem',
  },
}));

const INIT_PAGE_SIZE = 5;

function CountInfo() {
  const classes = useStyles();
  const [pageSize] = useState(INIT_PAGE_SIZE);
  const count = useRecoilValue(_literaturesCountState);
  return (
    <Typography variant="body2" className={classes.resultCount}>
      Showing {count > pageSize ? pageSize : count} of {count} results
    </Typography>
  );
}

function LiteratureList({ id, name, entity, BODY_QUERY }) {
  const classes = useStyles();
  // const literaturesIds = useRecoilValue(_literaturesIdsState);

  const setSettings = useSetRecoilState(settingsState);

  useEffect(
    () => {
      setSettings({ id, query: BODY_QUERY, entity });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <Box className={classes.controlsContainer}>
        <Category />
        <Suspense
          fallback={<div className={classes.resultCount}>Loading count...</div>}
        >
          <CountInfo />
        </Suspense>
        <TimeTravelObserver />
      </Box>

      <Entities id={id} name={name} />

      <div>
        <Suspense
          fallback={<Loader message="Loading Europe PMC search results" />}
        >
          <PublicationsList hideSearch handleRowsPerPageChange={() => {}} />
        </Suspense>
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
          <LiteratureList
            id={id}
            name={name}
            entity={entity}
            BODY_QUERY={BODY_QUERY}
          />
        );
      }}
    />
  );
}

export default Body;

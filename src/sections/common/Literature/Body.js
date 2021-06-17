import React, { useState, useEffect } from 'react';
import PublicationsList from './PublicationsList';
import { makeStyles, Box, Typography } from '@material-ui/core';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  literatureState,
  updateLiteratureState,
  fetchSimilarEntities,
  litsCountState,
  loadingEntitiesState,
} from './atoms';
import Loader from './Loader';
import Entities from './Entities';
import Category from './Category';
// import TimeTravelObserver from './TimeTravelObserver';

const useStyles = makeStyles(() => ({
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
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
  const countLoadable = useRecoilValue(litsCountState);
  const loadingEntities = useRecoilValue(loadingEntitiesState);

  if (loadingEntities)
    return <div className={classes.resultCount}>Loading count...</div>;

  return (
    <Typography variant="body2" className={classes.resultCount}>
      Showing {countLoadable > pageSize ? pageSize : countLoadable} of{' '}
      {countLoadable} results
    </Typography>
  );
}

function LiteratureList({ id, name, entity, BODY_QUERY }) {
  const classes = useStyles();

  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const resetLiteratureState = useResetRecoilState(literatureState);

  const bibliographyState = useRecoilValue(literatureState);
  const { category } = bibliographyState;

  useEffect(
    () => {
      async function startRequest() {
        const inintRequest = await fetchSimilarEntities({
          id,
          query: BODY_QUERY,
          category,
        });
        const data = inintRequest.data[entity];
        const update = {
          entities: data.similarEntities,
          litsIds: data.literatureOcurrences?.rows?.map(({ pmid }) => ({
            id: pmid,
            status: 'ready',
            publication: null,
          })),
          litsCount: data.literatureOcurrences?.count,
          cursor: data.literatureOcurrences?.cursor,
          id,
          query: BODY_QUERY,
          globalEntity: entity,
        };
        setLiteratureUpdate(update);
      }
      startRequest();
      return function cleanUp() {
        resetLiteratureState();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <Box className={classes.controlsContainer}>
        <Category />
        <CountInfo />
        {/* <TimeTravelObserver /> */}
      </Box>

      <Entities id={id} name={name} />

      <div>
        <React.Suspense
          fallback={<Loader message="Loading Europe PMC search results" />}
        >
          <PublicationsList hideSearch handleRowsPerPageChange={() => {}} />
        </React.Suspense>
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

import React, { useEffect } from 'react';
import PublicationWrapper from '../../../components/PublicationsDrawer/PublicationWrapper';
import { Table } from '../../../components/Table';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
} from 'recoil';
import Loader from './Loader';
import { Box, Grid, makeStyles, Fade } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import {
  litsIdsState,
  loadingEntitiesState,
  displayedPublications,
  literaturesEuropePMCQuery,
  parsePublications,
  tablePageState,
  litsCountState,
  litsCursorState,
  literatureState,
  fetchSimilarEntities,
  updateLiteratureState,
  tablePageSizeState,
} from './atoms';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
  },
}));

const PublicationsList = ({ hideSearch = false }) => {
  const classes = useStyles();
  const lits = useRecoilValue(litsIdsState);
  const [loadingEntities, setLoadingEntities] = useRecoilState(
    loadingEntitiesState
  );
  const count = useRecoilValue(litsCountState);
  const cursor = useRecoilValue(litsCursorState);
  const displayedPubs = useRecoilValue(displayedPublications);
  const bibliographyState = useRecoilValue(literatureState);
  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const page = useRecoilValue(tablePageState);
  const pageSize = useRecoilValue(tablePageSizeState);

  // function to request 'ready' literatures ids
  const syncLiteraturesState = useRecoilCallback(
    ({ snapshot, set }) => async () => {
      const lits = await snapshot.getPromise(litsIdsState);
      const readyForRequest = lits
        .filter(x => x.status === 'ready')
        .map(x => x.id);

      if (readyForRequest.length === 0) return;
      const queryResult = await snapshot.getPromise(
        literaturesEuropePMCQuery({
          literaturesIds: readyForRequest,
        })
      );

      const parsedPublications = parsePublications(queryResult);

      const mapedResults = new Map(
        parsedPublications.map(key => [key.europePmcId, key])
      );

      const updatedPublications = lits.map(x => {
        const publication = mapedResults.get(x.id);
        if (x.status === 'loaded') return x;
        const status = publication ? 'loaded' : 'missing';
        return { ...x, status, publication };
      });
      set(litsIdsState, updatedPublications);
    }
  );

  useEffect(
    () => {
      if (lits.length !== 0) syncLiteraturesState();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lits]
  );

  const handleRowsPerPageChange = useRecoilCallback(
    ({ snapshot }) => async newPageSize => {
      const expected = newPageSize * page + newPageSize;
      if (expected > lits.length && cursor !== null) {
        const {
          query,
          id,
          category,
          selectedEntities,
          cursor,
          globalEntity,
        } = bibliographyState;
        setLoadingEntities(true);
        const request = await fetchSimilarEntities({
          query,
          id,
          category,
          entities: selectedEntities,
          cursor,
        });
        setLoadingEntities(false);
        const data = request.data[globalEntity];
        const loadedPublications = await snapshot.getPromise(litsIdsState);
        const newLits = data.literatureOcurrences?.rows?.map(({ pmid }) => ({
          id: pmid,
          status: 'ready',
          publication: null,
        }));
        const update = {
          litsIds: [...loadedPublications, ...newLits],
          cursor: data.literatureOcurrences?.cursor,
          page: 0,
          pageSize: newPageSize,
        };
        setLiteratureUpdate(update);
      } else {
        setLiteratureUpdate({ pageSize: newPageSize });
      }
    }
  );

  const handlePageChange = useRecoilCallback(
    ({ snapshot }) => async newPage => {
      if (pageSize * newPage + pageSize > lits.length && cursor !== null) {
        const {
          query,
          id,
          category,
          selectedEntities,
          cursor,
          globalEntity,
        } = bibliographyState;
        setLoadingEntities(true);
        const request = await fetchSimilarEntities({
          query,
          id,
          category,
          entities: selectedEntities,
          cursor,
        });
        setLoadingEntities(false);
        const data = request.data[globalEntity];
        const loadedPublications = await snapshot.getPromise(litsIdsState);
        const newLits = data.literatureOcurrences?.rows?.map(({ pmid }) => ({
          id: pmid,
          status: 'ready',
          publication: null,
        }));
        const update = {
          litsIds: [...loadedPublications, ...newLits],
          cursor: data.literatureOcurrences?.cursor,
          page: newPage,
        };
        setLiteratureUpdate(update);
      } else {
        setLiteratureUpdate({ page: newPage });
      }
    }
  );

  const columns = [
    {
      id: 'publications',
      label: ' ',
      renderCell: ({ publication, status }) => {
        if (status === 'ready') return <SkeletonRow />;
        if (status === 'missing') return null;
        return <PublicationWrapper {...publication} />;
      },
      filterValue: ({ row: publication }) =>
        `${publication.journal.journal?.title} ${publication?.title} ${
          publication?.year
        }
        ${publication.authors
          .reduce((acc, author) => {
            if (author.fullName) acc.push(author.fullName);
            return acc;
          }, [])
          .join(' ')}`,
    },
  ];

  if (loadingEntities)
    return (
      <Loader
        pageSize={pageSize}
        message="Loading literature ocurrences results"
      />
    );

  return (
    <Table
      classes={classes}
      showGlobalFilter={!hideSearch}
      columns={columns}
      rows={displayedPubs}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25]}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

const SkeletonRow = () => {
  return (
    <Fade in>
      <Box mb={2}>
        <Skeleton height={60} />
        {/* <Box pt="1px"> */}
        <Skeleton width="60%" height={45} />
        {/* </Box> */}
        <Grid container wrap="nowrap">
          <Box width={130} mr={1}>
            <Skeleton height={45} />
          </Box>
          <Box width={130}>
            <Skeleton height={45} />
          </Box>
        </Grid>
      </Box>
    </Fade>
  );
};

export default PublicationsList;

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
import { Box, Grid } from '@material-ui/core';
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
} from './atoms';

const PublicationsList = ({ hideSearch = false, handleRowsPerPageChange }) => {
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

  const handlePageChange = useRecoilCallback(
    ({ set, snapshot }) => async newPage => {
      if (5 * newPage + 5 > lits.length && cursor !== null) {
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
        set(tablePageState, newPage);
      }
    }
  );

  const columns = [
    {
      id: 'publications',
      label: ' ',
      renderCell: ({ id, publication, status }) => {
        if (status === 'ready') return <SkeletonRow />;
        if (status === 'missing') return <div>{id} Missing</div>;
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
    return <Loader message="Loading literature ocurrences results" />;

  return (
    <Table
      showGlobalFilter={!hideSearch}
      columns={columns}
      rows={displayedPubs}
      rowCount={count}
      rowsPerPageOptions={[5, 10, 25]}
      page={page}
      pageSize={5}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

const SkeletonRow = () => {
  return (
    <div>
      <Skeleton height={45} />
      <Box pt={0.5}>
        <Skeleton width="60%" height={30} />
      </Box>
      <Grid container wrap="nowrap">
        <Box width={130} mr={1}>
          <Skeleton height={30} />
        </Box>
        <Box width={130}>
          <Skeleton height={30} />
        </Box>
      </Grid>
    </div>
  );
};

export default PublicationsList;

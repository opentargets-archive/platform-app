import React from 'react';
import { Chip, makeStyles, Grow } from '@material-ui/core';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  entitiesState,
  selectedEntitiesState,
  fetchSimilarEntities,
  literatureState,
  loadingEntitiesState,
  updateLiteratureState,
} from './atoms';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  loadingContainer: {
    display: 'flex',
    margin: '10px',
  },
}));

function EntitiesToSelect({ id }) {
  const entities = useRecoilValue(entitiesState);
  const bibliographyState = useRecoilValue(literatureState);
  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const [selectedChips, setSelectedChips] = useRecoilState(
    selectedEntitiesState
  );
  const [loadingEntities, setLoadingEntities] = useRecoilState(
    loadingEntitiesState
  );

  const handleSelectChip = async e => {
    const { query, id, category, globalEntity } = bibliographyState;
    const newChips = [
      ...selectedChips,
      {
        score: e.score,
        object: {
          name: e.object.name || e.object.approvedSymbol,
          id: e.object.id,
        },
      },
    ];
    setSelectedChips(newChips);
    setLoadingEntities(true);
    const request = await fetchSimilarEntities({
      query,
      id,
      category,
      entities: newChips,
    });
    const data = request.data[globalEntity];
    const update = {
      entities: data.similarEntities,
      litsIds: data.literatureOcurrences?.rows?.map(({ pmid }) => ({
        id: pmid,
        status: 'ready',
        publication: null,
      })),
      litsCount: data.literatureOcurrences?.count,
      cursor: data.literatureOcurrences?.cursor,
      loadingEntities: false,
      page: 0,
    };
    setLiteratureUpdate(update);
  };

  const validateEntity = entity => {
    if (id === entity.object?.id) return null;
    if (selectedChips.find(s => s.object.id === entity.object.id)) return null;
    return entity;
  };

  return entities.map((e, i) => {
    if (!e.object)
      return (
        <Grow in key={`empty-entity-${i}`}>
          <Chip
            style={{ opacity: loadingEntities ? 0.5 : 1 }}
            label={e.id}
            disabled={true}
            title="Missing object entity"
            color="secondary"
            variant="outlined"
          />
        </Grow>
      );
    return validateEntity(e) ? (
      <Grow in key={e.object.id}>
        <Chip
          style={{ opacity: loadingEntities ? 0.5 : 1 }}
          label={e.object.name || e.object.approvedSymbol}
          disabled={loadingEntities}
          clickable
          onClick={() => {
            handleSelectChip(e);
          }}
          title={`Score: ${e.score} ID: ${e.object.id}`}
          color="primary"
          variant="outlined"
        />
      </Grow>
    ) : null;
  });
}

export default function Entities({ name, id }) {
  const classes = useStyles();

  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const bibliographyState = useRecoilValue(literatureState);
  const [loadingEntities, setLoadingEntities] = useRecoilState(
    loadingEntitiesState
  );
  const [selectedChips, setSelectedChips] = useRecoilState(
    selectedEntitiesState
  );

  const handleDeleteChip = async index => {
    const { query, id, category, globalEntity } = bibliographyState;
    const newChips = [
      ...selectedChips.slice(0, index),
      ...selectedChips.slice(index + 1),
    ];
    setSelectedChips(newChips);
    setLoadingEntities(true);
    const request = await fetchSimilarEntities({
      query,
      id,
      category,
      entities: newChips,
    });
    const data = request.data[globalEntity];
    const update = {
      entities: data.similarEntities,
      litsIds: data.literatureOcurrences?.rows?.map(({ pmid }) => ({
        id: pmid,
        status: 'ready',
        publication: null,
      })),
      litsCount: data.literatureOcurrences?.count,
      cursor: data.literatureOcurrences?.cursor,
      loadingEntities: false,
      page: 0,
    };
    setLiteratureUpdate(update);
  };

  return (
    <div>
      <div className={classes.root}>
        <Chip label={name} title={`ID: ${id}`} color="primary" />
        {selectedChips.map((e, i) => (
          <Grow in key={e.object.id}>
            <Chip
              label={e.object.name}
              title={`Score: ${e.score} ID: ${e.object.id}`}
              color="primary"
              clickable
              disabled={loadingEntities}
              onClick={() => {
                handleDeleteChip(i);
              }}
              onDelete={() => {
                handleDeleteChip(i);
              }}
            />
          </Grow>
        ))}
      </div>
      <div className={classes.root}>
        <EntitiesToSelect id={id} />
      </div>
    </div>
  );
}

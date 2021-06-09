import React, { useEffect } from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
} from 'recoil';
import {
  _entitiesState,
  selectedEntitiesState,
  cursorState,
  currentPageState,
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

function SelectedEntities({ id }) {
  const classes = useStyles();
  const entitiesLoadable = useRecoilValueLoadable(_entitiesState);
  const [selectedChips, setSelectedChips] = useRecoilState(
    selectedEntitiesState
  );
  const setCursor = useSetRecoilState(cursorState);
  const setPage = useSetRecoilState(currentPageState);
  const { state, contents } = entitiesLoadable;

  const handleSelectChip = e => {
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
    setCursor(null);
    setSelectedChips(newChimps);
    setPage(0);
  };

  useEffect(() => {
    return function cleanup() {
      setCursor(null);
      setSelectedChips([]);
      setPage(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'loading')
    return (
      <div className={classes.loadingContainer}>
        Loading similar entities search results ...
      </div>
    );

  return contents.map(e => {
    return id === e.object.id ||
      selectedChips.find(s => s.object.id === e.object.id) ? null : (
      <Chip
        label={e.object.name || e.object.approvedSymbol}
        key={e.object.id}
        disabled={false}
        clickable
        onClick={() => {
          handleSelectChip(e);
        }}
        title={`Score: ${e.score} ID: ${e.object.id}`}
        color="primary"
        variant="outlined"
      />
    );
  });
}

export default function Entities({ name, id }) {
  const classes = useStyles();

  const [selectedChips, setSelectedChips] = useRecoilState(
    selectedEntitiesState
  );
  const setCursor = useSetRecoilState(cursorState);
  const handleDeleteChip = index => {
    const newChips = [
      ...selectedChips.slice(0, index),
      ...selectedChips.slice(index + 1),
    ];
    setCursor(null);
    setSelectedChips(newChips);
  };

  return (
    <div>
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
        <SelectedEntities id={id} />
      </div>
    </div>
  );
}

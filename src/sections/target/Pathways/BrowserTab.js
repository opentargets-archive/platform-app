import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { scroller, Element } from 'react-scroll';

import ReactomeRenderer from './ReactomeRenderer';

const useStyles = makeStyles(theme => ({
  pathwaysLi: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '.25rem',
  },
  pathwaysUl: {
    listStyle: 'none',
    padding: '0 1rem',
    [theme.breakpoints.only('xl')]: {
      marginLeft: '10%',
      marginRight: '10%',
    },
  },
  pathwaysButton: {
    minWidth: '165px',
  },
  reactomeContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem',
  },
}));

function BrowserTab({ symbol, lowLevelPathways }) {
  const classes = useStyles();
  const [reactomeId, setReactomeId] = useState(lowLevelPathways[0].id);

  const handlePathwayClick = newReactomeId => {
    setReactomeId(newReactomeId);
    scroller.scrollTo('reactome-browser', {
      duration: 500,
      delay: 100,
      smooth: true,
    });
  };

  return (
    <>
      <ul className={classes.pathwaysUl}>
        {lowLevelPathways.map(d => (
          <li key={d.id} className={classes.pathwaysLi}>
            {d.id === reactomeId ? <strong>{d.name}</strong> : d.name}
            <Button
              className={classes.pathwaysButton}
              onClick={() => handlePathwayClick(d.id)}
              color="primary"
              size="small"
              disableElevation
              variant="contained"
            >
              View in browser below
            </Button>
          </li>
        ))}
      </ul>
      <Element name="reactome-browser" className={classes.reactomeContainer}>
        <ReactomeRenderer symbol={symbol} reactomeId={reactomeId} />
      </Element>
    </>
  );
}

export default BrowserTab;

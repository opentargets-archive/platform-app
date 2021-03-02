import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import {
  Box,
  Chip,
  makeStyles,
  Slider,
  TextField,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import Description from './Description';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const SIMILARENTITIES_BODY_QUERY = gql`
  query SimilarEntitiesQuery(
    $chemblId: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
  ) {
    drug(chemblId: $chemblId) {
      id
      name

      similarW2VEntities(
        additionalIds: $ids
        threshold: $threshold
        size: $size
      ) {
        score
        object {
          ... on Target {
            id
            approvedSymbol
          }
          ... on Drug {
            id
            name
          }
          ... on Disease {
            id
            name
          }
        }
      }
    }
  }
`;

function Body({ definition, label: name, id: chemblId }) {
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState([]);

  // TODO: these are for development testing only and won't be needed in final version
  const [threshold, setThreshold] = useState(0.5);
  const [size, setSize] = useState(15);
  let th = 0.5;
  let sz = 15;

  const request = useQuery(SIMILARENTITIES_BODY_QUERY, {
    variables: {
      chemblId,
      ids: selectedChips.map(c => c.object.id),
      threshold,
      size,
    },
  });

  const handleSetThreshold = () => {
    setThreshold(parseFloat(th));
  };

  const handleSetSize = () => {
    setSize(parseInt(sz));
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={({ drug: { similarW2VEntities } }) => {
        // process the data
        console.log('DATA: ', similarW2VEntities);

        return (
          <>
            {/* For internal development only: set threshold and size */}
            <div className={classes.root}>
              <form noValidate autoComplete="off">
                <TextField
                  id="threshold-field"
                  label="Threshold"
                  variant="outlined"
                  size="small"
                  defaultValue={threshold}
                  onChange={event => {
                    th = event.target.value;
                  }}
                  style={{ width: '120px' }}
                />{' '}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSetThreshold}
                  size="large"
                >
                  Set
                </Button>
                {'  '}
                <TextField
                  id="size-field"
                  label="Size"
                  variant="outlined"
                  size="small"
                  defaultValue={size}
                  onChange={event => {
                    sz = event.target.value;
                  }}
                  style={{ width: '120px' }}
                />{' '}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSetSize}
                  size="large"
                >
                  Set
                </Button>
              </form>
            </div>
            <hr />

            <div className={classes.root}>
              {/* Non-deselectable page entity (i.e. the target or disease or drug) */}
              <Chip label={name} title={`ID: ${chemblId}`} color="primary" />

              {/* selected chips */}
              {selectedChips.map((e, i) => (
                <Chip
                  label={e.object.name}
                  key={e.object.id}
                  clickable
                  onClick={() => {
                    selectedChips.splice(i, 1);
                    setSelectedChips(selectedChips.map(sc => sc));
                    console.log(selectedChips);
                  }}
                  title={`Score: ${e.score} ID: ${e.object.id}`}
                  color="primary"
                  onDelete={() => {
                    /* just to force the delete icon */
                  }}
                />
              ))}
            </div>
            <div className={classes.root}>
              {/* API response chips: remove those already selected and the page entity */}
              {similarW2VEntities.map((e, i) => {
                return chemblId === e.object.id ||
                  selectedChips.find(
                    s => s.object.id === e.object.id
                  ) ? null : (
                  <Chip
                    label={e.object.name || e.object.approvedSymbol}
                    key={e.object.id}
                    clickable
                    onClick={() => {
                      selectedChips.push({
                        score: e.score,
                        object: {
                          name: e.object.name || e.object.approvedSymbol,
                          id: e.object.id,
                        },
                      });
                      setSelectedChips(selectedChips.map(sc => sc));
                      console.log(selectedChips);
                    }}
                    title={`Score: ${e.score} ID: ${e.object.id}`}
                    color="primary"
                    variant="outlined"
                  />
                );
              })}
            </div>
          </>
        );
      }}
    />
  );
}

export default Body;

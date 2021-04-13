import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { PublicationsList } from '../../../components/PublicationsDrawer';
import {
  Chip,
  makeStyles,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';

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
    $efoId: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
    $entityNames: [String!] = []
  ) {
    disease(efoId: $efoId) {
      id
      name

      similarEntities(
        additionalIds: $ids
        threshold: $threshold
        size: $size
        entityNames: $entityNames
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
      literatureOcurrences(additionalIds: $ids) {
        count
        cursor
        rows {
          pmid
          publicationDate
          ids
          sentences {
            section
            matches {
              mappedId
              matchedLabel
              sectionStart
              sectionEnd
              startInSentence
              endInSentence
            }
          }
          ocurrencesPerId {
            keywordId
            count
          }
        }
      }
    }
  }
`;

function Body({ definition, label: name, id: efoId }) {
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState([]);
  const categories = ['all', 'target', 'disease', 'drug'];
  const [category, setCategory] = useState(categories[0]);

  const [threshold, setThreshold] = useState(0.5);
  const [size, setSize] = useState(15);
  let th = 0.5;
  let sz = 15;

  const request = useQuery(SIMILARENTITIES_BODY_QUERY, {
    variables: {
      efoId,
      ids: selectedChips.map(c => c.object.id),
      threshold,
      size,
      entityNames: category === categories[0] ? null : [category],
    },
  });

  const handleSetThreshold = () => {
    setThreshold(parseFloat(th));
  };

  const handleSetSize = () => {
    setSize(parseInt(sz));
  };

  const handleSetCategory = e => {
    setCategory(e.target.value);
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={({ disease: { similarEntities, literatureOcurrences } }) => {
        const literatureList = literatureOcurrences.rows?.map(
          ({ pmid }) => pmid
        );

        return (
          <>
            {/* For internal development only: set threshold and size */}
            <div className={classes.root}>
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
              {'  '}
              <FormControl>
                <InputLabel id="category-select-label" shrink>
                  Category
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  onChange={handleSetCategory}
                >
                  {categories.map(c => (
                    <MenuItem value={c} key={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <hr />

            <div className={classes.root}>
              {/* Non-deselectable page entity (i.e. the target or disease) */}
              <Chip label={name} title={`ID: ${efoId}`} color="primary" />

              {/* selected chips */}
              {selectedChips.map((e, i) => (
                <Chip
                  label={e.object.name}
                  key={e.object.id}
                  clickable
                  onClick={() => {
                    selectedChips.splice(i, 1);
                    setSelectedChips(selectedChips.map(sc => sc));
                  }}
                  title={`Score: ${e.score} ID: ${e.object.id}`}
                  color="primary"
                  onDelete={() => {
                    selectedChips.splice(i, 1);
                    setSelectedChips(selectedChips.map(sc => sc));
                  }}
                />
              ))}
            </div>
            <div className={classes.root}>
              {/* API response chips: remove those already selected and the page entity */}
              {similarEntities.map((e, i) => {
                return efoId === e.object.id ||
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
            <PublicationsList entriesIds={literatureList} hideSearch />
          </>
        );
      }}
    />
  );
}

export default Body;

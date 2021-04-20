import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { PublicationsList } from '../../../components/PublicationsDrawer';
import { Autocomplete } from '@material-ui/lab';
import { get } from 'lodash';
import { Skeleton } from '@material-ui/lab';
import {
  Chip,
  makeStyles,
  TextField,
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
} from '@material-ui/core';

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
    width: '15rem',
    '& .MuiFormControl-root': { marginTop: 0 },
  },
  AccordionSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
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

const Loader = () => <Box height="700px" />;

function LiteratureList({ efoId, name }) {
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState([]);

  const [category, setCategory] = useState(categories[0]);

  const threshold = 0.5;
  const size = 9;

  const { loading, error, data } = useQuery(SIMILARENTITIES_BODY_QUERY, {
    variables: {
      efoId,
      ids: selectedChips.map(c => c.object.id),
      threshold,
      size,
      entityNames: category === categories[0] ? null : [category.value],
    },
  });

  const handleSetCategory = (e, selection) => {
    setCategory(selection);
  };

  if (error) {
    return <h3>Error</h3>;
  }

  const disease = get(data, 'disease', null);

  const literatureList = disease
    ? disease.literatureOcurrences?.rows?.map(({ pmid }) => pmid)
    : [];

  return (
    <>
      <Box className={classes.filterCategoryContainer}>
        <Typography>Tag category:</Typography>
        {/* Dropdown menu */}
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
      <hr />

      <div className={classes.root}>
        {/* Non-deselectable page entity (i.e. the target or disease) */}
        <Chip label={name} title={`ID: ${efoId}`} color="primary" />

        {/* selected chips */}
        {selectedChips.map((e, i) => (
          <Chip
            label={e.object.name}
            key={e.object.id}
            title={`Score: ${e.score} ID: ${e.object.id}`}
            color="primary"
            onDelete={() => {
              const newChips = [...selectedChips];
              newChips.splice(i, 1);
              setSelectedChips(newChips);
            }}
          />
        ))}
      </div>
      <div className={classes.root}>
        {/* API response chips: remove those already selected and the page entity */}
        {!loading &&
          disease.similarEntities.map(e => {
            return efoId === e.object.id ||
              selectedChips.find(s => s.object.id === e.object.id) ? null : (
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
                }}
                title={`Score: ${e.score} ID: ${e.object.id}`}
                color="primary"
                variant="outlined"
              />
            );
          })}
      </div>
      <div>
        {loading && <Loader />}
        {!loading && (
          <PublicationsList entriesIds={literatureList} hideSearch />
        )}
        {!loading && literatureList.length === 0 && (
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

function Body({ definition, label: name, id: efoId }) {
  return (
    <SectionItem
      definition={definition}
      request={{ loading: false, error: null, data: true }}
      renderDescription={() => <Description name={name} />}
      renderBody={() => {
        return (
          <>
            <LiteratureList efoId={efoId} name={name} />
          </>
        );
      }}
    />
  );
}

export default Body;

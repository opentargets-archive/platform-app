import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import { Box, Chip, makeStyles } from '@material-ui/core';
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
    $efoId: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
  ) {
    disease(efoId: $efoId) {
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

function Body({ definition, label: name, id: efoId }) {
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState([]);
  const request = useQuery(SIMILARENTITIES_BODY_QUERY, {
    variables: {
      efoId,
      ids: selectedChips.map(c => c.object.id),
    },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={({ disease: { similarW2VEntities } }) => {
        // process the data
        console.log('DATA: ', similarW2VEntities);

        return (
          <div className={classes.root}>
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

            {similarW2VEntities.map((e, i) => (
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
            ))}
          </div>
        );
      }}
    />
  );

  //  return (<>Hello world</>);
}

export default Body;

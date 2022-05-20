import React, { lazy } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Typography, List, ListItem, Box } from '@material-ui/core';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Link from '../../../components/Link';
import { identifiersOrgLink, getUniprotIds } from '../../../utils/global';

const SUBCELLULAR_LOCATION_QUERY = loader('./SubcellularLocation.gql');
const SwissbioViz = lazy(() => import('./SwissbioViz'));

const sources = [
  {
    id: 'HPA_main',
    label: 'HPA main location',
  },
  {
    id: 'HPA_additional',
    label: 'HPA additional location',
  },
  {
    id: 'HPA_extracellular_location',
    label: 'HPA extracellular location',
  },
  {
    id: 'uniprot',
    label: 'UniProt',
  },
];

// Remove the 'SL-' from a location termSL (e.g. "SL-0097")
// The sib-swissbiopics component (different from what is documented)
// actually doesn't accept the "SL-" part of the term
const parseLocationTerm = term => term?.substring(3);

// Parse termSL to specific id format used by the text for rollovers
const parseTermToTextId = term => `${term.replace('-', '')}term`;

const LocationsList = ({ title, sls }) => {
  return (
    <>
      {title ? <Typography>{title}</Typography> : null}
      <List>
        {sls.map(({ location, termSL }) => (
          <ListItem key={location} id={parseTermToTextId(termSL)}>
            - {location}
          </ListItem>
        ))}
      </List>
    </>
  );
};

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(SUBCELLULAR_LOCATION_QUERY, {
    variables: { ensemblId },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => {
        const uniprotId = getUniprotIds(target.proteinIds)[0];
        const sourcesLocations = sources.reduce((p, c) => {
          p[c.id] = target.subcellularLocations.filter(
            sl => sl.source === c.id
          );
          return p;
        }, {});
        {
          /* console.log(sourcesLocations); */
        }

        return (
          <>
            <SwissbioViz
              taxonId="9606"
              locationIds={target.subcellularLocations
                .map(s => parseLocationTerm(s.termSL))
                .join()}
            >
              <>
                {sources.map(s => {
                  {
                    /* TODO: this will go in dropdown */
                  }
                  return sourcesLocations[s.id].length > 0 ? (
                    <Box ml={4} key={s.id}>
                      <Typography variant="h6">{s.label}</Typography>
                      Location for{' '}
                      {s.id === 'uniprot' ? (
                        <Link
                          external
                          to={identifiersOrgLink('uniprot', uniprotId)}
                        >
                          {uniprotId}
                        </Link>
                      ) : (
                        <Link
                          external
                          to={identifiersOrgLink('hpa', ensemblId)}
                        >
                          {ensemblId}
                        </Link>
                      )}
                      <LocationsList sls={sourcesLocations[s.id]} />
                    </Box>
                  ) : null;
                })}
              </>
            </SwissbioViz>
          </>
        );
      }}
    />
  );
}

export default Body;

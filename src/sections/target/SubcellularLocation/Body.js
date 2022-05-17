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

// Remove the 'SL-' from a location termSL (e.g. "SL-0097")
// as the sib-swissbiopics component actually don't like the "SL-" part
const parseLocationTerm = term => term?.substring(3);

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(SUBCELLULAR_LOCATION_QUERY, {
    variables: { ensemblId },
  });

  const LocationsList = ({ title, sls }) => {
    return (
      <>
        {title ? <Typography>{title}</Typography> : null}
        <List>
          {sls.map(({ location, termSL }) => (
            <ListItem key={location} id={termSL.split('-').join('') + 'term'}>
              - {location}
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => {
        const uniprotId = getUniprotIds(target.proteinIds)[0];
        const hpaMain = [];
        const hpaAdditional = [];
        const hpaExtracellular = [];
        const uniprot = [];
        target.subcellularLocations.forEach(sl => {
          if (sl.source === 'HPA_main') {
            hpaMain.push(sl);
          }
          if (sl.source === 'HPA_additional') {
            hpaAdditional.push(sl);
          }
          if (sl.source === 'HPA_extracellular_location') {
            hpaExtracellular.push(sl);
          }
          if (sl.source === 'uniprot') {
            uniprot.push(sl);
          }
        });

        return (
          <>
            <SwissbioViz
              taxonId="9606"
              locationIds={target.subcellularLocations
                .map(s => parseLocationTerm(s.termSL))
                .join()}
            >
              {hpaMain.length > 0 ||
              hpaAdditional.length > 0 ||
              hpaExtracellular.length > 0 ? (
                <Box ml={4} mt={2}>
                  <Typography variant="h6">
                    HPA -{' '}
                    <Link external to={identifiersOrgLink('hpa', ensemblId)}>
                      {ensemblId}
                    </Link>
                  </Typography>
                  <Box ml={4} mt={1}>
                    {hpaMain.length > 0 ? (
                      <LocationsList title="HPA (main)" sls={hpaMain} />
                    ) : null}

                    {hpaAdditional.length > 0 ? (
                      <LocationsList
                        title="HPA (additional)"
                        sls={hpaAdditional}
                      />
                    ) : null}
                    {hpaExtracellular.length > 0 ? (
                      <LocationsList
                        title="HPA (extracellular)"
                        sls={hpaExtracellular}
                      />
                    ) : null}
                  </Box>
                </Box>
              ) : null}
              {uniprot.length > 0 ? (
                <Box ml={4}>
                  <Typography variant="h6">
                    UniProt -{' '}
                    <Link
                      external
                      to={identifiersOrgLink('uniprot', uniprotId)}
                    >
                      {uniprotId}
                    </Link>
                  </Typography>
                  <LocationsList sls={uniprot} />
                </Box>
              ) : null}
            </SwissbioViz>
          </>
        );
      }}
    />
  );
}

export default Body;

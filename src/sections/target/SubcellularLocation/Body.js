import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Typography, List, ListItem, Box } from '@material-ui/core';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Link from '../../../components/Link';
import { identifiersOrgLink, getUniprotIds } from '../../../utils/global';

const SUBCELLULAR_LOCATION_QUERY = loader('./SubcellularLocation.gql');

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
        const hpaMain = [];
        const hpaAdditional = [];
        const hpaExtracellular = [];
        const uniprot = [];

        target.subcellularLocations.forEach(({ source, location }) => {
          if (source === 'HPA_main') {
            hpaMain.push(location);
          }
          if (source === 'HPA_additional') {
            hpaAdditional.push(location);
          }
          if (source === 'HPA_extracellular_location') {
            hpaExtracellular.push(location);
          }
          if (source === 'uniprot') {
            uniprot.push(location);
          }
        });

        return (
          <>
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
                    <>
                      <Typography>HPA (main)</Typography>
                      <List>
                        {hpaMain.map(location => (
                          <ListItem key={location}>- {location}</ListItem>
                        ))}
                      </List>
                    </>
                  ) : null}
                  {hpaAdditional.length > 0 ? (
                    <>
                      <Typography>HPA (additional)</Typography>
                      <List>
                        {hpaAdditional.map(location => (
                          <ListItem key={location}>- {location}</ListItem>
                        ))}
                      </List>
                    </>
                  ) : null}
                  {hpaExtracellular.length > 0 ? (
                    <>
                      <Typography>HPA (extracellular)</Typography>
                      <List>
                        {hpaExtracellular.map(location => (
                          <ListItem key={location}>- {location}</ListItem>
                        ))}
                      </List>
                    </>
                  ) : null}
                </Box>
              </Box>
            ) : null}
            {uniprot.length > 0 ? (
              <Box ml={4}>
                <Typography variant="h6">
                  UniProt -{' '}
                  <Link external to={identifiersOrgLink('uniprot', uniprotId)}>
                    {uniprotId}
                  </Link>
                </Typography>
                <List>
                  {uniprot.map(location => (
                    <ListItem key={location}>- {location}</ListItem>
                  ))}
                </List>
              </Box>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;

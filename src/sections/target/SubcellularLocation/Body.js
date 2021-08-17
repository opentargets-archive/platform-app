import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Typography, List, ListItem } from '@material-ui/core';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Link from '../../../components/Link';

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
      renderBody={data => {
        const hpaMain = [];
        const hpaAdditional = [];
        const hpaExtracellular = [];
        const uniprot = [];

        data.target.subcellularLocations.forEach(({ source, location }) => {
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
              <>
                <Typography variant="h5">HPA - {ensemblId}</Typography>
                {hpaMain.length > 0 ? (
                  <>
                    <Typography variant="h6">HPA (main)</Typography>
                    <List>
                      {hpaMain.map(location => (
                        <ListItem key={location}>{location}</ListItem>
                      ))}
                    </List>
                  </>
                ) : null}
                {hpaAdditional.length > 0 ? (
                  <>
                    <Typography variant="h6">HPA (additional)</Typography>
                    <List>
                      {hpaAdditional.map(location => (
                        <ListItem key={location}>{location}</ListItem>
                      ))}
                    </List>
                  </>
                ) : null}
                {hpaExtracellular.length > 0 ? (
                  <>
                    <Typography variant="h6">HPA (extracellular)</Typography>
                    <List>
                      {hpaExtracellular.map(location => (
                        <ListItem key={location}>{location}</ListItem>
                      ))}
                    </List>
                  </>
                ) : null}
              </>
            ) : null}
            {uniprot.length > 0 ? (
              <>
                <Typography variant="h5">UniProt</Typography>
                <List>
                  {uniprot.map(location => (
                    <ListItem key={location}>{location}</ListItem>
                  ))}
                </List>
              </>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;

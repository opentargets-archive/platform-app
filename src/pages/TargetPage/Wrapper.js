import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import { Skeleton } from '@material-ui/lab';
import config from '../../config';
import useBatchDownloader from '../../hooks/useBatchDownloader';

const ASSOCIATIONS_VIZ_QUERY = loader('./AssociationsViz.gql');

function Wrapper({ ensemblId, symbol, Component, aggregationFilters }) {
  const [nodes, setNodes] = useState();
  const [associations, setAssociations] = useState();

  const getAllAssociations = useBatchDownloader(
    ASSOCIATIONS_VIZ_QUERY,
    { ensemblId, aggregationFilters },
    'data.target.associatedDiseases'
  );

  useEffect(
    () => {
      let isCurrent = true;
      const promises = [
        fetch(config.efoURL).then(res => res.text()),
        getAllAssociations(),
      ];
      Promise.all(promises).then(data => {
        if (isCurrent) {
          const nodes = data[0]
            .trim()
            .split('\n')
            .map(JSON.parse);
          setNodes(nodes);
          setAssociations(data[1]);
        }
      });

      return () => (isCurrent = false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensemblId, aggregationFilters]
  );

  if (!nodes || !associations) {
    return <Skeleton variant="rect" height="40vh" />;
  }

  const idToDisease = nodes.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  return (
    <Component
      ensemblId={ensemblId}
      symbol={symbol}
      idToDisease={idToDisease}
      associations={associations}
    />
  );
}

export default Wrapper;

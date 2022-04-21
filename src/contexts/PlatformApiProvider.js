import React from 'react';
import { useQuery } from '@apollo/client';

import productionClient from '../client';

const PlatformApiContext = React.createContext();

function PlatformApiProvider({
  entity,
  lsSectionsField,
  query,
  client = productionClient,
  variables,
  children,
}) {
  const request = useQuery(query, { client, variables });

  return (
    <PlatformApiContext.Provider
      value={{ ...request, entity, lsSectionsField }}
    >
      {children}
    </PlatformApiContext.Provider>
  );
}

export default PlatformApiProvider;
export { PlatformApiContext };

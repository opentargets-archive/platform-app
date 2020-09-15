import React from 'react';
import { useQuery } from '@apollo/client';

const PlatformApiContext = React.createContext();

function PlatformApiProvider({ entity, query, variables, children }) {
  const request = useQuery(query, { variables });

  return (
    <PlatformApiContext.Provider value={{ ...request, entity }}>
      {children}
    </PlatformApiContext.Provider>
  );
}

export default PlatformApiProvider;
export { PlatformApiContext };

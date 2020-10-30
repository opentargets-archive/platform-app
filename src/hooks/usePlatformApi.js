import { useContext } from 'react';
import { filter } from 'graphql-anywhere';

import { PlatformApiContext } from '../contexts/PlatformApiProvider';

function usePlatformApi(fragment) {
  const context = useContext(PlatformApiContext);

  if (context === undefined) {
    throw new Error('usePlatformApi must be used within a PlatformApiProvider');
  }

  // Filter relevant section of the platform-api graphql query.
  if (context.data && fragment) {
    return { ...context, data: filter(fragment, context.data[context.entity]) };
  }

  return context;
}

export default usePlatformApi;

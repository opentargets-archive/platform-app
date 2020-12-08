import React from 'react';
import usePlatformApi from '../../../hooks/usePlatformApi';
import EVAServerTable from './EVAServerTable';
import EVAClientTable from './EVAClientTable';

import Summary from './Summary';

function Body({ definition, id, label }) {
  const { data } = usePlatformApi(Summary.fragments.evaSummary);

  return data.evaSummary.count > 1000 ? (
    <EVAServerTable definition={definition} id={id} label={label} />
  ) : (
    <EVAClientTable definition={definition} id={id} label={label} />
  );
}

export default Body;

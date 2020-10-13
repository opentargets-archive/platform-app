import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getStats } from './Api';

function Summary({ definition, id }) {
  const [request, setRequest] = useState({ loading: true });

  useEffect(
    () => {
      let isCurrent = true;

      getStats([{ key: id }]).then(
        res => {
          if (isCurrent) {
            setRequest({ loading: false, data: { count: res.hits.total } });
          }
        },
        err => {
          if (isCurrent) {
            setRequest({ loading: false, error: err });
          }
        }
      );

      return () => {
        isCurrent = false;
      };
    },
    [id]
  );

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.count.toLocaleString()} publication
          {data.count === 1 ? '' : 's'}
        </>
      )}
    />
  );
}

export default Summary;

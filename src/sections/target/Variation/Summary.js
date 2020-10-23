import React from 'react';

import SummaryItem from '../../../components/Summary/SummaryItem';

function Summary({ definition }) {
  return (
    <SummaryItem
      definition={definition}
      request={{ data: true }}
      renderSummary={() => <>Available</>}
    />
  );
}

export default Summary;

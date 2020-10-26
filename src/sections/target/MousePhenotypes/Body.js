import React from 'react';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import PhenotypesTable from './PhenotypesTable';
import usePlatformApi from '../../../hooks/usePlatformApi';

function Body({ definition, label: approvedSymbol }) {
  const request = usePlatformApi(
    Summary.fragments.MousePhenotypesSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => (
        <PhenotypesTable data={data.mousePhenotypes} symbol={approvedSymbol} />
      )}
    />
  );
}

export default Body;

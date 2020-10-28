import React from 'react';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import PhenotypesTable from './PhenotypesTable';
import usePlatformApi from '../../../hooks/usePlatformApi';

function Body({ definition, label: symbol }) {
  const request = usePlatformApi(
    Summary.fragments.MousePhenotypesSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => (
        <PhenotypesTable data={data.mousePhenotypes} symbol={symbol} />
      )}
    />
  );
}

export default Body;

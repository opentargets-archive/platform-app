import React from 'react';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { getUniprotIds } from '../../../utils/global';

import ProtVistaTab from './ProtVistaTab';

function Body({ definition, label: symbol }) {
  const request = usePlatformApi(
    Summary.fragments.ProteinInformationSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ proteinIds }) => {
        const uniprotId = getUniprotIds(proteinIds)[0];

        return <ProtVistaTab uniprotId={uniprotId} />;
      }}
    />
  );
}

export default Body;

import React from 'react';
import { loader } from 'graphql.macro';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { getUniprotIds } from '../../../utils/global';
import ProtVista from './ProtVista';

const PROTVISTA_SUMMARY_FRAGMENT = loader('./summaryQuery.gql');

function Body({ definition, label: symbol }) {
  const request = usePlatformApi(PROTVISTA_SUMMARY_FRAGMENT);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ proteinIds }) => {
        const uniprotId = getUniprotIds(proteinIds)[0];

        return <ProtVista uniprotId={uniprotId} />;
      }}
    />
  );
}

export default Body;

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Tab, Tabs } from '@material-ui/core';

import GeneTreeTab from './GeneTreeTab';
import HomologyTableTab from './HomologyTableTab';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const COMP_GENOMICS_QUERY = loader('./CompGenomics.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const defaultTab = 'table';
  const [tab, setTab] = useState(defaultTab);

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  const request = useQuery(COMP_GENOMICS_QUERY, { variables: { ensemblId } });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => (
        <>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            style={{ marginBottom: '1rem' }}
          >
            <Tab value="table" label="Homology table" />
            <Tab value="tree" label="Gene tree" />
          </Tabs>
          {tab === 'table' ? (
            <HomologyTableTab symbol={symbol} data={data} />
          ) : null}
          {tab === 'tree' ? (
            <GeneTreeTab ensgId={ensemblId} symbol={symbol} />
          ) : null}
        </>
      )}
    />
  );
}

export default Body;

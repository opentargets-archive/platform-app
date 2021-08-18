import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Tabs, Tab } from '@material-ui/core';

import BrowserTab from './BrowserTab';
import Description from './Description';
import { Helmet } from 'react-helmet';
import OverviewTab from './OverviewTab';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';

const PATHWAYS_QUERY = loader('./Pathways.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const defaultTab = 'overview';
  const [tab, setTab] = useState(defaultTab);
  const request = useQuery(PATHWAYS_QUERY, {
    variables: { ensemblId },
  });

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        console.log('data', data);
        return (
          <>
            <Helmet
              script={[
                {
                  src:
                    'https://www.reactome.org/DiagramJs/diagram/diagram.nocache.js',
                },
              ]}
            />
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              style={{ marginBottom: '1rem' }}
            >
              <Tab value="overview" label="Pathways Overview" />
              <Tab value="browser" label="Reactome Pathway Browser" />
            </Tabs>
            {tab === 'overview' ? (
              <OverviewTab symbol={symbol} lowLevelPathways={[]} />
            ) : null}
            {tab === 'browser' ? (
              <BrowserTab symbol={symbol} lowLevelPathways={[]} />
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;

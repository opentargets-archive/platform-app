import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

import BrowserTab from './BrowserTab';
import Description from './Description';
import { Helmet } from 'react-helmet';
import OverviewTab from './OverviewTab';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

function Body({ definition, label: symbol }) {
  const defaultTab = 'overview';
  const [tab, setTab] = useState(defaultTab);
  const request = usePlatformApi(Summary.fragments.PathwaysSummaryFragment);

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        const uniprotId = data.proteinAnnotations?.id;
        const lowLevelPathways = data.reactome.map(
          ({ id, label, ancestors }) => {
            const topLevelParents = ancestors
              .filter(ancestor => ancestor.isRoot)
              .map(({ label, id }) => ({ name: label, id }));
            return {
              id,
              name: label,
              parents: topLevelParents,
              parentNames: topLevelParents
                .map(parent => parent.name)
                .join(', '),
              url:
                `https://reactome.org/PathwayBrowser/#/${encodeURIComponent(
                  id
                )}` +
                (uniprotId ? `&FLG=${encodeURIComponent(uniprotId)}` : ''),
            };
          }
        );

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
              <OverviewTab
                symbol={symbol}
                lowLevelPathways={lowLevelPathways}
              />
            ) : null}
            {tab === 'browser' ? (
              <BrowserTab symbol={symbol} lowLevelPathways={lowLevelPathways} />
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;

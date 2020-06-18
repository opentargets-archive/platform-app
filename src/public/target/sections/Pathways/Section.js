import React, { useState } from 'react';
import { Tabs, Tab } from 'ot-ui';

import OverviewTab from './custom/OverviewTab';
import BrowserTab from './custom/BrowserTab';

const PathwaysDetail = ({ symbol, uniprotId, data }) => {
  const [tab, setTab] = useState('overview');
  const lowLevelPathways = data.map(({ id, label, ancestors }) => {
    const topLevelParents = ancestors
      .filter(ancestor => ancestor.isRoot)
      .map(({ label, id }) => ({ name: label, id }));
    return {
      id,
      name: label,
      parents: topLevelParents,
      parentNames: topLevelParents.map(parent => parent.name).join(', '),
      url:
        `https://reactome.org/PathwayBrowser/#/${encodeURIComponent(id)}` +
        (uniprotId ? `&FLG=${encodeURIComponent(uniprotId)}` : ''),
    };
  });

  return (
    <>
      <Tabs
        value={tab}
        onChange={(__, tab) => {
          setTab(tab);
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="overview" label="Pathways Overview" />
        <Tab value="browser" label="Reactome Pathway Browser" />
      </Tabs>
      {tab === 'overview' ? (
        <OverviewTab symbol={symbol} lowLevelPathways={lowLevelPathways} />
      ) : null}
      {tab === 'browser' ? (
        <BrowserTab symbol={symbol} lowLevelPathways={lowLevelPathways} />
      ) : null}
    </>
  );
};

export default PathwaysDetail;

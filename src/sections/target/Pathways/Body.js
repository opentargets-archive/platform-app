import React, { useState } from 'react';

import { Tabs, Tab } from 'ot-ui';

import OverviewTab from './OverviewTab';
import BrowserTab from './BrowserTab';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const PathwaysDetail = ({ definition, label: approvedSymbol }) => {
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
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
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
                symbol={approvedSymbol}
                lowLevelPathways={lowLevelPathways}
              />
            ) : null}
            {tab === 'browser' ? (
              <BrowserTab
                symbol={approvedSymbol}
                lowLevelPathways={lowLevelPathways}
              />
            ) : null}
          </>
        );
      }}
    />
  );
};

export default PathwaysDetail;

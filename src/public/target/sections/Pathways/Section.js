import React, { useState } from 'react';
import { Tabs, Tab } from 'ot-ui';
import _ from 'lodash';

import OverviewTab from './custom/OverviewTab';
import BrowserTab from './custom/BrowserTab';

const PathwaysDetail = ({ symbol, data }) => {
  const [tab, setTab] = useState('overview');
  const lowLevelPathways = data.map(({ id, label, ancestors }) => ({
    id,
    name: label,
    parents: ancestors
      .filter(ancestor => ancestor.isRoot)
      .map(({ label, id }) => ({ name: label, id })),
  }));
  const associatedRootIds = _.uniq(
    _.flatMap(data, ({ ancestors }) =>
      ancestors.filter(pathway => pathway.isRoot).map(pathway => pathway.id)
    )
  );
  const topLevelPathways = TOP_LEVEL_PATHWAYS.map(topLevelPathway => ({
    ...topLevelPathway,
    isAssociated: associatedRootIds.indexOf(topLevelPathway.id) !== -1,
  }));

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
        <OverviewTab
          symbol={symbol}
          topLevelPathways={topLevelPathways}
          lowLevelPathways={lowLevelPathways}
        />
      ) : null}
      {tab === 'browser' ? (
        <BrowserTab
          symbol={symbol}
          topLevelPathways={topLevelPathways}
          lowLevelPathways={lowLevelPathways}
        />
      ) : null}
    </>
  );
};

const TOP_LEVEL_PATHWAYS = [
  {
    id: 'R-HSA-9612973',
    name: 'Autophagy',
  },
  {
    id: 'R-HSA-1640170',
    name: 'Cell Cycle',
  },
  {
    id: 'R-HSA-1500931',
    name: 'Cell-Cell communication',
  },
  {
    id: 'R-HSA-8953897',
    name: 'Cellular responses to external stimuli',
  },
  {
    id: 'R-HSA-4839726',
    name: 'Chromatin organization',
  },
  {
    id: 'R-HSA-400253',
    name: 'Circadian Clock',
  },
  {
    id: 'R-HSA-1266738',
    name: 'Developmental Biology',
  },
  {
    id: 'R-HSA-8963743',
    name: 'Digestion and absorption',
  },
  {
    id: 'R-HSA-1643685',
    name: 'Disease',
  },
  {
    id: 'R-HSA-73894',
    name: 'DNA Repair',
  },
  {
    id: 'R-HSA-69306',
    name: 'DNA Replication',
  },
  {
    id: 'R-HSA-1474244',
    name: 'Extracellular matrix organization',
  },
  {
    id: 'R-HSA-74160',
    name: 'Gene expression (Transcription)',
  },
  {
    id: 'R-HSA-109582',
    name: 'Hemostasis',
  },
  {
    id: 'R-HSA-168256',
    name: 'Immune System',
  },
  {
    id: 'R-HSA-1430728',
    name: 'Metabolism',
  },
  {
    id: 'R-HSA-392499',
    name: 'Metabolism of proteins',
  },
  {
    id: 'R-HSA-8953854',
    name: 'Metabolism of RNA',
  },
  {
    id: 'R-HSA-5205647',
    name: 'Mitophagy',
  },
  {
    id: 'R-HSA-397014',
    name: 'Muscle contraction',
  },
  {
    id: 'R-HSA-112316',
    name: 'Neuronal System',
  },
  {
    id: 'R-HSA-1852241',
    name: 'Organelle biogenesis and maintenance',
  },
  {
    id: 'R-HSA-5357801',
    name: 'Programmed Cell Death',
  },
  {
    id: 'R-HSA-9609507',
    name: 'Protein localization',
  },
  {
    id: 'R-HSA-1474165',
    name: 'Reproduction',
  },
  {
    id: 'R-HSA-162582',
    name: 'Signal Transduction',
  },
  {
    id: 'R-HSA-382551',
    name: 'Transport of small molecules',
  },
  {
    id: 'R-HSA-5653656',
    name: 'Vesicle-mediated transport',
  },
];
export default PathwaysDetail;

import React, { useState } from 'react';

import { Tabs, Tab } from 'ot-ui';

import SummaryTab from './custom/SummaryTab';
import AtlasTab from './custom/AtlasTab';
import GtexTab from './custom/GtexTab';

function Section({ ensgId, symbol }) {
  const [tab, setTab] = useState('summary');

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab value="summary" label="Summary" />
        <Tab value="atlas" label="Experiments (Expression Atlas)" />
        <Tab value="gtex" label="Variation (GTEx)" />
      </Tabs>
      {tab === 'summary' && <SummaryTab ensgId={ensgId} symbol={symbol} />}
      {tab === 'atlas' && <AtlasTab ensgId={ensgId} symbol={symbol} />}
      {tab === 'gtex' && <GtexTab symbol={symbol} />}
    </>
  );
}

export default Section;

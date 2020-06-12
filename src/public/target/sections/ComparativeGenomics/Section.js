import React, { useState } from 'react';

import { Tabs, Tab } from 'ot-ui';

import GeneTreeTab from './custom/GeneTreeTab';
import HomologyTableTab from './custom/HomologyTableTab';

function Section({ ensgId, symbol }) {
  const [tab, setTab] = useState('table');

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="table" label="Homology table" />
        <Tab value="tree" label="Gene tree" />
      </Tabs>
      {tab === 'table' ? (
        <HomologyTableTab ensgId={ensgId} symbol={symbol} />
      ) : null}
      {tab === 'tree' ? <GeneTreeTab ensgId={ensgId} symbol={symbol} /> : null}
    </>
  );
}

export default Section;

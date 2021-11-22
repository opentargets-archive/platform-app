import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';

import AtlasTab from './AtlasTab';
import GtexTab, { getData as getGtexData } from './GtexTab';
import SummaryTab, { getData as getSummaryData } from './SummaryTab';

function Section({ definition, id: ensgId, label: symbol }) {
  const defaultTab = 'summary';
  const [tab, setTab] = useState(defaultTab);
  const [requestSummary, setRequestSummary] = useState({ loading: true });
  const [requestGtex, setRequestGtex] = useState({ loading: true });
  const [request, setRequest] = {
    summary: [requestSummary, setRequestSummary],
    atlas: [{ loading: false, data: true }, undefined],
    gtex: [requestGtex, setRequestGtex],
  }[tab];
  const getData = {
    summary: getSummaryData,
    gtex: getGtexData,
  }[tab];

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  useEffect(
    () => {
      let isCurrent = true;

      async function updateData() {
        const newRequest = await getData(ensgId);
        if (isCurrent) setRequest(newRequest);
      }

      if (!request.data && getData) {
        setRequest({ loading: true });
        updateData();
      }

      return () => {
        isCurrent = false;
      };
    },
    [tab, ensgId, request.data, getData, setRequest]
  );

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
            <Tab value="summary" label="Summary" />
            <Tab value="atlas" label="Experiments (Expression Atlas)" />
            <Tab value="gtex" label="Variation (GTEx)" />
          </Tabs>
          {tab === 'summary' && <SummaryTab symbol={symbol} data={data} />}
          {tab === 'atlas' && <AtlasTab ensgId={ensgId} symbol={symbol} />}
          {tab === 'gtex' && <GtexTab symbol={symbol} data={data} />}
        </>
      )}
    />
  );
}

export default Section;

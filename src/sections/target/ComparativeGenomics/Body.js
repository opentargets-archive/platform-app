import React, { useEffect, useState } from 'react';

import { Tab, Tabs } from '@material-ui/core';

import GeneTreeTab from './GeneTreeTab';
import HomologyTableTab, { getData as getTableData } from './HomologyTableTab';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

function Body({ definition, id: ensgId, label: symbol }) {
  const defaultTab = 'table';
  const [tab, setTab] = useState(defaultTab);
  const [requestTable, setRequestTable] = useState({ loading: true });
  const [request, setRequest] = {
    table: [requestTable, setRequestTable],
    tree: [{ loading: false, data: true }, undefined],
  }[tab];
  const getData = {
    table: getTableData,
  }[tab];

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  useEffect(
    () => {
      let isCurrent = true;

      async function updateData() {
        try {
          const data = await getData(ensgId);
          if (isCurrent) setRequest({ loading: false, data });
        } catch (error) {
          if (isCurrent) setRequest({ loading: false, error });
        }
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
            <Tab value="table" label="Homology table" />
            <Tab value="tree" label="Gene tree" />
          </Tabs>
          {tab === 'table' ? (
            <HomologyTableTab symbol={symbol} data={data} />
          ) : null}
          {tab === 'tree' ? (
            <GeneTreeTab ensgId={ensgId} symbol={symbol} />
          ) : null}
        </>
      )}
    />
  );
}

export default Body;

import React, { useEffect, useState } from 'react';

import { Tabs, Tab } from 'ot-ui';

import GeneTreeTab, { getData as getTreeData } from './GeneTreeTab';
import HomologyTableTab, { getData as getTableData } from './HomologyTableTab';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

function Body({ definition, id: ensgId, label: approvedSymbol }) {
  const defaultTab = 'table';
  const [tab, setTab] = useState(defaultTab);
  const [requestTable, setRequestTable] = useState({ loading: true });
  const [requestTree, setRequestTree] = useState({ loading: true });
  const [request, setRequest] = {
    table: [requestTable, setRequestTable],
    tree: [requestTree, setRequestTree],
  }[tab];
  const getData = {
    table: getTableData,
    tree: getTreeData,
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

      if (!request.data) {
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
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => (
        <>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            style={{ marginBottom: '1rem' }}
          >
            <Tab value="table" label="Homology table" />
            <Tab value="tree" label="Gene tree" />
          </Tabs>
          {tab === 'table' ? (
            <HomologyTableTab
              approvedSymbol={approvedSymbol}
              request={{ data }}
            />
          ) : null}
          {tab === 'tree' ? (
            <GeneTreeTab ensgId={ensgId} symbol={approvedSymbol} />
          ) : null}
        </>
      )}
    />
  );
}

export default Body;

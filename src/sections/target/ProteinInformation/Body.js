import React, { useState } from 'react';

import { Tabs, Tab } from 'ot-ui';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

import ProtVistaTab from './ProtVistaTab';
import SubcellularLocationTab from './SubcellularLocationTab';
import SubunitTab from './SubunitTab';

function Body({ definition, id: ensgId, label: symbol }) {
  const defaultTab = 'protvista';
  const [tab, setTab] = useState(defaultTab);
  const request = usePlatformApi(
    Summary.fragments.ProteinInformationSummaryFragment
  );

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        const uniprotId = data.proteinAnnotations.id;

        return (
          <>
            <Tabs
              value={tab}
              onChange={handleChangeTab} /*  */
              style={{ marginBottom: '1rem' }}
            >
              <Tab value="protvista" label="ProtVista" />
              <Tab value="subCellularLocation" label="Sub-cellular location" />
              <Tab value="subUnitData" label="Subunit data" />
            </Tabs>
            {tab === 'protvista' ? (
              <ProtVistaTab uniprotId={uniprotId} />
            ) : null}
            {tab === 'subCellularLocation' ? (
              <SubcellularLocationTab
                symbol={symbol}
                subcellularLocations={
                  data.proteinAnnotations.subcellularLocations
                }
                uniprotId={uniprotId}
              />
            ) : null}
            {tab === 'subUnitData' ? (
              <SubunitTab
                symbol={symbol}
                subunits={data.proteinAnnotations.subunits}
              />
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;

import React, {useState} from 'react';
import { Tab, Tabs } from '@material-ui/core';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';
import * as DummyData from './DummyData';

import SnvByGeneTab from './SnvByGeneTab';
import SnvByVariantTab from './SnvByVariantTab';
import CnvByGeneTab from './CnvByGeneTab';

function Body({ definition, id, label }) {
  const defaultTab = "snvByGene";
  const [tab, setTab] = useState(defaultTab);
  // Dummy data generated from internal files for populating the tables in the UI
  const request = {
    data: {
      disease: {
        id: "EFO_0000621",
        evidences: {
          snvByGeneRows: DummyData.snvByGeneRows,
          snvByVariantRows: DummyData.snvByVariantRows,
          cnvByGeneRows: DummyData.cnvByGeneRows
        }
      }
    },
    loading: false,
    error: false,
  }

  const handleChangeTab = (_, tab) => {
    setTab(tab)
  }
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { snvByGeneRows, snvByVariantRows, cnvByGeneRows } = disease.evidences;
        return (
          <>
            <Tabs value={tab} onChange={handleChangeTab} style={{ marginBottom: '2rem' }}>
              <Tab value="snvByGene" label="SNV By Gene"></Tab>
              <Tab value="snvByVariant" label="SNV By Variant"></Tab>
              <Tab value="cnvByGene" label="CNV By Gene"></Tab>
            </Tabs>
            {/* table 1: SNV by Gene */}
            { tab === "snvByGene" && <SnvByGeneTab data={snvByGeneRows} /> }

            {/* table 2: SNV by Variant */}
            { tab === "snvByVariant" && <SnvByVariantTab data={snvByVariantRows}/> }

            {/* table 3: CNV by Gene*/}
            { tab === "cnvByGene" && <CnvByGeneTab data={cnvByGeneRows} /> }
          </>
        );
      }}
    />
  );
}

export default Body;

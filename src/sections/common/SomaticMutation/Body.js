import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import SectionItem from '../../../components/Section/SectionItem';
import { dataTypesMap } from '../../../dataTypes';

import SnvByGeneTab from './SnvByGeneTab';
import SnvByVariantTab from './SnvByVariantTab';
import CnvByGeneTab from './CnvByGeneTab';
import FusionByGeneTab from './FusionByGeneTab';
import FusionTab from './FusionTab';

function Body({ definition, id, label, entity, variables, BODY_QUERY, Description, dataDownloaderFileStem}) {

  const request = useQuery(BODY_QUERY, {
    variables: { ...variables, size: 9999 },
  });
  const defaultTab = "snvByGene";
  const [tab, setTab] = useState(defaultTab);

  const handleChangeTab = (_, tab) => {
    setTab(tab)
  }

  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence'? dataTypesMap.somatic_mutation : ''}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={(data) => {
        const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = data;
        return (
          <>
            <Tabs value={tab} onChange={handleChangeTab} style={{ marginBottom: '2rem' }}>
              <Tab value="snvByGene" label="SNV By Gene" disabled={snvByGene.evidences.count === 0}></Tab>
              <Tab value="snvByVariant" label="SNV By Variant" disabled={snvByVariant.evidences.count === 0}></Tab>
              <Tab value="cnvByGene" label="CNV By Gene" disabled={cnvByGene.evidences.count === 0}></Tab>
              <Tab value="fusionByGene" label="Fusion By Gene" disabled={fusionByGene.evidences.count === 0}></Tab>
              <Tab value="fusion" label="Fusion" disabled={fusion.evidences.count === 0}></Tab>
            </Tabs>
            {/* table 1: SNV by Gene */}
            { tab === "snvByGene" && snvByGene.evidences.count > 0 && 
                <SnvByGeneTab data={snvByGene.evidences.rows} dataDownloaderFileStem={dataDownloaderFileStem} ids={id} labels={label}  /> }

            {/* table 2: SNV by Variant */}
            { tab === "snvByVariant" && snvByVariant.evidences.count > 0 && 
                <SnvByVariantTab data={snvByVariant.evidences.rows} dataDownloaderFileStem={dataDownloaderFileStem} ids={id} labels={label} /> }

            {/* table 3: CNV by Gene*/}
            { tab === "cnvByGene" && cnvByGene.evidences.count > 0 && 
                <CnvByGeneTab data={cnvByGene.evidences.rows} dataDownloaderFileStem={dataDownloaderFileStem} ids={id} labels={label}  /> }

            {/* table 4: Fusion by Gene*/}
            { tab === "fusionByGene" && fusionByGene.evidences.count > 0 && 
                <FusionByGeneTab data={fusionByGene.evidences.rows} dataDownloaderFileStem={dataDownloaderFileStem} ids={id} labels={label}  /> }

            {/* table 5: Fusion */}
            { tab === "fusion" && fusion.evidences.count > 0 && 
                <FusionTab data={fusion.evidences.rows} dataDownloaderFileStem={dataDownloaderFileStem} ids={id} labels={label}  /> }

          </>
        );
      }}
    />
  );
}

export default Body;

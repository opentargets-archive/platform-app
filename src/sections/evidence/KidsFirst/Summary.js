import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getGeneDiseaseGtexJSON } from '../../../utils/externalAPI';
import { dataTypesMap } from '../../../dataTypes';
import { setDisplaySettingForExternal } from '../../common/OpenPedCanGeneExpression/utils'

export async function getData(id, setData, setLoading, setHasData=(_)=>_){
  const { ensgId: ensemblId, efoId } = id;
  /********     Get JSON Data    ******** */
  await getGeneDiseaseGtexJSON(ensemblId, efoId,
    (resData)=> {
      setData(resData);
      setHasData(true);
      setLoading(false);
    },
    (error)=> {
      setHasData(false);
      setLoading(false);
    }, 'summary');
}

function Summary({ definition, id, displaySettingsForExternal, updateDisplaySettingsForExternal}) {
  const { ensgId: ensemblId, efoId } = id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error] = useState(false);

 useEffect(()=>{
    /********     Get JSON Data    ********/
    if (data.length === 0 && loading === true) {
      getData(id, setData, setLoading);
    }
  return () => {
    setDisplaySettingForExternal(definition.hasData(data), definition.id, displaySettingsForExternal, updateDisplaySettingsForExternal);
  }
}, [ensemblId, efoId, id, data, setData, setLoading, definition, displaySettingsForExternal, updateDisplaySettingsForExternal, loading]);

  const request = {loading: loading, data, error: error};
  
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={( data ) => {
        const hasData = definition.hasData(data);
        return hasData ? "Available" : "no data"
      }}
      subText={dataTypesMap.rna_expression}
    />
  );
}

export default Summary;
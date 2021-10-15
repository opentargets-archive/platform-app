import React, { useEffect, useState } from 'react';

import SummaryItem from '../../../components/Summary/SummaryItem';
import { getGeneAllCancerJSON } from '../../../utils/externalAPI';
import { setDisplaySettingForExternal } from '../../common/OpenPedCanGeneExpression/utils'

export async function getData(ensemblId, setData, setLoading, setHasData=(_)=>_){
  /********     Get JSON Data    ******** */
  await getGeneAllCancerJSON(ensemblId,
    (resData)=> {
      setData(resData)
      setHasData(true)
      setLoading(false)
    },
    (error)=> {
      setHasData(false)
      setLoading(false)
    }, 'summary');
}

function Summary({ definition, id, displaySettingsForExternal, updateDisplaySettingsForExternal}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error] = useState(false);

  useEffect(()=>{
    /********     Get JSON Data    ********/
    if (data.length === 0 && loading === true) {
      getData(id, setData, setLoading)
    }
    return () => {
      setDisplaySettingForExternal(definition.hasData(data), definition.id, displaySettingsForExternal, updateDisplaySettingsForExternal);
    }
  }, [id, data, definition, displaySettingsForExternal, updateDisplaySettingsForExternal, loading]) 

  const request = {loading: loading, data, error: error}
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={( data ) => {
        const hasData = definition.hasData(data)
        return hasData ? "Available" : "no data"
      }}
    />
  );
}

export default Summary;
import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getGeneDiseaseGtexJSON } from '../../../utils/externalAPI';
import { dataTypesMap } from '../../../dataTypes';

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


 // need to review this, possible need to move to util. 
  const setDisplaySettingForExternal = (flag,definitionKey,displaySettingsForExternal,updateDisplaySettingsForExternal)=>{
    if(flag){
      // HasData from external source

      if(!displaySettingsForExternal.includes(definitionKey)){
         //If this section.difinition.id is not presented in the displaySettingsForExternal array, add id into it.
        updateDisplaySettingsForExternal([...displaySettingsForExternal, definitionKey]);
      }
    }else{
      // No data from external source
      if(displaySettingsForExternal.includes(definitionKey)){
         //If this section.difinition.id is  presented in the displaySettingsForExternal array, remove it from displaySettingsForExternal.
        const index = displaySettingsForExternal.indexOf(definitionKey);
        displaySettingsForExternal.splice(index,1);
        updateDisplaySettingsForExternal([...displaySettingsForExternal]);
      }
    }
  }


function Summary({ definition, id , displaySettingsForExternal,updateDisplaySettingsForExternal}) {
  const { ensgId: ensemblId, efoId } = id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error] = useState(false);

 useEffect(()=>{
    /********     Get JSON Data    ********/
  getData(id, setData, setLoading);
  setDisplaySettingForExternal(definition.hasData(data),definition.id, displaySettingsForExternal,updateDisplaySettingsForExternal);
}, [ensemblId, efoId, id, data, definition,displaySettingsForExternal,updateDisplaySettingsForExternal]);

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
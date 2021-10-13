import React, { useEffect, useState } from 'react';
import SummaryItem from '../../../components/Summary/SummaryItem';

import { getGeneAllCancerJSON } from '../../../utils/externalAPI';

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

function Summary({ definition, id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error] = useState(false);


 useEffect(()=>{
    /********     Get JSON Data    ********/
  getData(id, setData, setLoading)
    
}, [id]) 

  const request = {loading: loading, data, error: error}
  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={( data ) => {
        const hasData = definition.hasData(data)
        return hasData ? "Available" : "no data"
      }}
      // subText={dataTypesMap.rna_expression}
    />
  );
}

export default Summary;
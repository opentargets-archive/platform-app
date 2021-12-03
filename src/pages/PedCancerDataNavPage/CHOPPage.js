import React, { useState, useEffect } from 'react';
import axios from 'axios';
import View from './View';

const CHoP_CONTENT_URL = "https://raw.githubusercontent.com/CBIIT/ppdc-config/main/front-end/page_CHoP/chopTargetDiseaseData-EXAMPLE.json";

function CHoPPage() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(CHoP_CONTENT_URL);
        if(result.status === 200){
            resultData = result.data;
        }
      } catch (error) {
        resultData = "Under Development ... ";
      }
      setData(resultData);
    };
    fetchData();
  },[data.length]);

  return data ? data.length !==0 ? (<View data={data} />) : <></>:<></>;
}
export default CHoPPage;

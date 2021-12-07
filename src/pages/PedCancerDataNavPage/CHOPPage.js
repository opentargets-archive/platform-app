import React, { useState, useEffect } from 'react';
import axios from 'axios';
import View from './View';

const CHoP_CONTENT_URL = "https://gl.githack.com/yizhenchen/dummy-data/-/raw/main/chopDataNavigationTable_SA_GX.json";

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
        resultData = [];
      }
      setData(resultData);
    };
    fetchData();
  },[data.length]);

  return <View data={data} /> ;
}
export default CHoPPage;

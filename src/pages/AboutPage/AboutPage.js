import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import AboutView from './AboutView';

const ABOUT_CONTENT_URL = "https://api.github.com/repos/CBIIT/ppdc-otp-frontend/contents/content/prod/about.yaml";

function AboutPage() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(ABOUT_CONTENT_URL);
        if(result.status === 200){
            resultData = yaml.safeLoad(
              Buffer.from(result.data.content, "base64").toString())[0];
        }
      } catch (error) {
        resultData = "Under Development ... ";
      }
      setData(resultData);
    };
    fetchData();
  },[data.length]);

  return (<AboutView data={data} />);
}
export default AboutPage;

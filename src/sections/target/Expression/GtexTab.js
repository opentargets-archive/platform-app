import React, { useRef } from 'react';
import { median as d3Median, quantile } from 'd3';

import { DownloadSvgPlot } from '../../../components/DownloadSvgPlot';
import GtexVariability from './GtexVariability';

export async function getData(symbol) {
  try {
    const urlGene = `https://gtexportal.org/rest/v1/reference/gene?format=json&geneId=${symbol}`;
    const resGene = await fetch(urlGene);
    const rawGene = await resGene.json();
    const { gencodeId } = rawGene.gene[0];
    const urlData = `https://gtexportal.org/rest/v1/expression/geneExpression?gencodeId=${gencodeId}`;
    const resData = await fetch(urlData);
    const rawData = await resData.json();
    const data = transformData(rawData.geneExpression);

    return { loading: false, data };
  } catch (error) {
    return { loading: false, error };
  }
}

const transformData = data => {
  return data.map(d => {
    // d3 requires for the array of values to be sorted before using median and quantile
    d.data.sort((a, b) => a - b);
    const median = d3Median(d.data);
    const q1 = quantile(d.data, 0.25);
    const q3 = quantile(d.data, 0.75);
    const outliers = [];
    const notoutliers = [];
    const iqr = q3 - q1; // interquartile range

    // find the outliers and not outliers
    d.data.forEach(d => {
      if (d < q1 - 1.5 * iqr || d > q3 + 1.5 * iqr) {
        outliers.push(d);
      } else {
        notoutliers.push(d);
      }
    });

    return {
      tissueSiteDetailId: d.tissueSiteDetailId,
      median,
      q1,
      q3,
      lowerLimit: notoutliers[0],
      upperLimit: notoutliers[notoutliers.length - 1],
      outliers,
    };
  });
};

function GtexTab({ symbol, data }) {
  const gtexVariability = useRef();

  return (
    <DownloadSvgPlot
      svgContainer={gtexVariability}
      filenameStem={`${symbol}-gtex`}
    >
      <GtexVariability data={data} ref={gtexVariability} />
    </DownloadSvgPlot>
  );
}

export default GtexTab;

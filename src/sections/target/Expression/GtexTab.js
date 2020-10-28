import React, { useRef } from 'react';
import * as d3 from 'd3';

import { DownloadSVGPlot } from 'ot-ui';

import GtexVariability from './GtexVariability';

export async function getData(symbol) {
  try {
    const urlGene = `https://www.gtexportal.org/rest/v1/reference/gene?geneId=${symbol}&v=clversion`;
    const resGene = await fetch(urlGene);
    const rawGene = await resGene.json();
    const { gencodeId } = rawGene.gene[0];
    const urlData = `https://www.gtexportal.org/rest/v1/expression/geneExpression?boxplotDetail=full&gencodeId=${gencodeId}`;
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
    const median = d3.median(d.data);
    const q1 = d3.quantile(d.data, 0.25);
    const q3 = d3.quantile(d.data, 0.75);
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
    <DownloadSVGPlot
      svgContainer={gtexVariability}
      filenameStem={`${symbol}-gtex`}
    >
      <GtexVariability data={data} ref={gtexVariability} />
    </DownloadSVGPlot>
  );
}

export default GtexTab;

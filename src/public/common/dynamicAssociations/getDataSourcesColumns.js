import React from 'react';
import * as d3 from 'd3';

import { significantFigures } from 'ot-ui';

import {
  // dataSourcesOrderAlphabetical,
  dataSourcesOrderByDataType,
  dataTypes,
} from './configuration';
import VerticalSlider from '../VerticalSlider';
import HeatmapCell from '../HeatmapCell';
// import Histogram from '../Histogram';

const getDataSourcesColumns = ({
  firstColumnName,
  hideEmptyColumns,
  dataSources,
  theme,
  handleWeightChange,
  handleCellClick,
  aggregates,
  evidence,
}) => {
  const colorScale = d3
    .scaleLinear()
    .domain([0, Math.PI ** 2 / 6])
    .range(['#fff', theme.palette.primary.main]);
  return [
    {
      id: 'score',
      label: 'Score',
      verticalHeader: true,
      align: 'center',
      firstInHeaderGroup: true,
      lastInHeaderGroup: true,
      renderCell: (d) => (
        <HeatmapCell value={d.score} colorScale={colorScale} />
      ),
    },
    ...dataSourcesOrderByDataType
      .map((ds) => dataSources.find((c) => c.id === ds))
      .filter((c) => c) // dataSources could be empty
      .filter((c) => (hideEmptyColumns ? aggregates[c.id].coverage > 0 : true))
      .map((c) => ({
        id: c.id,
        label: `${c.name} (${significantFigures(
          aggregates[c.id].coverage * 100
        )}%)`,
        verticalHeader: true,
        align: 'center',
        firstInHeaderGroup: dataTypes.some((dt) => dt.dataSources[0] === c.id),
        lastInHeaderGroup: dataTypes.some(
          (dt) => dt.dataSources[dt.dataSources.length - 1] === c.id
        ),
        renderCell: (d) => (
          <HeatmapCell
            value={d.dsScores[c.position]}
            colorScale={colorScale}
            selected={
              evidence &&
              c.id === evidence.dataSourceId &&
              d.obj.id === evidence.efoId
            }
            onClick={() => {
              if (firstColumnName === 'Disease') {
                handleCellClick({
                  efoId: d.obj.id,
                  name: d.obj.name,
                  dataSourceId: c.id,
                });
              } else if (firstColumnName === 'Target') {
                handleCellClick({
                  ensgId: d.obj.id,
                  name: d.obj.name,
                  dataSourceId: c.id,
                });
              }
            }}
          />
        ),
        renderFilter: () => (
          <VerticalSlider
            orientation="vertical"
            defaultValue={c.weight}
            value={c.weight}
            step={0.01}
            min={0}
            max={1}
            aria-labelledby="vertical-slider"
            onChange={(event, value) => handleWeightChange(c, value)}
          />
        ),
        // renderLabelBackground: () => (
        //   <Histogram
        //     id={c.id}
        //     data={aggregates[c.id].histogram}
        //     color={colorScale(0.5)}
        //   />
        // ),
        comparator: (a, b) =>
          d3.ascending(a.dsScores[c.position], b.dsScores[c.position]),
      })),
  ];
};

export default getDataSourcesColumns;

import React, { useRef, useState } from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import { useTheme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { DownloadSVGPlot } from 'ot-ui';
import Slider from './ClassicAssociationsSlider';
import Legend from '../../components/Legend';
import { colorRange } from '../../constants';

function findTas(id, idToDisease) {
  const tas = new Set();
  const diseaseNode = idToDisease[id];
  if (diseaseNode.parentIds.length === 0) {
    return tas;
  }
  const queue = [id];
  while (queue.length > 0) {
    const diseaseId = queue.shift();
    const node = idToDisease[diseaseId];
    if (node.parentIds.length === 0) {
      tas.add(diseaseId);
    }
    for (let i = 0; i < node.parentIds.length; i++) {
      const parentId = node.parentIds[i];
      if (!queue.includes(parentId)) {
        queue.push(parentId);
      }
    }
  }

  return tas;
}

function buildHierarchicalData(associations, idToDisease) {
  const tasMap = {};
  associations.forEach(association => {
    const tas = findTas(association.disease.id, idToDisease);
    tas.forEach(ta => {
      const assocData = {
        id: association.disease.id,
        uniqueId: `${ta}-${association.disease.id}`,
        name: association.disease.name,
        score: association.score,
      };
      if (tasMap[ta]) {
        tasMap[ta].push(assocData);
      } else {
        tasMap[ta] = [assocData];
      }
    });
  });

  return {
    uniqueId: 'EFO_ROOT',
    children: Object.entries(tasMap).map(([taId, descendants]) => {
      return {
        id: taId,
        uniqueId: taId,
        name: idToDisease[taId].name,
        children: descendants,
      };
    }),
  };
}

const color = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

function ClassicAssociationsBubbles({
  symbol,
  efo,
  associations,
  measureRef,
  contentRect,
}) {
  const [minScore, setMinScore] = useState(0.1);
  const svgRef = useRef(null);
  const theme = useTheme();
  const assocs = associations.filter(assoc => assoc.score >= minScore);
  const { width: size = 100 } = contentRect.bounds;
  const idToDisease = efo.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  const hierarchicalData = buildHierarchicalData(assocs, idToDisease);
  const root = d3.hierarchy(hierarchicalData);
  const packLayout = d3
    .pack()
    .size([size, size])
    .padding(2);
  root.sum(d => d.score);
  packLayout(root);

  return (
    <div ref={measureRef}>
      <Slider value={minScore} onChange={(_, val) => setMinScore(val)} />
      <DownloadSVGPlot
        svgContainer={svgRef}
        filenameStem={`${symbol}-associated-diseases-bubbles`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          ref={svgRef}
          height={size}
          width={size}
        >
          {root.descendants().map(d => {
            return (
              <g key={d.data.uniqueId} transform={`translate(${d.x},${d.y})`}>
                <path
                  id={d.data.uniqueId}
                  d={`M 0, ${d.r} a ${d.r},${d.r} 0 1,1 0,-${2 * d.r} a ${
                    d.r
                  },${d.r} 0 1,1 0,${2 * d.r}`}
                  stroke={
                    d.data.uniqueId !== 'EFO_ROOT'
                      ? theme.palette.grey[400]
                      : 'none'
                  }
                  fill={
                    d.data.uniqueId === 'EFO_ROOT'
                      ? theme.palette.grey[50]
                      : d.parent.data.uniqueId === 'EFO_ROOT'
                      ? 'none'
                      : color(d.data.score)
                  }
                />

                {d.data.uniqueId === 'EFO_ROOT' ? null : d.parent &&
                  d.parent.data.uniqueId === 'EFO_ROOT' ? (
                  <Tooltip title={d.data.name} interactive placement="top">
                    <text textAnchor="middle" fontSize="12">
                      <textPath
                        startOffset="50%"
                        xlinkHref={`#${d.data.uniqueId}`}
                      >
                        {d.data.name}
                      </textPath>
                    </text>
                  </Tooltip>
                ) : d.r > 15 ? (
                  <>
                    <clipPath id={`clip-${d.data.uniqueId}`}>
                      <circle cx="0" cy="0" r={d.r} />
                    </clipPath>
                    <Tooltip title={d.data.name} interactive placement="top">
                      <text
                        clipPath={`url(#clip-${d.data.uniqueId})`}
                        fontSize="11"
                        textAnchor="middle"
                      >
                        {d.data.name.split(' ').map((word, i, words) => {
                          return (
                            <tspan
                              key={i}
                              x="0"
                              y={`${i - words.length / 2 + 0.8}em`}
                            >
                              {word}
                            </tspan>
                          );
                        })}
                      </text>
                    </Tooltip>
                  </>
                ) : null}
              </g>
            );
          })}
        </svg>
      </DownloadSVGPlot>
      <Legend />
    </div>
  );
}

export default withContentRect('bounds')(ClassicAssociationsBubbles);

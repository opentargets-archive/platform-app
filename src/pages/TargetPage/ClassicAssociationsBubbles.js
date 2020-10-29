import React, { useRef, useState } from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DownloadSVGPlot } from 'ot-ui';
import Slider from './ClassicAssociationsSlider';
import AssociationTooltip from './AssociationTooltip';
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
  const tasScore = {};
  associations.forEach(association => {
    const diseaseId = association.disease.id;
    if (idToDisease[diseaseId].parentIds.length === 0) {
      tasScore[diseaseId] = association.score;
    }
    const tas = findTas(diseaseId, idToDisease);
    tas.forEach(ta => {
      const assocData = {
        id: diseaseId,
        uniqueId: `${ta}-${diseaseId}`,
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
        score: tasScore[taId],
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
  ensemblId,
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
  const { width: size } = contentRect.bounds;
  const idToDisease = efo.reduce((acc, disease) => {
    acc[disease.id] = disease;
    return acc;
  }, {});

  const hierarchicalData = buildHierarchicalData(assocs, idToDisease);
  const root = d3.hierarchy(hierarchicalData);
  const packLayout = d3
    .pack()
    .size([size, size])
    .padding(node => (node.data.uniqueId === 'EFO_ROOT' ? 17 : 2));
  root.sum(d => d.score);
  packLayout(root);

  return (
    <div ref={measureRef}>
      <DownloadSVGPlot
        svgContainer={svgRef}
        filenameStem={`${symbol}-associated-diseases-bubbles`}
      >
        <Slider value={minScore} onChange={(_, val) => setMinScore(val)} />
        {size ? (
          assocs.length > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              ref={svgRef}
              height={size}
              width={size}
            >
              {root.descendants().map(d => {
                return (
                  <g
                    key={d.data.uniqueId}
                    transform={`translate(${d.x},${d.y})`}
                  >
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
                      <AssociationTooltip
                        ensemblId={ensemblId}
                        efoId={d.data.id}
                        name={d.data.name}
                        score={d.data.score}
                      >
                        <text
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={theme.palette.grey[400]}
                        >
                          <textPath
                            startOffset="50%"
                            xlinkHref={`#${d.data.uniqueId}`}
                          >
                            {d.data.name}
                          </textPath>
                        </text>
                      </AssociationTooltip>
                    ) : d.r > 15 ? (
                      <>
                        <clipPath id={`clip-${d.data.uniqueId}`}>
                          <circle cx="0" cy="0" r={d.r} />
                        </clipPath>
                        <AssociationTooltip
                          ensemblId={ensemblId}
                          efoId={d.data.id}
                          name={d.data.name}
                          score={d.data.score}
                        >
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
                        </AssociationTooltip>
                      </>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          ) : (
            <Typography align="center">
              No associations with score greater than or equal to {minScore}
            </Typography>
          )
        ) : null}
      </DownloadSVGPlot>
      <Legend />
    </div>
  );
}

export default withContentRect('bounds')(ClassicAssociationsBubbles);

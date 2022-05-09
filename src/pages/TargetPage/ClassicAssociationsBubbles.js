import React, { useRef, useState } from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { withContentRect } from 'react-measure';
import { scaleQuantize, pack, hierarchy } from 'd3';

import AssociationTooltip from './AssociationTooltip';
import { colorRange } from '../../constants';
import { DownloadSvgPlot } from '../../components/DownloadSvgPlot';
import Legend from '../../components/Legend';
import Slider from './ClassicAssociationsSlider';

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

const color = scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

function ClassicAssociationsBubbles({
  ensemblId,
  symbol,
  idToDisease,
  associations,
  measureRef,
  contentRect,
}) {
  const [minScore, setMinScore] = useState(0.1);
  const svgRef = useRef(null);
  const theme = useTheme();
  const assocs = associations.filter(assoc => assoc.score >= minScore);
  const { width: size } = contentRect.bounds;

  const hierarchicalData = buildHierarchicalData(assocs, idToDisease);
  const root = hierarchy(hierarchicalData);
  const packLayout = pack()
    .size([size, size])
    .padding(node => (node.data.uniqueId === 'EFO_ROOT' ? 17 : 2));
  root.sum(d => d.score);
  packLayout(root);

  return (
    <>
      <DownloadSvgPlot
        svgContainer={svgRef}
        filenameStem={`${symbol}-associated-diseases-bubbles`}
      >
        <Slider value={minScore} onChange={(_, val) => setMinScore(val)} />
        <Grid
          item
          container
          ref={measureRef}
          md={10}
          justify="center"
          alignItems="center"
          style={{ margin: '0 auto', minHeight: '340px' }}
        >
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
                      <AssociationTooltip
                        ensemblId={ensemblId}
                        efoId={d.data.id}
                        name={d.data.name}
                        score={d.data.score}
                      >
                        <path
                          id={d.data.uniqueId}
                          d={`M 0, ${d.r} a ${d.r},${d.r} 0 1,1 0,-${2 *
                            d.r} a ${d.r},${d.r} 0 1,1 0,${2 * d.r}`}
                          stroke={
                            d.data.uniqueId !== 'EFO_ROOT'
                              ? theme.palette.grey[400]
                              : 'none'
                          }
                          fill={
                            d.data.uniqueId === 'EFO_ROOT'
                              ? theme.palette.grey[50]
                              : d.parent.data.uniqueId === 'EFO_ROOT'
                              ? theme.palette.grey[50]
                              : color(d.data.score)
                          }
                          pointerEvents={
                            d.data.uniqueId === 'EFO_ROOT' ? 'none' : 'auto'
                          }
                        />
                      </AssociationTooltip>
                      {d.data.uniqueId === 'EFO_ROOT' ? null : d.parent &&
                        d.parent.data.uniqueId === 'EFO_ROOT' ? (
                        <text
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={theme.palette.grey[400]}
                          pointerEvents="none"
                        >
                          <textPath
                            startOffset="50%"
                            xlinkHref={`#${d.data.uniqueId}`}
                          >
                            {d.data.name}
                          </textPath>
                        </text>
                      ) : d.r > 15 ? (
                        <>
                          <clipPath id={`clip-${d.data.uniqueId}`}>
                            <circle cx="0" cy="0" r={d.r} />
                          </clipPath>
                          <text
                            clipPath={`url(#clip-${d.data.uniqueId})`}
                            fontSize="11"
                            textAnchor="middle"
                            pointerEvents="none"
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
                        </>
                      ) : null}
                    </g>
                  );
                })}
              </svg>
            ) : (
              <Typography>
                No associations with score greater than or equal to {minScore}
              </Typography>
            )
          ) : null}
        </Grid>
      </DownloadSvgPlot>
      <Legend />
    </>
  );
}

export default withContentRect('bounds')(ClassicAssociationsBubbles);

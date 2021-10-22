import React, { useState, useMemo, useRef } from 'react';
import { max } from 'd3';
import {
  layeringLongestPath,
  decrossTwoLayer,
  coordCenter,
  sugiyama,
  dagStratify,
} from 'd3-dag';
import { withContentRect } from 'react-measure';
import { Grid, Typography } from '@material-ui/core';
import { DownloadSvgPlot } from '../../components/DownloadSvgPlot';
import Legend from '../../components/Legend';
import Slider from './ClassicAssociationsSlider';
import Dag from './Dag';

// find closest ancestors that are also associations
function getParentIds(diseaseId, idToDisease, assocSet) {
  const parentIds = [];
  const queue = [diseaseId];
  const visited = new Set();

  while (queue.length > 0) {
    const id = queue.shift();
    const node = idToDisease[id];

    for (let i = 0; i < node.parentIds.length; i++) {
      const parentId = node.parentIds[i];
      if (!visited.has(parentId)) {
        visited.add(parentId);
        const parentNode = idToDisease[parentId];
        if (assocSet[parentId] || parentNode.parentIds.length === 0) {
          parentIds.push(parentId);
        } else {
          queue.push(parentId);
        }
      }
    }
  }

  return parentIds;
}

function buildDagData(idToDisease, associations, assocSet) {
  const dag = [];
  const tas = new Set();
  associations.forEach(association => {
    const parentIds = getParentIds(
      association.disease.id,
      idToDisease,
      assocSet
    );

    parentIds.forEach(parentId => {
      const node = idToDisease[parentId];
      if (node.parentIds.length === 0 && !assocSet[parentId]) {
        tas.add(parentId);
      }
    });

    dag.push({
      id: association.disease.id,
      name: association.disease.name,
      score: association.score,
      parentIds,
    });
  });

  tas.forEach(id => {
    dag.push({
      id,
      name: idToDisease[id].name,
      parentIds: [],
    });
  });

  return dag;
}

const layering = layeringLongestPath();
const decross = decrossTwoLayer();
const coord = coordCenter();

const helperLayout = sugiyama()
  .layering(layering)
  .decross(decross)
  .coord(coord);

function getMaxLayerCount(dag) {
  helperLayout(dag);

  const counts = {};
  let maxCount = Number.NEGATIVE_INFINITY;

  dag.descendants().forEach(node => {
    const { layer } = node;

    if (counts[layer]) {
      counts[layer]++;
    } else {
      counts[layer] = 1;
    }

    if (counts[layer] > maxCount) {
      maxCount = counts[layer];
    }
  });

  return maxCount;
}

const diameter = 8;
const radius = diameter / 2;

function ClassicAssociationsDAG({
  ensemblId,
  symbol,
  idToDisease,
  associations,
  measureRef,
  contentRect,
}) {
  const svgRef = useRef(null);
  const [minScore, setMinScore] = useState(0.1);
  const [minCommittedScore, setMinCommittedScore] = useState(0.1);
  const { width } = contentRect.bounds;

  const { assocs, height, nodes, xOffset, links, textLimit } = useMemo(
    () => {
      const assocs = associations.filter(
        assoc => assoc.score >= minCommittedScore
      );
      const assocSet = assocs.reduce((acc, assoc) => {
        acc[assoc.disease.id] = assoc;
        return acc;
      }, {});

      const dagData = buildDagData(idToDisease, assocs, assocSet);
      let dag, maxLayerCount, height, layout, nodes, links, xOffset, textLimit;

      if (dagData.length > 0) {
        dag = dagStratify()(dagData);
        maxLayerCount = getMaxLayerCount(dag);
        height = maxLayerCount * 10;
        layout = sugiyama()
          .layering(layering)
          .decross(decross)
          .coord(coord)
          .size([height, width]);

        layout(dag);

        nodes = dag.descendants();
        links = dag.links();

        const separation = width / (max(nodes, d => d.layer) + 1);
        xOffset = separation / 2 - radius;
        textLimit = separation / 8;
      }

      return {
        assocs,
        dag,
        height,
        nodes,
        xOffset,
        links,
        textLimit,
      };
    },
    [associations, idToDisease, minCommittedScore, width]
  );

  return (
    <>
      <DownloadSvgPlot
        svgContainer={svgRef}
        filenameStem={`${symbol}-associated-diseases-dag`}
      >
        <Slider
          value={minScore}
          onChange={(_, val) => setMinScore(val)}
          onChangeCommitted={(_, val) => setMinCommittedScore(val)}
        />
        <Grid
          ref={measureRef}
          item
          container
          justify="center"
          alignItems="center"
          style={{ margin: '0 auto', minHeight: '340px' }}
        >
          {width ? (
            assocs.length > 0 ? (
              <Dag
                ensemblId={ensemblId}
                width={width}
                height={height}
                links={links}
                nodes={nodes}
                xOffset={xOffset}
                textLimit={textLimit}
                svgRef={svgRef}
              />
            ) : (
              <Typography align="center">
                No associations with score greater than or equal to{' '}
                {minCommittedScore}
              </Typography>
            )
          ) : null}
        </Grid>
      </DownloadSvgPlot>
      <Legend />
    </>
  );
}

export default withContentRect('bounds')(ClassicAssociationsDAG);

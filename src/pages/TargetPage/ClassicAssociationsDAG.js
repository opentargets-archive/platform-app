import React, { useState, useMemo } from 'react';
import * as d3Base from 'd3';
import * as d3Dag from 'd3-dag';
import { withContentRect } from 'react-measure';
import { Typography } from '@material-ui/core';
import Slider from './ClassicAssociationsSlider';
import Dag from './Dag';

const d3 = Object.assign({}, d3Base, d3Dag);

function getParentIds(diseaseId, idToDisease, assocSet) {
  const disease = idToDisease[diseaseId];
  const parentIds = new Set();
  const queue = [...disease.parentIds];

  while (queue.length > 0) {
    const parentId = queue.shift();
    const parentNode = idToDisease[parentId];
    if (assocSet[parentId] || parentNode.parentIds.length === 0) {
      parentIds.add(parentId);
    } else {
      for (let i = 0; i < parentNode.parentIds.length; i++) {
        if (!queue.includes(parentNode.parentIds[i])) {
          queue.push(parentNode.parentIds[i]);
        }
      }
    }
  }

  return Array.from(parentIds);
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

const layering = d3.layeringLongestPath();
const decross = d3.decrossTwoLayer();
const coord = d3.coordCenter();

const helperLayout = d3
  .sugiyama()
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
  const [minScore, setMinScore] = useState(0.1);
  const [minCommittedScore, setMinCommittedScore] = useState(0.1);
  const { width } = contentRect.bounds;

  const { assocs, height, nodes, xOffset, links } = useMemo(
    () => {
      const assocs = associations.filter(
        assoc => assoc.score >= minCommittedScore
      );
      const assocSet = assocs.reduce((acc, assoc) => {
        acc[assoc.disease.id] = assoc;
        return acc;
      }, {});

      const dagData = buildDagData(idToDisease, assocs, assocSet);
      let dag,
        maxLayerCount,
        height,
        layout,
        nodes,
        links,
        xOffset,
        textThreshold;

      if (dagData.length > 0) {
        dag = d3.dagStratify()(dagData);
        maxLayerCount = getMaxLayerCount(dag);
        height = maxLayerCount * 10;
        layout = d3
          .sugiyama()
          .layering(layering)
          .decross(decross)
          .coord(coord)
          .size([height, width]);

        layout(dag);

        nodes = dag.descendants();
        links = dag.links();

        const separation = width / (d3.max(nodes, d => d.layer) + 1);
        xOffset = separation / 2 - radius;
      }

      return {
        assocs,
        dag,
        height,
        nodes,
        xOffset,
        links,
      };
    },
    [associations, idToDisease, minCommittedScore, width]
  );

  return (
    <>
      <Slider
        value={minScore}
        onChange={(_, val) => setMinScore(val)}
        onChangeCommitted={(_, val) => setMinCommittedScore(val)}
      />
      <div ref={measureRef}>
        {width ? (
          assocs.length > 0 ? (
            <Dag
              width={width}
              height={height}
              links={links}
              nodes={nodes}
              xOffset={xOffset}
            />
          ) : (
            <Typography align="center">
              No associations with score greater than or equal to{' '}
              {minCommittedScore}
            </Typography>
          )
        ) : null}
      </div>
    </>
  );
}

export default withContentRect('bounds')(ClassicAssociationsDAG);

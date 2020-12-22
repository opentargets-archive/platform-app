import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Description from './Description';
import OntologySubgraph from './OntologySubgraph';
import SectionItem from '../../../components/Section/SectionItem';

const getSubgraph = ({
  efoId,
  nodes,
  therapeuticAreas,
  nodesById,
  upMethod,
  downMethod,
}) => {
  // handle up propagation
  const up = (acc, nodeId, depth) => {
    if (upMethod === 'root' || depth <= upMethod) {
      if (!acc[nodeId]) {
        const node = nodesById[nodeId];
        acc[node.id] = {
          ...node,
          isTherapeuticArea: therapeuticAreas.indexOf(node.id) >= 0,
          nodeType: depth === 0 ? 'chosen' : 'ancestor',
        };
        node.parentIds.forEach(parentId => {
          up(acc, parentId, depth + 1);
        });
      }
    }
    return acc;
  };

  // handle down propagation
  const down = (acc, nodeId, depth) => {
    if (downMethod === 'leaves' || depth <= downMethod) {
      if (!acc[nodeId]) {
        const node = nodesById[nodeId];
        acc[node.id] = {
          ...node,
          isTherapeuticArea: therapeuticAreas.indexOf(node.id) >= 0,
          nodeType: depth === 0 ? 'chosen' : 'descendant',
        };
        const childIds = nodes
          .filter(d => d.parentIds.indexOf(nodeId) >= 0)
          .map(d => d.id);
        childIds.forEach(childId => {
          down(acc, childId, depth + 1);
        });
      }
    }
    return acc;
  };

  // propagate up and down from start node
  const upGraph = up({}, efoId, 0);
  const downGraph = down({}, efoId, 0);

  // merge
  const unprunedGraph = _.merge(upGraph, downGraph);

  // strip parentIds outside the subgraph
  const prunedGraph = {};
  Object.keys(unprunedGraph).forEach(key => {
    const value = unprunedGraph[key];
    const prunedValue = {
      ...value,
      parentIds: value.parentIds.filter(parentId => unprunedGraph[parentId]),
    };
    prunedGraph[key] = prunedValue;
  });

  return prunedGraph;
};

function Body({ definition, id: efoId, label: name }) {
  const [therapeuticAreas, setTherapeuticAreas] = useState(null);
  const [efoNodes, setEfoNodes] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    fetch(
      'https://storage.googleapis.com/open-targets-data-releases/beta-rewrite/static/ontology/therapeutic_area.txt'
    )
      .then(res => res.text())
      .then(text => {
        if (isCurrent) {
          setTherapeuticAreas(text.trim().split('\n'));
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;
    fetch(
      'https://storage.googleapis.com/open-targets-data-releases/beta-rewrite/static/ontology/diseases_efo.jsonl'
    )
      .then(res => res.text())
      .then(lines => {
        if (isCurrent) {
          const nodes = lines
            .trim()
            .split('\n')
            .map(JSON.parse);

          // The efo nodes coming from server don't include the EFO_ROOT node
          // that is necessary to work with d3-dag. So adding it here.
          nodes.push({ id: 'EFO_ROOT', name: 'root', parentIds: [] });
          setEfoNodes(nodes);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <SectionItem
      definition={definition}
      request={{
        loading: !(therapeuticAreas && efoNodes),
        data: { therapeuticAreas, efoNodes },
      }}
      renderDescription={() => <Description name={name} />}
      renderBody={({ therapeuticAreas, efoNodes }) => {
        // make sure that every therapeutic area has as parent the root node
        const nodes = efoNodes?.map(node => {
          const newNode = {
            ...node,
          };

          if (therapeuticAreas.includes(node.id)) {
            newNode.parentIds = ['EFO_ROOT'];
          }

          return newNode;
        });

        const nodesById = nodes?.reduce((acc, d) => {
          acc[d.id] = d;
          return acc;
        }, {});
        const upMethod = 'root';
        const downMethod = 1;
        const subgraph =
          therapeuticAreas &&
          efoNodes &&
          getSubgraph({
            efoId,
            nodes,
            therapeuticAreas,
            nodesById,
            upMethod,
            downMethod,
          });
        return (
          <OntologySubgraph efoId={efoId} name={name} subgraph={subgraph} />
        );
      }}
    />
  );
}

export default Body;

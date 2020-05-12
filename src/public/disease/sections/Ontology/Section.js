import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import OntologySubgraph from './custom/OntologySubgraph';

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

const Section = ({ efoId, name }) => {
  const [therapeuticAreas, setTherapeuticAreas] = useState(null);
  const [efoNodes, setEfoNodes] = useState(null);
  // const { nodes, therapeuticAreas } = data;

  useEffect(() => {
    let isCurrent = true;
    fetch(
      'https://00e9e64bac03d5aa7f8a51cb126776eb75a8fa7ca08cd8ee56-apidata.googleusercontent.com/download/storage/v1/b/open-targets-data-releases/o/20.04%2Foutput%2FtherapeuticAreas.json?qk=AD5uMEsJ1WZh1J8eg8c7UFzzM2I7JsdqMrdg4aH1tPL6OhuU8rcXlfhB76OoOU4G6cxvtUHHm521pUSaNxUEsST03LWdeYQQ8EaSDTT_dghlQcrUr2Kl_nEqQ4dKxL-YX2C9W2AIvM3MKDijvcVHVHlEk6wo-h58IwfgqOoDQA0U1YrBZkPoN87kd32CUgqlajkAYA9j-dx9ku-0eibqce6gVBnaYuy0xSb-DcHutrY4e0CGKW6GkK_N83ZPmc0Mr05RqEmQivR5yVdeqj6AqgNy4aiUfWMbwkA4KXGtGDhsWRzZKNwW1U1aiojIJUynPdSjqbz7NLmku6Mrmk8cqz5n0wzwebBTWGhVkQ65RULT2-m6x_1jOcXzaKzNS3oL0oYWR8pMFELy8enT5jqGtTKDetabSSmMrLfxE7sVW9njCU8DHcSuN9ebs9B5StuODDGbytt88KENkCWKAC6t2GyOEiSq5n5e--iP_qrgTKzqDHWvJfNQelmkEubRxUC8hhBZGIay6wY-ZkkZJohs3azPg4dZXs0_bdjGYuW90us2z7DGAkudcnmlvTQtmaSfi3jm3f3Ty735S9fQVrwSX-kxdf2sP1HmCQoEWfpHDKlTSyk9Snm3Z4cQHtK2noavnnFNxWKKxjTxTMvyCg4l5Q3lGBZtzuWKj56Zu1X5qQm12VZADyuJ_i0vob96ftf6LV6mPbjXvra3tKUdHJcXJNcYfBWj_8vqZOsHYX3WbzMPzzPKi_D1sA3to5VQLjNT2GuGFQxHBiFk2qSbDqQe1UaLnrETMo9n1bK3QgMw36pYqK4gTNGVHW-WFimxBlGpz69Fi-6dYBXnvc4fiLiNoVqreUeHgWw7zA&isca=1'
    )
      .then(res => res.json())
      .then(data => {
        if (isCurrent) {
          setTherapeuticAreas(data);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;
    fetch(
      'https://00e9e64bacaf0939e0b75efff29e10eb1f27046c9465b402db-apidata.googleusercontent.com/download/storage/v1/b/open-targets-data-releases/o/20.04%2Foutput%2Fefos.json?qk=AD5uMEu1R-v6YXrX-0gGQCaiZ4yqocdyAxA_8NZBbF45TTWU8myb2cDg_hvbBeJZ1x0gmZjk0mZT9Mx7hSq2dpjZmlI0UoBRaA80mm_qk6AuXsGj8icHRI-x8HXZVBOM7DsSSPHD6OYebLdUjXP8Lcyb7IUs_Qin6JaYCM48OLNIEiHUBCbkX0az8u8Go2OtyUEVq8UezKaCo5ZdULHninj06O6XSdsmaq72rP6qxLdeejfFkIwnYQU35Wi79V--bJCu6zpm20AUg1BGwbbhW267asvVojm2OmdUc98x8VfB9KSsLezTX3lufttVEReGedT0WVosm4UdU5eCR-TegLgDwbYVcCsbzi-zfdtm1C6gu5t0MIiLXX79ogeUDB_NYGMws1GUmcWCa5XHJ7S3ALwjW0SPZFx7dzjV1e2Feueo9nwHUaMeDltpHX67PECJ81P2AhLM5N07pzkL88go6qUYx1RUEZClldylGdE35CZRRj0L_oV_ysu-oNjq-giZsa5sa1TOmNJweHIfh9rI1F0bmVd7yXfSO56I-xaWM3g0bYq9Rh3SXNZuICh8n9e-QkQQk7dfwyPGUPeOvJx6qly5GploFBzydOlzsDCNDTDA5GvfE2M7vKQ6N5URVE9hfnnsvJsL0pkTQZKdiZtIEMjnsR7h03Cr5Dxpb6W9ZXbGwp34J41W2v1cWlSVfryyipPogPEnwSJgyrE2-8SNJODQ8ihTYa8hqeBax_rNwEXhkwWEBmikVfeZhR3KWosc1KelXN2meMCXQ3J22CRk5CyiG3pKMb7SNEQFjHNPs2WzHj_4nRdqjT1nTnoukEoq4XdrDZvRE5X3UHeUsyok9oZA20uxXp8OMg&isca=1'
    )
      .then(res => res.json())
      .then(nodes => {
        if (isCurrent) {
          setEfoNodes([
            { id: 'EFO_ROOT', name: 'root', parentIds: [] },
            ...nodes,
          ]);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (!(therapeuticAreas && efoNodes)) return null;

  let nodes = efoNodes.map(node => {
    const newNode = {
      ...node,
    };

    if (therapeuticAreas.includes(node.id)) {
      newNode.parentIds = ['EFO_ROOT'];
    }

    return newNode;
  });

  // nodes = [

  const nodesById = nodes.reduce((acc, d) => {
    acc[d.id] = d;
    return acc;
  }, {});
  const upMethod = 'root';
  const downMethod = 1;
  const subgraph = getSubgraph({
    efoId,
    nodes,
    therapeuticAreas,
    nodesById,
    upMethod,
    downMethod,
  });

  return <OntologySubgraph efoId={efoId} name={name} subgraph={subgraph} />;
};

export default Section;

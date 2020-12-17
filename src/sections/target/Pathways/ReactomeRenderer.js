import React from 'react';
import { useEffect } from 'react';

function ReactomeRenderer({ symbol, reactomeId }) {
  useEffect(
    () => {
      try {
        const diagram = window.Reactome.Diagram.create({
          placeHolder: 'reactome',
          width: 800,
          height: 600,
        });

        diagram.loadDiagram(reactomeId);
        diagram.onDiagramLoaded(function() {
          diagram.flagItems(symbol);
        });
      } catch {
        console.error('Something went wrong with Reactome');
      }
    },
    [symbol, reactomeId]
  );

  return <div id="reactome" />;
}

export default ReactomeRenderer;

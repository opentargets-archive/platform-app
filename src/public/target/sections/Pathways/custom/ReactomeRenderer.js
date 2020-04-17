/* global Reactome */

import React from 'react';

class ReactomeRenderer extends React.Component {
  componentDidMount() {
    try {
      const { symbol, reactomeId } = this.props;
      const diagram = Reactome.Diagram.create({
        placeHolder: 'reactome',
        width: 800,
        height: 600,
      });

      diagram.loadDiagram(reactomeId);
      diagram.onDiagramLoaded(function () {
        diagram.flagItems(symbol);
      });
      this.diagram = diagram;
    } catch {
      console.log('Something went wrong with Reactome');
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { reactomeId } = this.props;
      if (reactomeId !== prevProps.reactomeId) {
        this.diagram.loadDiagram(reactomeId);
      }
    } catch {
      console.log('Something went wrong with Reactome');
    }
  }
  render() {
    return <div id="reactome" />;
  }
}

export default ReactomeRenderer;

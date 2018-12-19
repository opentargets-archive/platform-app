/* global Reactome */

import React from 'react';

class ReactomeRenderer extends React.Component {
  componentDidMount() {
    const { symbol, reactomeId } = this.props;
    const diagram = Reactome.Diagram.create({
      proxyPrefix: 'https://www.reactome.org',
      placeHolder: 'reactome',
      width: 800,
      height: 600,
    });

    diagram.loadDiagram(reactomeId);
    diagram.onDiagramLoaded(function(pathwayId) {
      diagram.flagItems(symbol);
    });
    this.diagram = diagram;
  }
  componentDidUpdate(prevProps) {
    const { reactomeId } = this.props;
    if (reactomeId !== prevProps.reactomeId) {
      this.diagram.loadDiagram(reactomeId);
    }
  }
  render() {
    return <div id="reactome" />;
  }
}

export default ReactomeRenderer;

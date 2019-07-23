import React from 'react';
import * as d3 from 'd3';

import 'ProtVista/build/css/main.css';

class ProtVistaRenderer extends React.Component {
  state = {};
  componentDidMount() {
    import('ProtVista').then(({ default: ProtVista }) => {
      this.setState({ ProtVista });
    });
  }
  componentDidUpdate() {
    const { ProtVista } = this.state;
    if (ProtVista) {
      // remove any previous content
      d3.select('#protvista')
        .selectAll('*')
        .remove();

      // restart the plugin
      const { uniprotId } = this.props;
      this.protVista = new ProtVista({
        el: '#protvista',
        uniprotacc: uniprotId,
        exclusions: ['seqInfo'],
      });
    }
  }
  render() {
    return <div id="protvista" />;
  }
}

export default ProtVistaRenderer;

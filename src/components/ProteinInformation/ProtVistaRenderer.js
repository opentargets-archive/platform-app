import React from 'react';
import ProtVista from 'ProtVista';
import 'ProtVista/build/css/main.css';

class ProtVistaRenderer extends React.Component {
  componentDidMount() {
    const { uniprotId } = this.props;
    this.protVista = new ProtVista({
      el: '#protvista',
      uniprotacc: uniprotId,
      exclusions: ['seqInfo'],
    });
  }
  render() {
    return <div id="protvista" />;
  }
}

export default ProtVistaRenderer;

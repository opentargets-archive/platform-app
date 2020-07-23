import React from 'react';
import ProtvistaUniprot from 'protvista-uniprot';
import 'litemol/dist/css/LiteMol-plugin.css';

function loadWebComponent(name, wc) {
  if (window.customElements && !window.customElements.get(name)) {
    window.customElements.define(name, wc);
  }
}

loadWebComponent('protvista-uniprot', ProtvistaUniprot);

const ProtVistaRenderer = ({ uniprotId }) => {
  return <protvista-uniprot accession={uniprotId} />;
};

export default ProtVistaRenderer;

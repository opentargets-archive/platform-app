import React from 'react';
import TSnePlotWidget from 'ebi-scea-tsne-widget';

const TSNETab = ({ ensgId }) => (
  <div>
    <TSnePlotWidget experimentAccession="E-ENAD-15" geneId={ensgId} />
  </div>
);

export default TSNETab;

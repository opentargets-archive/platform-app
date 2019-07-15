import React from 'react';
import TSnePlotWidget from 'ebi-scea-tsne-widget';

const TSNETab = () => (
  <div>
    <TSnePlotWidget experimentAccession="E-ENAD-15" geneId="ENSG00000091831" />
  </div>
);

export default TSNETab;

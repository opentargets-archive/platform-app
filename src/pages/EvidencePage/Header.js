import React from 'react';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

import HeaderBase from '../../components/Header';

function EvidenceHeader({ loading, symbol, name }) {
  return (
    <HeaderBase
      loading={loading}
      title={`Evidence for ${symbol} in ${name}`}
      Icon={faProjectDiagram}
    />
  );
}

export default EvidenceHeader;

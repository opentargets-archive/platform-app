import React from 'react';

import Header from '../common/Header';
import { faDna } from '@fortawesome/free-solid-svg-icons';

const EvidenceHeader = ({ target, disease }) => (
  <Header
    title={`Evidence for ${target.symbol} in ${disease.name}`}
    Icon={faDna}
  />
);

export default EvidenceHeader;

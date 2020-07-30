import React from 'react';
import { faDna } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';

const EvidenceHeader = ({ target, disease }) => (
  <Header
    title={`Evidence for ${target.symbol} in ${disease.name}`}
    Icon={faDna}
  />
);

export default EvidenceHeader;

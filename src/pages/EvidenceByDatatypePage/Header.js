import React from 'react';

import Header from '../../components/Header';
import TargetIcon from '../../assets/TargetIcon';

const EvidenceHeader = ({ target, disease }) => (
  <Header
    title={`Evidence for ${target.symbol} in ${disease.name}`}
    Icon={TargetIcon}
  />
);

export default EvidenceHeader;

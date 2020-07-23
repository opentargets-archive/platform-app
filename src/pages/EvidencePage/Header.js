import React from 'react';

import Header from '../common/Header';
import TargetIcon from '../../icons/TargetIcon';

const EvidenceHeader = ({ target, disease }) => (
  <Header
    title={`Evidence for ${target.symbol} in ${disease.name}`}
    Icon={TargetIcon}
  />
);

export default EvidenceHeader;

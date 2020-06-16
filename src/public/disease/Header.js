import React from 'react';
import Header from '../common/Header';
import DiseaseIcon from '../../icons/DiseaseIcon';
import EFO from './externalLinks/EFO';

const DiseaseHeader = ({ efoId, name }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={DiseaseIcon}
    externalLinks={<EFO efoId={efoId} first />}
    rightContent={null}
  />
);

export default DiseaseHeader;

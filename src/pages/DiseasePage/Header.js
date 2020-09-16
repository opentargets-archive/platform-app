import React from 'react';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header';
import EFO from './externalLinks/EFO';

const DiseaseHeader = ({ efoId, name }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={faStethoscope}
    externalLinks={<EFO efoId={efoId} first />}
    rightContent={null}
  />
);

export default DiseaseHeader;

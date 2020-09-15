import React from 'react';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import HeaderBase from '../../components/Header';
import EFO from '../../components/ExternalLink/EFO';

const Header = ({ efoId, name }) => (
  <HeaderBase
    title={name}
    Icon={faStethoscope}
    externalLinks={<EFO efoId={efoId} first />}
  />
);

export default Header;

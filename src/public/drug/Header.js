import React from 'react';

import Header from '../common/Header';
import DrugIcon from '../../icons/DrugIcon';
import ChEMBL from './externalLinks/ChEMBL';

const DrugHeader = ({ chemblId, name }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={DrugIcon}
    externalLinks={<ChEMBL chemblId={chemblId} first />}
  />
);

export default DrugHeader;

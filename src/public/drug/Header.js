import React from 'react';

import Header from '../common/Header';
import TargetIcon from '../../icons/TargetIcon';
import ChEMBL from './externalLinks/ChEMBL';

const DrugHeader = ({ chemblId, name }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={TargetIcon}
    externalLinks={
      <React.Fragment>
        <ChEMBL chemblId={chemblId} first />
      </React.Fragment>
    }
  />
);

export default DrugHeader;

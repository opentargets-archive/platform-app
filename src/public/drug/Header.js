import React from 'react';

import Header from '../common/Header';
import TargetIcon from '../../icons/TargetIcon';
import ChEMBL from './externalLinks/ChEMBL';
import WithdrawnNotice from './WithdrawnNotice';

const DrugHeader = ({ chemblId, name, hasBeenWithdrawn, withdrawnNotice }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={TargetIcon}
    externalLinks={
      <React.Fragment>
        <ChEMBL chemblId={chemblId} first />
      </React.Fragment>
    }
    rightContent={
      <WithdrawnNotice {...{ hasBeenWithdrawn, withdrawnNotice }} />
    }
  />
);

export default DrugHeader;

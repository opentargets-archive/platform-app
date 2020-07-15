import React from 'react';
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';

import Header from '../common/Header';
import ChEMBL from './externalLinks/ChEMBL';

const DrugHeader = ({ chemblId, name }) => (
  <Header
    title={name}
    subtitle={null}
    Icon={faPrescriptionBottleAlt}
    externalLinks={<ChEMBL chemblId={chemblId} first />}
  />
);

export default DrugHeader;

import React from 'react';
import { SearchOption } from 'ot-ui';

const Option = ({ data }) => {
  switch (data.groupType) {
    case 'gene':
      return (
        <SearchOption heading={data.symbol} subheading={''} extra={data.id} />
      );
    case 'disease':
      return (
        <SearchOption heading={data.name} subheading={''} extra={data.id} />
      );
    default:
      throw Error('Unexpected groupType. Should be gene or disease.');
  }
};

export default Option;

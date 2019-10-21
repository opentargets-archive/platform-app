import React from 'react';
import { SearchOption } from 'ot-ui';

const Option = ({ data }) => {
  switch (data.groupType) {
    case 'target':
      return <SearchOption heading={data.approvedSymbol} />;
    case 'drug':
      return <SearchOption heading={data.name} />;
    default:
      throw Error('Unexpected group type');
  }
};

export default Option;

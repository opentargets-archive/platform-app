import React, { Fragment } from 'react';
import { SearchOption } from 'ot-ui';
import Typography from '@material-ui/core/Typography';

const TopHitOption = ({ data }) => {
  const { approvedSymbol, approvedName, __typename } = data;
  switch (__typename) {
    case 'Target':
      const {
        approvedSymbol,
        approvedName,
        proteinAnnotations: { functions },
      } = data;
      return (
        <div>
          <Typography variant="h6" color="primary">
            {approvedSymbol}
          </Typography>
          <Typography>{approvedName}</Typography>
          <Typography>{functions[0]}</Typography>
        </div>
      );
    case 'Drug':
      const { name } = data;
      return <div>{name}</div>;
    case 'Disease':
      return <div>Disease</div>;
    default:
      return <div>Unknown entity</div>;
  }
};

const Option = ({ data }) => {
  switch (data.groupType) {
    case 'target':
      return <SearchOption heading={data.approvedSymbol} />;
    case 'drug':
      return <SearchOption heading={data.name} />;
    case 'topHit':
      return <TopHitOption data={data} />;
    default:
      throw Error('Unexpected group type');
  }
};

export default Option;

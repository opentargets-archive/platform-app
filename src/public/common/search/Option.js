import React from 'react';
import Typography from '@material-ui/core/Typography';

import TargetIcon from '../../../icons/TargetIcon';
import DiseaseIcon from '../../../icons/DiseaseIcon';
import DrugIcon from '../../../icons/DrugIcon';

const Search = ({ data }) => <Typography>Search for: {data.name}</Typography>;

const TopHitDisease = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <DiseaseIcon /> {data.name}
    </Typography>
    <Typography variant="caption" display="block" noWrap>
      {data.description}
    </Typography>
  </>
);

const TopHitDrug = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <DrugIcon /> {data.name}
    </Typography>
    {data.mechanismsOfAction ? (
      <Typography variant="caption" display="block" noWrap>
        {data.mechanismsOfAction.rows
          .map((row) => row.mechanismOfAction)
          .join(', ')}
      </Typography>
    ) : null}
  </>
);

const TopHitTarget = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <TargetIcon /> {data.approvedSymbol}
    </Typography>{' '}
    <Typography>{data.approvedName}</Typography>
    {data.proteinAnnotations ? (
      <Typography variant="caption" display="block" noWrap>
        {data.proteinAnnotations.functions[0]}
      </Typography>
    ) : null}
  </>
);

const Disease = ({ data }) => (
  <Typography variant="subtitle2" display="inline">
    {data.name}
  </Typography>
);

const Drug = ({ data }) => (
  <Typography variant="subtitle2" display="inline">
    {data.name}
  </Typography>
);

const Target = ({ data }) => (
  <>
    <Typography variant="subtitle2" display="inline">
      {data.approvedSymbol}
    </Typography>{' '}
    <Typography variant="caption" color="textSecondary" display="inline">
      {data.approvedName}
    </Typography>
  </>
);

const Option = ({ data }) => {
  const optionTypes = {
    search: { any: Search },
    topHit: { disease: TopHitDisease, drug: TopHitDrug, target: TopHitTarget },
    normal: { disease: Disease, drug: Drug, target: Target },
  };

  const OptionType = optionTypes[data.type][data.entity];

  return <OptionType data={data} />;
};

export default Option;

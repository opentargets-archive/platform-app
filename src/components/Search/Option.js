import React from 'react';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDna,
  faPrescriptionBottleAlt,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';

const Search = ({ data }) => <Typography>Search for: {data.name}</Typography>;

const TopHitDisease = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <FontAwesomeIcon icon={faStethoscope} size="xs" /> {data.name}
    </Typography>
    <Typography variant="caption" display="block" noWrap>
      {data.description}
    </Typography>
  </>
);

const TopHitDrug = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <FontAwesomeIcon icon={faPrescriptionBottleAlt} size="xs" /> {data.name}
    </Typography>
    {data.mechanismsOfAction ? (
      <Typography variant="caption" display="block" noWrap>
        {data.mechanismsOfAction.rows
          .map(row => row.mechanismOfAction)
          .join(', ')}
      </Typography>
    ) : null}
  </>
);

const TopHitTarget = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <FontAwesomeIcon icon={faDna} size="xs" /> {data.approvedSymbol}
    </Typography>{' '}
    <Typography display="block" noWrap>
      {data.approvedName}
    </Typography>
    <Typography variant="caption" display="block" noWrap>
      {data.functionDescriptions[0]}
    </Typography>
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

const optionTypes = {
  search: { any: Search },
  topHit: { disease: TopHitDisease, drug: TopHitDrug, target: TopHitTarget },
  normal: { disease: Disease, drug: Drug, target: Target },
};

const Option = ({ data }) => {
  const OptionType = optionTypes[data.type][data.entity];

  return <OptionType data={data} />;
};

export default Option;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import TargetIcon from '../../../icons/TargetIcon';
import DiseaseIcon from '../../../icons/DiseaseIcon';
import DrugIcon from '../../../icons/DrugIcon';

const TargetOption = ({ data }) => (
  <>
    <Typography variant="subtitle2" display="inline">
      {data.approvedSymbol}
    </Typography>{' '}
    <Typography variant="caption" color="textSecondary" display="inline">
      {data.approvedName}
    </Typography>
  </>
);

const DiseaseOption = ({ data }) => (
  <Typography variant="subtitle2">{data.name}</Typography>
);

const DrugOption = ({ data }) => (
  <Typography variant="subtitle2">{data.name}</Typography>
);

const TargetTopHit = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <TargetIcon />
      {data.approvedSymbol}
    </Typography>{' '}
    <Typography>{data.approvedName}</Typography>
    {data.proteinAnnotations ? (
      <Typography variant="caption" display="block" noWrap>
        {data.proteinAnnotations.functions[0]}
      </Typography>
    ) : null}
  </>
);

const DiseaseTopHit = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <DiseaseIcon />
      {data.name}
    </Typography>
    <Typography variant="caption" display="block" noWrap>
      {data.description}
    </Typography>
  </>
);

const DrugTopHit = ({ data }) => (
  <>
    <Typography variant="h4" color="primary">
      <DrugIcon />
      {data.name}
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

const TopHit = ({ data }) =>
  data.__typename === 'Target' ? (
    <TargetTopHit data={data} />
  ) : data.__typename === 'Disease' ? (
    <DiseaseTopHit data={data} />
  ) : (
    <DrugTopHit data={data} />
  );

const Option = (props) => {
  const { innerRef, innerProps, isFocused, data, theme } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? theme.colors.neutral10 : null,
        padding: '0 8px 0 8px',
        cursor: 'pointer',
      }}
    >
      {data.entity === 'search' ? (
        <Typography>Search for: {data.value}</Typography>
      ) : data.entity === 'topHit' ? (
        <TopHit data={data.object} />
      ) : data.entity === 'target' ? (
        <TargetOption data={data.object} />
      ) : data.entity === 'disease' ? (
        <DiseaseOption data={data.object} />
      ) : (
        <DrugOption data={data.object} />
      )}
    </div>
  );
};

export default Option;

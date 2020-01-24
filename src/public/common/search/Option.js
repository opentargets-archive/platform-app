import React from 'react';
import Typography from '@material-ui/core/Typography';
import TargetIcon from '../../../icons/TargetIcon';
import DiseaseIcon from '../../../icons/DiseaseIcon';
import DrugIcon from '../../../icons/DrugIcon';

const TargetOption = ({ data }) => {
  return (
    <>
      <Typography variant="subtitle2" inline>
        {data.approvedSymbol}
      </Typography>{' '}
      <Typography variant="caption" color="textSecondary" inline>
        {data.approvedName}
      </Typography>
    </>
  );
};

const DiseaseOption = ({ data }) => {
  return <Typography variant="subtitle2">{data.name}</Typography>;
};

const DrugOption = ({ data }) => {
  return <Typography variant="subtitle2">{data.name}</Typography>;
};

const TargetTopHit = ({ data }) => {
  return (
    <>
      <Typography variant="h4" color="primary">
        <TargetIcon />
        {data.approvedSymbol}
      </Typography>{' '}
      <Typography>{data.approvedName}</Typography>
      <Typography variant="caption" noWrap>
        {data.proteinAnnotations.functions[0]}
      </Typography>
    </>
  );
};

const DiseaseTopHit = ({ data }) => {
  return (
    <>
      <Typography variant="h4" color="primary">
        <DiseaseIcon />
        {data.name}
      </Typography>
      <Typography variant="caption" noWrap>
        {data.description}
      </Typography>
    </>
  );
};

const DrugTopHit = ({ data }) => {
  const { rows = [] } = data.mechanismsOfAction;

  return (
    <>
      <Typography variant="h4" color="primary">
        <DrugIcon />
        {data.name}
      </Typography>
      <Typography variant="caption" noWrap>
        {rows.map(row => row.mechanismOfAction).join(', ')}
      </Typography>
    </>
  );
};

const TopHit = ({ data }) => {
  return data.__typename === 'Target' ? (
    <TargetTopHit data={data} />
  ) : data.__typename === 'Disease' ? (
    <DiseaseTopHit data={data} />
  ) : (
    <DrugTopHit data={data} />
  );
};

const Option = props => {
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
        <Typography>{data.label}</Typography>
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

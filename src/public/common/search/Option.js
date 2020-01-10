import React from 'react';
import Typography from '@material-ui/core/Typography';

const TargetOption = ({ innerRef, innerProps, isFocused, data, theme }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? theme.colors.neutral10 : null,
        padding: '0 8px 0 8px',
      }}
    >
      <Typography variant="subtitle2" style={{ display: 'inline-block' }}>
        {data.approvedSymbol}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        style={{ display: 'inline-block', marginLeft: '8px' }}
      >
        {data.approvedName}
      </Typography>
    </div>
  );
};

const DiseaseOption = ({ innerRef, innerProps, isFocused, data, theme }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? theme.colors.neutral10 : null,
        padding: '0 8px 0 8px',
      }}
    >
      <Typography variant="subtitle2">{data.name}</Typography>
    </div>
  );
};

const DrugOption = ({ innerRef, innerProps, isFocused, data, theme }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? theme.colors.neutral10 : null,
        padding: '0 8px 0 8px',
      }}
    >
      <Typography variant="subtitle2">{data.name}</Typography>
    </div>
  );
};

const TargetTopHit = ({ data }) => {
  return (
    <>
      <Typography variant="h6" color="primary">
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
      <Typography variant="h6" color="primary">
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
      <Typography variant="h6" color="primary">
        {data.name}
      </Typography>
      <Typography variant="caption" noWrap>
        {rows.map(row => row.mechanismOfAction).join(', ')}
      </Typography>
    </>
  );
};

const TopHit = ({ data, innerRef, innerProps, isFocused, theme }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? theme.colors.neutral10 : null,
        padding: '0 8px 0 8px',
      }}
    >
      {data.__typename === 'Target' ? (
        <TargetTopHit data={data} />
      ) : data.__typename === 'Disease' ? (
        <DiseaseTopHit data={data} />
      ) : (
        <DrugTopHit data={data} />
      )}
    </div>
  );
};

const Option = props => {
  const { innerRef, innerProps, isFocused, data, theme } = props;

  switch (data.entityType) {
    case 'search':
      return (
        <div
          ref={innerRef}
          {...innerProps}
          style={{
            backgroundColor: isFocused ? theme.colors.neutral10 : null,
            padding: '0 8px 0 8px',
          }}
        >
          {data.label}
        </div>
      );
    case 'topHit':
      return <TopHit {...props} />;
    case 'target':
      return <TargetOption {...props} />;
    case 'disease':
      return <DiseaseOption {...props} />;
    default:
      return <DrugOption {...props} />;
  }
};

export default Option;

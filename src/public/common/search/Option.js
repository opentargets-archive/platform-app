import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const TargetOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
      style={{ padding: '0 8px 0 8px' }}
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
    </MenuItem>
  );
};

const DiseaseOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
      style={{ padding: '0 8px 0 8px' }}
    >
      <Typography variant="subtitle2">{data.name}</Typography>
    </MenuItem>
  );
};

const DrugOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
      style={{ padding: '0 8px 0 8px' }}
    >
      <Typography variant="subtitle2">{data.name}</Typography>
    </MenuItem>
  );
};

const TargetTopHit = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        height: '70px',
        padding: '0 8px 0 8px',
      }}
      {...innerProps}
    >
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        <Typography variant="h6" color="primary">
          {data.approvedSymbol}
        </Typography>{' '}
        <Typography>{data.approvedName}</Typography>
        <Typography variant="caption" noWrap>
          {data.proteinAnnotations.functions[0]}
        </Typography>
      </div>
    </MenuItem>
  );
};

const DiseaseTopHit = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        height: '60px',
        padding: '0 8px 0 8px',
      }}
      {...innerProps}
    >
      <div style={{ overflow: 'hidden' }}>
        <Typography variant="h6" color="primary">
          {data.name}
        </Typography>
        <Typography variant="caption" noWrap>
          {data.description}
        </Typography>
      </div>
    </MenuItem>
  );
};

const DrugTopHit = ({ innerRef, innerProps, isFocused, data }) => {
  const { rows = [] } = data.mechanismsOfAction;

  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        height: '60px',
        padding: '0 8px 0 8px',
      }}
      {...innerProps}
    >
      <div style={{ overflow: 'hidden' }}>
        <Typography variant="h6" color="primary">
          {data.name}
        </Typography>
        <Typography variant="caption" noWrap>
          {rows.map(row => row.mechanismOfAction).join(', ')}
        </Typography>
      </div>
    </MenuItem>
  );
};

const TopHit = props => {
  const { data } = props;
  return (
    <>
      {data.__typename === 'Target' ? (
        <TargetTopHit {...props} />
      ) : data.__typename === 'Disease' ? (
        <DiseaseTopHit {...props} />
      ) : (
        <DrugTopHit {...props} />
      )}
    </>
  );
};

const Option = props => {
  const { innerRef, innerProps, isFocused, data } = props;

  switch (data.entityType) {
    case 'search':
      return (
        <MenuItem
          buttonRef={innerRef}
          selected={isFocused}
          component="div"
          style={{ padding: '0 8px 0 8px' }}
          {...innerProps}
        >
          {data.label}
        </MenuItem>
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

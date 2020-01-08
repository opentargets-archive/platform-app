import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Clampy from '@clampy-js/react-clampy';

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

const TargetTopHit = ({ data }) => {
  return (
    <div>
      <Typography variant="h6" color="primary">
        {data.approvedSymbol}
      </Typography>{' '}
      <Typography>{data.approvedName}</Typography>
      <Typography>{data.__typename}</Typography>
      <Clampy clampSize="3">{data.proteinAnnotations.functions[0]}</Clampy>
    </div>
  );
};

const DiseaseTopHit = ({ data }) => {
  return (
    <div>
      <Typography variant="h6" color="primary">
        {data.name}
      </Typography>
      <Typography>Disease</Typography>
      <Typography>{data.description}</Typography>
    </div>
  );
};

const DrugTopHit = () => {
  return <div>Drug topHit</div>;
};

const TopHit = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{ height: '150px', whiteSpace: 'normal', padding: '0 8px 0 8px' }}
      {...innerProps}
    >
      {data.__typename === 'Target' ? (
        <TargetTopHit data={data} />
      ) : data.__typename === 'Disease' ? (
        <DiseaseTopHit data={data} />
      ) : (
        <DrugTopHit data={data} />
      )}
    </MenuItem>
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

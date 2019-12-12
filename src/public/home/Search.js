import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { loader } from 'graphql.macro';
import AsyncSelect from 'react-select/lib/Async';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Clampy from '@clampy-js/react-clampy';
import { defaultTheme } from 'ot-ui';

import introspectionQueryResultData from './fragmentTypes.json';

const SEARCH_QUERY = loader('./SearchQuery.gql');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

const groupOptions = (searchData, inputValue) => {
  return [
    {
      label: 'Search: ',
      options: [
        {
          value: inputValue,
          label: inputValue,
          entityType: 'search',
        },
      ],
    },
    {
      label: 'Top Hit',
      options: searchData.topHit
        ? [
            {
              ...searchData.topHit,
              entityType: 'topHit',
            },
          ]
        : [],
    },
    {
      label: 'Targets',
      options: searchData.targets.map(target => {
        return {
          ...target,
          entityType: 'target',
        };
      }),
    },
    {
      label: 'Diseases',
      options: searchData.diseases.map(disease => {
        return {
          ...disease,
          entityType: 'disease',
        };
      }),
    },
    {
      label: 'Drugs',
      options: searchData.drugs.map(drug => {
        return {
          ...drug,
          entityType: 'drug',
        };
      }),
    },
  ];
};

const TargetOption = ({ innerRef, innerProps, isFocused, data }) => {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
    >
      <Typography variant="subtitle1" style={{ display: 'inline-block' }}>
        {data.approvedSymbol}
      </Typography>
      <Typography
        variant="subtitle2"
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
    >
      {data.name}
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
    >
      {data.name}
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
      style={{ height: '150px', whiteSpace: 'normal' }}
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

const customStyles = {
  groupHeading: base => {
    return {
      ...base,
      borderBottom: `1px solid ${defaultTheme.palette.secondary.main}`,
      color: defaultTheme.palette.secondary.main,
      padding: '0 0.5rem',
      fontSize: '0.75rem',
    };
  },
};

class Search extends Component {
  selectRef = React.createRef();

  loadOptions = inputValue => {
    if (inputValue.length < 3) {
      return;
    }

    return client
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue, page: { index: 0, size: 9 } },
      })
      .then(res => groupOptions(res.data.search, inputValue));
  };

  handleOnChange = (data, { action }) => {
    if (action === 'select-option') {
      const { history } = this.props;

      if (data.entityType === 'search') {
        const { inputValue } = this.selectRef.current.state;
        history.push(`/search?q=${inputValue}`);
      } else if (data.entityType === 'topHit') {
        history.push(`${data.__typename.toLowerCase()}/${data.id}`);
      } else {
        history.push(`/${data.entityType}/${data.id}`);
      }
    }
  };

  render() {
    return (
      <AsyncSelect
        ref={this.selectRef}
        cacheOptions
        loadOptions={this.loadOptions}
        onChange={this.handleOnChange}
        components={{ Option }}
        styles={customStyles}
      />
    );
  }
}

export default withRouter(Search);

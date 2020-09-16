import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import Associations from './Associations';
import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import Profile from './Profile';

const TARGET_QUERY = gql`
  query TargetQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      approvedName
      bioType
      hgncId
      nameSynonyms
      symbolSynonyms
      proteinAnnotations {
        id
        functions
      }
    }
  }
`;

const TargetPage = ({ history, location, match }) => {
  const handleChange = (event, value) => {
    if (value.indexOf('http') === 0) {
      // navigte to external page: first store current page
      // for back button to work correctly
      // TODO: this link will be removed after alpha/beta
      history.push(match.url);
      window.location.replace(value);
    } else {
      const path = value === 'overview' ? match.url : `${match.url}/${value}`;
      history.push(path);
    }
  };

  const tab = location.pathname.endsWith('associations')
    ? location.pathname.split('/').pop()
    : 'overview';

  const { ensgId } = match.params;

  const { loading, error, data } = useQuery(TARGET_QUERY, {
    variables: { ensgId },
  });

  if (loading || error) return null;

  const {
    approvedSymbol,
    approvedName,
    proteinAnnotations,
    symbolSynonyms,
  } = data.target;
  const uniprotId = proteinAnnotations ? proteinAnnotations.id : null;
  const description =
    proteinAnnotations && proteinAnnotations.functions
      ? proteinAnnotations.functions[0]
      : null;

  return (
    <BasePage>
      <Helmet>
        <title>{approvedSymbol}</title>
      </Helmet>
      <Header
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={approvedSymbol}
        name={approvedName}
      />
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="overview" label="Profile" />
        <Tab
          value={`https://www.targetvalidation.org/target/${ensgId}`}
          label="View this page in the classic view"
        />
        <Tab
          value={`https://www.targetvalidation.org/target/${ensgId}/associations`}
          label="View associated diseases"
        />
      </Tabs>
      <Switch>
        <Route
          path={`${match.path}/classic-associations`}
          render={() => (
            <ClassicAssociations
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
            />
          )}
        />
        <Route
          path={`${match.path}/associations`}
          render={() => (
            <Associations
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
            />
          )}
        />
        <Route
          path={match.path}
          render={() => (
            <Profile
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={approvedSymbol}
              name={approvedName}
              synonyms={symbolSynonyms}
              description={description}
            />
          )}
        />
      </Switch>
    </BasePage>
  );
};

export default TargetPage;

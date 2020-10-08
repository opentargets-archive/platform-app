import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import BasePage from '../../components/BasePage';
import ClassicAssociations from './ClassicAssociations';
import Header from './Header';
import { oldPlatformUrl } from '../../constants';
import Profile from './Profile';
import { RoutingTab, RoutingTabs } from '../../components/RoutingTabs';

const TARGET_PAGE_QUERY = gql`
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
  const { ensgId } = match.params;

  const { loading, data } = useQuery(TARGET_PAGE_QUERY, {
    variables: { ensgId },
  });

  if (loading) return null;
  if (data && !data.target) {
    return <Redirect to={{ pathname: '/notFoundPage' }} />;
  }

  const { approvedSymbol: symbol, approvedName: name } = data.target;
  const uniprotId = data.target.proteinAnnotations?.id;
  const description = data.target.proteinAnnotations?.functions?.[0];
  const synonyms = data.target.symbolSynonyms;

  return (
    <BasePage>
      <Helmet>
        <title>{symbol}</title>
      </Helmet>
      <Header
        ensgId={ensgId}
        uniprotId={uniprotId}
        symbol={symbol}
        name={name}
      />
      <RoutingTabs>
        <RoutingTab
          label="Associated diseases"
          path="/target/:ensgId/associations"
          component={() => (
            <ClassicAssociations
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={symbol}
              name={name}
            />
          )}
        />
        <RoutingTab
          label="Profile"
          path="/target/:ensgId"
          component={() => (
            <Profile
              ensgId={ensgId}
              uniprotId={uniprotId}
              symbol={symbol}
              name={name}
              synonyms={synonyms}
              description={description}
            />
          )}
        />
        <RoutingTab
          label="Classic view"
          url={`${oldPlatformUrl}/target/${ensgId}/associations`}
        />
      </RoutingTabs>
    </BasePage>
  );
};

export default TargetPage;

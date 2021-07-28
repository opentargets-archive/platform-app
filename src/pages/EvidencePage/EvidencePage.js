import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import BasePage from '../../components/BasePage';
import ScrollToTop from '../../components/ScrollToTop';

import Header from './Header';
import NotFoundPage from '../NotFoundPage';
import Profile from './Profile';

const EVIDENCE_PAGE_QUERY = loader('./EvidencePageQuery.gql');

function EvidencePage({ location, match }) {
  const { ensgId, efoId } = match.params;
  const { loading, data } = useQuery(EVIDENCE_PAGE_QUERY, {
    variables: { ensgId, efoId },
  });

  if (data && !(data.target && data.disease)) {
    return <NotFoundPage />;
  }

  const { approvedSymbol: symbol } = data?.target || {};
  const { name } = data?.disease || {};

  return (
    <BasePage
      title={`Evidence for ${symbol} and ${name}`}
      description={`${symbol} is associated with ${name} through Open Targets Platform evidence that is aggregated from genetic evidence, somatic mutations, known drugs, differential expression experiments, pathways & systems biology, text mining, and animal model data sources`}
      location={location}
    >
      <Header
        loading={loading}
        efoId={efoId}
        ensgId={ensgId}
        symbol={symbol}
        name={name}
      />
      <ScrollToTop />
      <Profile ensgId={ensgId} efoId={efoId} symbol={symbol} name={name} />
    </BasePage>
  );
}

export default EvidencePage;

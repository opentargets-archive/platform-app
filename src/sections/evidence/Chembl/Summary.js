import React from 'react';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SummaryItem from '../../../components/Summary/SummaryItem';

const CHEMBL_SUMMARY_FRAGMENT = loader('./ChemblSummaryFragment.gql');

function Summary({ definition }) {
  const request = usePlatformApi(CHEMBL_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={({ chemblSummary }) => {
        const { count } = chemblSummary;
        return `${count} ${count === 1 ? 'entry' : 'entries'}`;
      }}
    />
  );
}

Summary.fragments = {
  ChemblSummaryFragment: CHEMBL_SUMMARY_FRAGMENT,
};

export default Summary;

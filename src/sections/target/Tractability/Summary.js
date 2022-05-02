import React from 'react';
import { loader } from 'graphql.macro';

import SummaryItem from '../../../components/Summary/SummaryItem';
import usePlatformApi from '../../../hooks/usePlatformApi';

const TRACTABILITY_SUMMARY_FRAGMENT = loader('./TractabilitySummary.gql');

function Summary({ definition }) {
  const request = usePlatformApi(TRACTABILITY_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => {
        const modalities = [];
        // The summary UI has been simplified.
        // If we want to add back the sources/modalities summary,
        // just comment back in the following four blocks
        /* if (data.tractability?.find(el => el.modality==='AB' && el.value===true)) {
          modalities.push('Antibody');
        }
        if (data.tractability?.find(el => el.modality==='SM' && el.value===true)) {
          modalities.push('Small molecule');
        }
        if (data.tractability?.find(el => el.modality==='OC' && el.value===true)) {
          modalities.push('Other clinical modalities');
        }
        if (data.tractability?.find(el => el.modality==='PR' && el.value===true)) {
          modalities.push('PROTAC');
        } */
        if (modalities.length === 0) {
          modalities.push('Assessment available');
        }
        // return null for 'no data'
        return modalities.length > 0 ? modalities.join(' • ') : null;
      }}
    />
  );
}

Summary.fragments = {
  TractabilitySummaryFragment: TRACTABILITY_SUMMARY_FRAGMENT,
};

export default Summary;

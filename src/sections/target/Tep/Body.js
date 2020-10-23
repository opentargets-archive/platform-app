import React from 'react';
import { Link } from 'ot-ui';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const Section = ({ definition, label: approvedSymbol }) => {
  const request = usePlatformApi(Summary.fragments.TepSummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => (
        <>
          Learn more about the{' '}
          <Link to={data.tep.uri} external>
            {data.tep.name} TEP
          </Link>
          .
        </>
      )}
    />
  );
};

export default Section;

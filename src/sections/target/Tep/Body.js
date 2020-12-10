import React from 'react';

import Description from './Description';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const Section = ({ definition, label: symbol }) => {
  const request = usePlatformApi(Summary.fragments.TepSummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
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

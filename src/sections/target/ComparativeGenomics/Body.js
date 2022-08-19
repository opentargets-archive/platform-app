import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import HomologyTable from './HomologyTable';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const COMP_GENOMICS_QUERY = loader('./CompGenomics.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const variables = { ensemblId };
  const request = useQuery(COMP_GENOMICS_QUERY, { variables });
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => (
        <HomologyTable
          homologues={data.target.homologues}
          query={COMP_GENOMICS_QUERY.loc.source.body}
          variables={variables}
        />
      )}
    />
  );
}

export default Body;

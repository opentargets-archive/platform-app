import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { DataTable, TableDrawer } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

const DRUG_WARNINGS_QUERY = gql`
  query DrugWarningsQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      drugWarnings {
        warningType
        description
        toxicityClass
      }
    }
  }
`;

function Body({ definition, id: chemblId, label: name }) {
  const request = useQuery(DRUG_WARNINGS_QUERY, {
    variables: { chemblId },
  });
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.MechanismsOfActionSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description
          name={name}
          parentMolecule={summaryData.parentMolecule}
          childMolecules={summaryData.childMolecules}
        />
      )}
      renderBody={data => {
        return 'Warnings';
      }}
    />
  );
}

export default Body;

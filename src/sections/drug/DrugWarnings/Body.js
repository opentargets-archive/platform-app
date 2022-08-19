import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { identifiersOrgLink } from '../../../utils/global';
import Description from './Description';
import { naLabel, defaultRowsPerPageOptions } from '../../../constants';

const DRUG_WARNINGS_QUERY = loader('./DrugWarningsQuery.gql');

const columns = [
  {
    id: 'warningType',
    label: 'Warning type',
  },
  {
    id: 'description',
    label: 'Description',
    renderCell: ({ description }) => description ?? naLabel,
  },
  {
    id: 'toxicityClass',
    label: 'ChEMBL warning class',
    renderCell: ({ toxicityClass }) => toxicityClass ?? naLabel,
  },
  {
    id: 'meddraSocCode',
    label: 'MedDRA SOC code',
    renderCell: ({ meddraSocCode }) =>
      meddraSocCode ? (
        <Link external to={identifiersOrgLink('meddra', meddraSocCode)}>
          {meddraSocCode}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'country',
    label: 'Country / region',
    renderCell: ({ country }) => country ?? naLabel,
  },
  { id: 'year', label: 'Year', renderCell: ({ year }) => year ?? naLabel },
  {
    id: 'references',
    label: 'References',
    renderCell: ({ references }) => {
      const sources = new Set(); // used to collect unique sources
      const refs = [];

      references.forEach(ref => {
        sources.add(ref.source); // add source to set
        refs.push({
          // create new entry object
          name: ref.id,
          url: ref.url,
          group: ref.source,
        });
      });

      const message = Array.from(sources).join(', ');

      return (
        <TableDrawer entries={refs} showSingle={false} message={message} />
      );
    },
  },
];

function Body({ definition, id: chemblId, label: name }) {
  const variables = { chemblId };
  const request = useQuery(DRUG_WARNINGS_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={({ drug }) => {
        return (
          <DataTable
            showGlobalFilter
            dataDownloader
            columns={columns}
            rows={drug.drugWarnings}
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={DRUG_WARNINGS_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;

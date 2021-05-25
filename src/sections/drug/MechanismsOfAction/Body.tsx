import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { DataTable, TableDrawer } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';
import {
  MechanismsOfActionSectionQuery,
  MechanismsOfActionSectionQueryVariables,
} from '../../../generated/MechanismsOfActionSectionQuery';

const MECHANISMS_OF_ACTION_QUERY = loader('./MechanismsOfActionQuery.gql');

const columns = [
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of Action',
  },
  {
    id: 'targetName',
    label: 'Target Name',
  },
  {
    id: 'targets',
    label: 'Human targets',
    filterValue: (row: any) =>
      row.targets.map((target: any) => target.approvedSymbol).join(' '),
    exportValue: (row: any) => row.targets.map((target: any) => target.approvedSymbol).join(),
    renderCell: ({ targets } : { targets: any}) => {
      if (!targets) return 'non-human';

      const targetList = targets.map((target: any) => {
        return {
          name: target.approvedSymbol,
          url: `/target/${target.id}`,
          group: 'Human targets',
        };
      });

      return <TableDrawer entries={targetList} />;
    },
  },
  {
    id: 'references',
    label: 'References',
    filterValue: (row: any) =>
      row.references.map((reference: any) => reference.source).join(' '),
    exportValue: (row: any) =>
      row.references.map((reference: any) => reference.source).join(),
    renderCell: (row: any) =>
      !row.references
        ? 'n/a'
        : row.references.map((r: any, i: number) => {
            return (
              <Fragment key={i}>
                {i > 0 ? ', ' : null}
                {r.urls ? (
                  <Link external to={r.urls[0]}>
                    {r.source}
                  </Link>
                ) : (
                  r.source
                )}
              </Fragment>
            );
          }),
  },
];

function Body({ definition, id: chemblId, label: name }: {definition: any, id: any, label: any}) {
  const request = useQuery<MechanismsOfActionSectionQuery, MechanismsOfActionSectionQueryVariables>(MECHANISMS_OF_ACTION_QUERY, {
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
      renderBody={(data: MechanismsOfActionSectionQuery) => {
        // const rows = data.drug?.mechanismsOfAction?.rows;

        if (!data.drug || !data.drug.mechanismsOfAction) {
          return null;
        }

        const rows = data.drug.mechanismsOfAction.rows;

        return (
          <DataTable
            showGlobalFilter
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem={`${chemblId}-mechanisms-of-action`}
          />
        );
      }}
    />
  );
}

export default Body;

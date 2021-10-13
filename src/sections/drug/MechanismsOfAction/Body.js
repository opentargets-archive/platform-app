import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { DataTable, TableDrawer } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

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
    filterValue: row =>
      row.targets.map(target => target.approvedSymbol).join(' '),
    exportValue: row => row.targets.map(target => target.approvedSymbol).join(),
    renderCell: ({ targets }) => {
      if (!targets) return 'non-human';

      const targetList = targets.map(target => {
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
    filterValue: row =>
      row.references.map(reference => reference.source).join(' '),
    exportValue: row =>
      row.references.map(reference => reference.source).join(),
    renderCell: row =>
      !row.references
        ? 'n/a'
        : row.references.map((r, i) => {
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

function Body({ definition, id: chemblId, label: name }) {
  const variables = { chemblId };
  const request = useQuery(MECHANISMS_OF_ACTION_QUERY, {
    variables,
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
        const rows = data.drug.mechanismsOfAction.rows;

        return (
          <DataTable
            showGlobalFilter
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem={`${chemblId}-mechanisms-of-action`}
            query={MECHANISMS_OF_ACTION_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;

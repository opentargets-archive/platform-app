import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const MECHANISMS_OF_ACTION_QUERY = gql`
  query MechanismsOfActionSectionQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      mechanismsOfAction {
        rows {
          mechanismOfAction
          targetName
          targets {
            id
            approvedSymbol
          }
          references {
            source
            urls
          }
        }
      }
    }
  }
`;

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
    renderCell: row =>
      !row.targets || row.targets.length === 0
        ? 'non-human'
        : row.targets.map((target, i) => (
            <Fragment key={i}>
              {i > 0 ? ' ' : null}
              <Link to={`/target/${target.id}`}>{target.approvedSymbol}</Link>
            </Fragment>
          )),
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
  const request = useQuery(MECHANISMS_OF_ACTION_QUERY, {
    variables: { chemblId },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
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

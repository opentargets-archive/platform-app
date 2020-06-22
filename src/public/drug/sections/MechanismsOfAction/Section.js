import React, { Fragment } from 'react';
import { Link } from 'ot-ui';

import Table from '../../../common/Table/Table';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';

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

const Section = ({ chemblId, data }) => (
  <Table
    showGlobalFilter
    columns={columns}
    rows={data.rows}
    pagination={PaginationActionsComplete}
    dataDownloader
    dataDownloaderFileStem={`${chemblId}-mechanisms-of-action`}
  />
);

export default Section;

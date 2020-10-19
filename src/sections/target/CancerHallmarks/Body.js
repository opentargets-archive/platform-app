import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';

const columns = [
  {
    id: 'label',
    label: 'Hallmarks',
    renderCell: row => row.label,
    exportLabel: 'Hallmarks',
  },
  {
    id: 'activity',
    label: 'Promotes or suppresses',
    renderCell: row => row.activity,
    exportLabel: 'Promotes or suppresses',
  },
  {
    id: 'description',
    label: 'Description',
    renderCell: row => row.description,
    exportLabel: 'Description',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: row => (
      <Link
        external
        to={`http://europepmc.org/search?query=EXT_ID:${row.pubmedId}`}
      >
        1&nbsp;publication
      </Link>
    ),
    exportLabel: 'Sources (PubMed id)',
    exportValue: row => row.pubmedId,
  },
];

function Section({ definition, id: ensgId, label: approvedSymbol }) {
  const request = usePlatformApi(
    Summary.fragments.CancerHallmarksSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => {
        const roleInCancer = data.hallmarks.attributes.filter(
          a => a.name === 'role in cancer'
        );
        const rows = data.hallmarks.rows.map(r => ({
          label: r.label,
          activity: r.promote ? 'promotes' : r.suppress ? 'suppresses' : '',
          description: r.reference.description,
          pubmedId: r.reference.pubmedId,
        }));

        return (
          <>
            <Typography variant="body2">
              Role in cancer:{' '}
              {roleInCancer.map((r, i) => (
                <React.Fragment key={i}>
                  {i > 0 ? ' | ' : null}
                  <Link
                    external
                    to={`http://europepmc.org/search?query=EXT_ID:${
                      r.reference.pubmedId
                    }`}
                  >
                    {r.reference.description}
                  </Link>
                </React.Fragment>
              )) || 'No data'}
            </Typography>
            <DataTable
              columns={columns}
              dataDownloader
              dataDownloaderFileStem={`${approvedSymbol}-hallmarks`}
              rows={rows}
              noWrap={false}
            />
          </>
        );
      }}
    />
  );
}

export default Section;

import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

import { Link } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';
import ChipList from '../../../components/ChipList';

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

const useStyles = makeStyles({
  roleInCancerBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  roleInCancerTitle: { marginRight: '.5rem' },
});

function Section({ definition, id: ensgId, label: symbol }) {
  const classes = useStyles();
  const request = usePlatformApi(
    Summary.fragments.CancerHallmarksSummaryFragment
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        const roleInCancer = data.hallmarks.attributes
          .filter(a => a.name === 'role in cancer')
          .map(r => ({
            label: r.reference.description,
            url: `http://europepmc.org/search?query=EXT_ID:${
              r.reference.pubmedId
            }`,
          }));
        const rows = data.hallmarks.rows.map(r => ({
          label: r.label,
          activity: r.promote ? 'promotes' : r.suppress ? 'suppresses' : '',
          description: r.reference.description,
          pubmedId: r.reference.pubmedId,
        }));

        return (
          <>
            <Box className={classes.roleInCancerBox}>
              <Typography className={classes.roleInCancerTitle}>
                Role in cancer:
              </Typography>
              <ChipList
                items={
                  roleInCancer.length > 0
                    ? roleInCancer
                    : [{ label: 'Unknown' }]
                }
              />
            </Box>
            <DataTable
              columns={columns}
              dataDownloader
              dataDownloaderFileStem={`${symbol}-hallmarks`}
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

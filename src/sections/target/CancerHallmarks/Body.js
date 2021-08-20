import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

import ChipList from '../../../components/ChipList';
import Description from './Description';
import DataTable from '../../../components/Table/DataTable';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

const columns = [
  {
    id: 'label',
    label: 'Hallmark',
    renderCell: row => row.label,
    exportLabel: 'Hallmark',
  },
  {
    id: 'activity',
    label: 'Effect',
    renderCell: row => row.activity,
    exportLabel: 'Effect',
  },
  {
    id: 'description',
    label: 'Description',
    renderCell: row => row.description,
    exportLabel: 'Description',
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: row => (
      <Link
        external
        to={`http://europepmc.org/search?query=EXT_ID:${row.pmid}`}
      >
        1&nbsp;publication
      </Link>
    ),
    exportLabel: 'Literature (PubMed id)',
    exportValue: row => row.pmid,
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

function Section({ definition, label: symbol }) {
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
            label: r.description,
            url: `http://europepmc.org/search?query=EXT_ID:${r.pmid}`,
          }));
        const rows = data.hallmarks.cancerHallmarks.map(r => ({
          label: r.label,
          activity: r.impact === 'promotes' ? 'promotes' : 'suppresses',
          description: r.description,
          pmid: r.pmid,
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

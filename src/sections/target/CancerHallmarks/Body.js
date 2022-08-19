import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import ChipList from '../../../components/ChipList';
import Description from './Description';
import DataTable from '../../../components/Table/DataTable';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import SectionItem from '../../../components/Section/SectionItem';
import { defaultRowsPerPageOptions } from '../../../constants';

const HALLMARKS_QUERY = loader('./Hallmarks.gql');

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
    id: 'publications',
    label: 'Publications',
    renderCell: ({ pmid }) => (
      <PublicationsDrawer
        entries={[
          {
            name: pmid,
            url: `http://europepmc.org/search?query=EXT_ID:${pmid}`,
            group: 'literature',
          },
        ]}
      />
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

function Section({ definition, id, label: symbol }) {
  const variables = { ensemblId: id };
  const classes = useStyles();
  const request = useQuery(HALLMARKS_QUERY, { variables });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        const roleInCancer = data.target.hallmarks.attributes
          .filter(a => a.name === 'role in cancer')
          .map(r => ({
            label: r.description,
            url: `http://europepmc.org/search?query=EXT_ID:${r.pmid}`,
          }));
        const rows = data.target.hallmarks.cancerHallmarks.map(r => ({
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
              rowsPerPageOptions={defaultRowsPerPageOptions}
              query={HALLMARKS_QUERY.loc.source.body}
              variables={variables}
            />
          </>
        );
      }}
    />
  );
}

export default Section;

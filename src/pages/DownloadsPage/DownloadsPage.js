import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  // Avatar,
  // Box,
  // Card,
  // CardContent,
  // CardHeader,
  // Grid,
  // makeStyles,
  // MenuItem,
  // Select,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
  Paper,
  Box,
  Chip,
  Typography,
} from '@material-ui/core';

import BasePage from '../../components/BasePage';
import Link from '../../components/Link';
import { DataTable } from '../../components/Table';
import DownloadsDrawer from './DownloadsDrawer';
import downloadData from './downloadData.json';

const columns = [
  { id: 'dataset', label: 'Dataset' },
  { id: 'description', label: 'Description' },
  { id: 'schema', label: 'Schema' },
  {
    id: 'formats',
    label: 'Format(s)',
    renderCell: ({ dataset, formats }) => {
      return (
        <DownloadsDrawer title={dataset} data={formats}>
          <Chip label="JSON" clickable size="small" />{' '}
          <Chip label="Parquet" clickable size="small" />
        </DownloadsDrawer>
      );
    },
  },
];

const rows = [
  {
    dataset: 'Target',
    description: 'Lorem ipsum dolor sit amet',
    formats: downloadData[0],
  },
  {
    dataset: 'Disease',
    description: 'Lorem ipsum dolor sit amet',
    formats: downloadData[1],
  },
  {
    dataset: 'Drug - molecule',
    description: 'Lorem ipsum dolor sit amet',
    formats: downloadData[0],
  },
  {
    dataset: 'Associations - direct',
    description: 'Lorem ipsum dolor sit amet',
    formats: downloadData[1],
  },
];

const DATA_VERSION_QUERY = gql`
  query DataVersion {
    meta {
      dataVersion {
        month
        year
      }
    }
  }
`;

function getVersion(data) {
  if (!data) return null;
  const { month, year } = data.meta.dataVersion;
  return `${year}.${month < 10 ? '0' : ''}${month}`;
}

function DownloadsPage() {
  const { data, error } = useQuery(DATA_VERSION_QUERY);

  return (
    <BasePage>
      <Typography variant="h4" component="h1" paragraph>
        Data downloads
      </Typography>
      <Typography paragraph>
        The Open Targets Platform is committed to open data and open access
        research and all of our data is publicly available for download and can
        be used for academic or commercial purposes. Please see our{' '}
        <Link external to="http://platform-docs.opentargets.org/licence">
          License documentation
        </Link>{' '}
        for more information.
      </Typography>
      <Typography paragraph>
        Current data version: {error ? null : getVersion(data)}
      </Typography>
      <Typography paragraph>
        Access archived datasets via{' '}
        <Link
          external
          to="http://ftp.ebi.ac.uk/pub/databases/opentargets/platform"
        >
          FTP
        </Link>
      </Typography>
      <Paper variant="outlined" elevation={0}>
        <Box m={2}>
          <DataTable showGlobalFilter columns={columns} rows={rows} />
        </Box>
      </Paper>
    </BasePage>
  );
}

export default DownloadsPage;

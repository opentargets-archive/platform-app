import React from 'react';
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

  Typography,
} from '@material-ui/core';

import BasePage from '../../components/BasePage';
import { DataTable } from '../../components/Table';
import DownloadsDrawer from './DownloadsDrawer';
import downloadData from './downloadData.json';

const columns = [
  { id: 'dataset', label: 'Dataset' },
  { id: 'description', label: 'Description' },
  {
    id: 'formats',
    label: 'Format(s)',
    renderCell: () => {
      return (
        <DownloadsDrawer data={downloadData[0]}>JSON Parquet</DownloadsDrawer>
      );
    },
  },
];

const rows = [
  {
    dataset: 'Target',
    description: 'Lorem ipsum dolor sit amet',
    formats: 'JSON Parquet',
  },
  {
    dataset: 'Disease',
    description: 'Lorem ipsum dolor sit amet',
    formats: 'JSON Parquet',
  },
];

function DownloadsPage() {
  return (
    <BasePage>
      <Typography variant="h4" component="h1" paragraph>
        Data downloads
      </Typography>
      <Typography>
        The Open Targets Platform is committed to open data and open access
        research and all of our data is publicly available for download and can
        be used for academic or commercial purposes. Please note that some
        datasets integrated into the Platform require a licence for commercial
        use - see our License documentation for more information.
      </Typography>
      <Typography>Current data version: 21.04 (April 2014)</Typography>
      <Typography>Access archived datasets via FTP</Typography>
      <DataTable columns={columns} rows={rows} />
    </BasePage>
  );
}

export default DownloadsPage;

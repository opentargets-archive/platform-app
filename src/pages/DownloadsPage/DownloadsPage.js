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
    renderCell: ({ formats }) => {
      return <DownloadsDrawer data={formats}>JSON Parquet</DownloadsDrawer>;
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

function DownloadsPage() {
  return (
    <BasePage>
      <Typography variant="h4" component="h1" paragraph>
        Data downloads
      </Typography>
      <Typography paragraph>
        The Open Targets Platform is committed to open data and open access
        research and all of our data is publicly available for download and can
        be used for academic or commercial purposes. Please note that some
        datasets integrated into the Platform require a licence for commercial
        use - see our License documentation for more information.
      </Typography>
      <Typography paragraph>
        Current data version: 21.04 (April 2014)
      </Typography>
      <Typography paragraph>Access archived datasets via FTP</Typography>
      <DataTable showGlobalFilter columns={columns} rows={rows} />
    </BasePage>
  );
}

export default DownloadsPage;

import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Paper, Box, Chip, Typography } from '@material-ui/core';

import BasePage from '../../components/BasePage';
import Link from '../../components/Link';
import { defaultRowsPerPageOptions, formatMap } from '../../constants';
import { DataTable } from '../../components/Table';
import DownloadsDrawer from './DownloadsDrawer';
import downloadData from './downloadData.json';
import datasetMappings from './dataset-mappings';

function getFormats(id, downloadData) {
  const formats = [];

  downloadData.forEach(data => {
    if (id === data.id) {
      formats.push({
        format: data.resource.format,
        path: data.resource.path,
      });
    }
  });

  return formats;
}

function getRows(downloadData, datasetMappings) {
  const rows = [];

  datasetMappings.forEach(mapping => {
    if (mapping.include_in_fe) {
      rows.push({
        niceName: mapping.nice_name,
        description: mapping.description,
        formats: getFormats(mapping.id, downloadData),
      });
    }
  });

  return rows;
}

const rows = getRows(downloadData, datasetMappings);

function getColumns(date) {
  const columns = [
    { id: 'niceName', label: 'Dataset' },
    { id: 'description', label: 'Description' },
    {
      id: 'formats',
      label: 'Format(s)',
      renderCell: ({ niceName, formats }) => {
        return formats.map(format => {
          return (
            <Fragment key={format.format}>
              <DownloadsDrawer
                title={niceName}
                format={format.format}
                path={format.path}
                month={date.month}
                year={date.year}
              >
                <Chip label={formatMap[format.format]} clickable size="small" />
              </DownloadsDrawer>{' '}
            </Fragment>
          );
        });
      },
    },
  ];
  return columns;
}

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

function DownloadsPage({ location }) {
  const { data, loading, error } = useQuery(DATA_VERSION_QUERY);
  const columns = loading || error ? [] : getColumns(data.meta.dataVersion);

  return (
    <BasePage
      title="Data downloads"
      description="List of open source and open access datasets that are available for download from the Open Targets Platform in various formats"
      location={location}
    >
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
        For sample scripts to download and parse datasets using Python or R,
        please visit our{' '}
        <Link
          external
          to="http://platform-docs.opentargets.org/data-access/datasets"
        >
          Data Downloads documentation
        </Link>
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
          {loading || error ? null : (
            <DataTable
              showGlobalFilter
              columns={columns}
              rows={rows}
              rowsPerPageOptions={defaultRowsPerPageOptions}
            />
          )}
        </Box>
      </Paper>
    </BasePage>
  );
}

export default DownloadsPage;

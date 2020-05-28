import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import FileSaver from 'file-saver';

const asJSON = (columns, rows) => {
  const rowStrings = rows.map(row => {
    return columns.reduce((accumulator, newKey) => {
      if (newKey.exportValue === false) return accumulator;

      const newLabel = _.camelCase(
        newKey.exportLabel || newKey.label || newKey.id
      );

      return {
        ...accumulator,
        [newLabel]: newKey.exportValue
          ? newKey.exportValue(row)
          : _.get(row, newKey.propertyPath || newKey.id, ''),
      };
    }, {});
  });

  return JSON.stringify(rowStrings);
};

const asDSV = (columns, rows, separator = ',', quoteStrings = true) => {
  const quoteString = d => {
    // converts arrays to strings
    if (Array.isArray(d)) {
      d = d.join(',');
    }

    return quoteStrings && typeof d === 'string' ? `"${d}"` : d;
  };

  const lineSeparator = '\n';

  const headerString = columns
    .reduce((headerString, column) => {
      if (column.exportValue === false) return headerString;

      const newLabel = quoteString(
        _.camelCase(column.exportLabel || column.label || column.id)
      );

      return [...headerString, newLabel];
    }, [])
    .join(separator);

  const rowStrings = rows
    .map(row =>
      columns
        .reduce((rowString, column) => {
          if (column.exportValue === false) return rowString;

          const newValue = quoteString(
            column.exportValue
              ? column.exportValue(row)
              : _.get(row, column.propertyPath || column.id, '')
          );

          return [...rowString, newValue];
        }, [])
        .join(separator)
    )
    .join(lineSeparator);

  return [headerString, rowStrings].join(lineSeparator);
};

const downloadData = async (format, columns, rows, fileStem) => {
  if (typeof rows === 'function') {
    rows = await rows();
  }

  if (!rows || rows.length === 0) {
    return;
  }

  const createBlob = format =>
    ({
      json: (columns, rows) =>
        new Blob([asJSON(columns, rows)], {
          type: 'application/json;charset=utf-8',
        }),
      csv: (columns, rows) =>
        new Blob([asDSV(columns, rows)], {
          type: 'text/csv;charset=utf-8',
        }),
      tsv: (columns, rows) =>
        new Blob([asDSV(columns, rows, '\t', false)], {
          type: 'text/tab-separated-values;charset=utf-8',
        }),
    }[format]);

  const blob = createBlob(format)(columns, rows);

  FileSaver.saveAs(blob, `${fileStem}.${format}`, { autoBOM: false });
};

function DataDownloader({ columns, rows, fileStem }) {
  const handleClickDownloadJSON = () => {
    downloadData('json', columns, rows, fileStem);
  };

  const handleClickDownloadCSV = () => {
    downloadData('csv', columns, rows, fileStem);
  };

  const handleClickDownloadTSV = () => {
    downloadData('tsv', columns, rows, fileStem);
  };

  return (
    <Grid container alignItems="center" justify="flex-end" spacing={1}>
      <Grid item>
        <Typography variant="caption">Download table as</Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={handleClickDownloadJSON}>
          JSON
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={handleClickDownloadCSV}>
          CSV
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={handleClickDownloadTSV}>
          TSV
        </Button>
      </Grid>
    </Grid>
  );
}

export default DataDownloader;

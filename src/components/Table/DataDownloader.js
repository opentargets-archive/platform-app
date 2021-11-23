import FileSaver from 'file-saver';
import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
  Snackbar,
  Slide,
} from '@material-ui/core';

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

const styles = makeStyles({
  messageProgress: {
    marginRight: '1rem',
  },
  snackbarContentMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '.75rem 1rem',
    width: '100%',
  },
  snackbarContentRoot: {
    padding: 0,
  },
});

function DataDownloader({ columns, rows, fileStem, captionLabel="Download table as" }) {
  const [downloading, setDownloading] = useState(false);
  const classes = styles();

  const downloadData = async (format, columns, rows, fileStem) => {
    let allRows = rows;

    if (typeof rows === 'function') {
      setDownloading(true);
      allRows = await rows();
      setDownloading(false);
    }

    if (!allRows || allRows.length === 0) {
      return;
    }

    const blob = createBlob(format)(columns, allRows);

    FileSaver.saveAs(blob, `${fileStem}.${format}`, { autoBOM: false });
  };

  const handleClickDownloadJSON = async () => {
    downloadData('json', columns, rows, fileStem);
  };

  const handleClickDownloadCSV = async () => {
    downloadData('csv', columns, rows, fileStem);
  };

  const handleClickDownloadTSV = async () => {
    downloadData('tsv', columns, rows, fileStem);
  };

  return (
    <>
      <Grid container alignItems="center" justify="flex-end" spacing={1}>
        <Grid item>
          <Typography variant="caption">{captionLabel}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleClickDownloadJSON}
            size="small"
          >
            JSON
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleClickDownloadCSV}
            size="small"
          >
            CSV
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleClickDownloadTSV}
            size="small"
          >
            TSV
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={downloading}
        TransitionComponent={Slide}
        ContentProps={{
          classes: {
            root: classes.snackbarContentRoot,
            message: classes.snackbarContentMessage,
          },
        }}
        message={
          <>
            <CircularProgress className={classes.messageProgress} />
            Preparing data...
          </>
        }
      />
    </>
  );
}

export default DataDownloader;

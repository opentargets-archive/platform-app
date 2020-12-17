import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import FileSaver from 'file-saver';

const UNEXPECTED_FORMAT =
  'Unexpected format. Supported options are csv, tsv and json.';

const pick = (object, keys) => {
  return keys.reduce(function(o, k) {
    // take into account optional export() function, which takes precedence as per other download formats
    o[k.id] = k.export ? k.export(object) : object[k.id];
    return o;
  }, {});
};

const quoteIfString = d => (typeof d === 'string' ? `"${d}"` : d);

const asJSONString = ({ rows, headerMap }) => {
  // use the full headerMap which contain optional export() function for each header
  const rowsHeadersOnly = rows.map(row => pick(row, headerMap));
  return JSON.stringify(rowsHeadersOnly);
};

const asCSVString = ({ rows, headerMap }) => {
  const separator = ',';
  const lineSeparator = '\n';
  const headersString = headerMap
    .map(d => quoteIfString(d.label))
    .join(separator);
  const rowsArray = rows.map(row => {
    return headerMap
      .map(header => {
        return quoteIfString(
          header.export ? header.export(row) : row[header.id]
        );
      })
      .join(separator);
  });
  return [headersString, ...rowsArray].join(lineSeparator);
};

const asTSVString = ({ rows, headerMap }) => {
  const separator = '\t';
  const lineSeparator = '\n';
  const headersString = headerMap.map(d => d.label).join(separator);
  const rowsArray = rows.map(row => {
    return headerMap
      .map(header => {
        return header.export ? header.export(row) : row[header.id];
      })
      .join(separator);
  });
  return [headersString, ...rowsArray].join(lineSeparator);
};

const asContentString = ({ rows, headerMap, format }) => {
  switch (format) {
    case 'json':
      return asJSONString({ rows, headerMap });
    case 'csv':
      return asCSVString({ rows, headerMap });
    case 'tsv':
      return asTSVString({ rows, headerMap });
    default:
      throw Error(UNEXPECTED_FORMAT);
  }
};

const asMimeType = format => {
  switch (format) {
    case 'json':
      return 'application/json;charset=utf-8';
    case 'csv':
      return 'text/csv;charset=utf-8';
    case 'tsv':
      return 'text/tab-separated-values;charset=utf-8';
    default:
      throw Error(UNEXPECTED_FORMAT);
  }
};

const downloadTable = async ({ rows, headerMap, format, filenameStem }) => {
  if (typeof rows === 'function') {
    const data = await rows();
    rows = data;
  }

  if (!rows || rows.length === 0) {
    console.info('Nothing to download.');
    return;
  }

  const contentString = asContentString({ rows, headerMap, format });
  const blob = new Blob([contentString], {
    type: asMimeType(format),
  });
  FileSaver.saveAs(blob, `${filenameStem}.${format}`, { autoBOM: false });
};

const styles = () => ({
  container: {
    marginBottom: '2px',
  },
  caption: {
    alignSelf: 'center',
  },
  downloadHeader: {
    marginTop: '7px',
  },
});

function handleDownload(headers, rows, fileStem, format) {
  downloadTable({
    headerMap: headers,
    rows,
    format,
    filenameStem: fileStem,
  });
}

function DataDownloader({ tableHeaders, rows, classes, fileStem }) {
  return (
    <Grid
      container
      justify="flex-end"
      spacing={1}
      className={classes.container}
    >
      <Grid item className={classes.caption}>
        <Typography variant="caption" className={classes.downloadHeader}>
          Download table as
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'json')}
        >
          JSON
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'csv')}
        >
          CSV
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'tsv')}
        >
          TSV
        </Button>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(DataDownloader);

import React from 'react';
import { withApollo } from '@apollo/react-hoc';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { downloadTable } from 'ot-ui';

const styles = () => ({
  container: {
    marginBottom: '2px',
  },
  downloadHeader: {
    marginTop: '7px',
  },
});

async function downloadBatch({
  client,
  query,
  variables,
  getRows,
  getAfter,
  first = 10000,
  after = null,
}) {
  const variablesWithPagination = { ...variables, first };

  if (after) {
    variablesWithPagination.after = after;
  }

  return client
    .query({
      query,
      variables: variablesWithPagination,
    })
    .then(response => ({ rows: getRows(response), after: getAfter(response) }));
}

async function downloadAll({ client, query, variables, getRows, getAfter }) {
  const first = downloadBatch({ client, query, variables, getRows, getAfter });
  let prev = await first;
  let rows = [];
  while (true) {
    const after = prev ? prev.after : null;
    rows = [...rows, ...prev.rows];
    if (after) {
      prev = await downloadBatch({
        client,
        query,
        variables,
        getRows,
        getAfter,
        after,
      });
    } else {
      break;
    }
  }
  return rows;
}

class ClassicAssociationsDownload extends React.Component {
  handleDownload = format => {
    const {
      client,
      query,
      variables,
      getRows,
      getAfter,
      headers,
      fileStem,
    } = this.props;
    downloadAll({ client, query, variables, getRows, getAfter }).then(rows => {
      downloadTable({
        headerMap: headers,
        rows,
        format,
        filenameStem: fileStem,
      });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="flex-end"
        spacing={8}
        className={classes.container}
      >
        <Grid item>
          <Typography variant="caption" className={classes.downloadHeader}>
            Download table as
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => this.handleDownload('json')}
          >
            JSON
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => this.handleDownload('csv')}>
            CSV
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => this.handleDownload('tsv')}>
            TSV
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withApollo(ClassicAssociationsDownload));

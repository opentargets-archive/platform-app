import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { OtTableRF, DataDownloader } from 'ot-ui';
import client from '../../../client';

const styles = theme => ({
  levelBarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  levelBar: {
    backgroundColor: theme.palette.primary.main,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '10px',
    marginRight: '5px',
  },
});

const BATCH_SIZE = 1000;

const COUNT_QUERY = gql`
  query AdverseEventsCount($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      adverseEvents {
        critVal
        count
      }
    }
  }
`;

const PAGE_QUERY = gql`
  query AdverseEventsPage($chemblId: String!, $page: Pagination!) {
    drug(chemblId: $chemblId) {
      id
      adverseEvents(page: $page) {
        rows {
          name
          count
          llr
        }
      }
    }
  }
`;

const getRows = async chemblId => {
  // find how many rows there are
  const result = await client.query({
    query: COUNT_QUERY,
    variables: {
      chemblId,
    },
  });
  const { count, critVal } = result.data.drug.adverseEvents;
  const numBatches = Math.ceil(count / BATCH_SIZE);
  const batchPromises = [];

  for (let i = 0; i < numBatches; i++) {
    batchPromises.push(
      client.query({
        query: PAGE_QUERY,
        variables: {
          chemblId,
          page: { index: i, size: BATCH_SIZE },
        },
      })
    );
  }

  return Promise.all(batchPromises).then(batches => {
    const allRows = [];

    batches.forEach(batch => {
      const { rows } = batch.data.drug.adverseEvents;
      rows.forEach(row => {
        allRows.push(row);
      });
    });

    return {
      count,
      critVal,
      rows: allRows,
    };
  });
};

const Section = ({ chemblId, classes, name }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getRows(chemblId).then(data => {
      setData(data);
    });
  }, []);

  if (!data) return null;

  const maxLlr = data.rows[0].llr;
  const columns = [
    {
      id: 'name',
      label: 'Adverse event',
      renderCell: d => _.upperFirst(d.name),
      width: '35%',
    },
    {
      id: 'count',
      label: 'Number of reported events',
      width: '15%',
    },
    {
      id: 'llr',
      label: `Log likelihood ratio (CV = ${data.critVal})`,
      renderCell: d => {
        const w = ((d.llr / maxLlr) * 85).toFixed(2); // scale to max 85% of the width to allows space for label
        return (
          <div className={classes.levelBarContainer}>
            <div
              className={classes.levelBar}
              style={{
                width: `${w}%`,
              }}
            ></div>
            <div>{d.llr.toFixed(2)}</div>
          </div>
        );
      },
      width: '50%',
    },
  ];

  return (
    <>
      <DataDownloader
        tableHeaders={columns}
        rows={data.rows}
        fileStem={`${name}-pharmacovigilance`}
      />
      <OtTableRF
        loading={false}
        error={false}
        columns={columns}
        data={data.rows}
        pageSize={10}
      />
    </>
  );
};

export default withStyles(styles)(Section);

import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '../../../common/Table/Table';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';

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

const ADVERSE_EVENTS_QUERY = gql`
  query AdverseEventsPage(
    $chemblId: String!
    $index: Int = 0
    $size: Int = 10
  ) {
    drug(chemblId: $chemblId) {
      id
      maxLlr: adverseEvents(page: { index: 0, size: 1 }) {
        rows {
          llr
        }
      }
      adverseEvents(page: { index: $index, size: $size }) {
        critVal
        count
        rows {
          name
          count
          llr
        }
      }
    }
  }
`;

const getColumns = (critVal, maxLlr, classes) => {
  return [
    {
      id: 'name',
      label: 'Adverse event',
      renderCell: d => _.upperFirst(d.name),
    },
    {
      id: 'count',
      label: 'Number of reported events',
      numeric: true,
    },
    {
      id: 'llr',
      label: `Log likelihood ratio (CV = ${critVal.toFixed(2)})`,
      renderCell: d => {
        const w = ((d.llr / maxLlr) * 85).toFixed(2); // scale to max 85% of the width to allows space for label
        return (
          <div className={classes.levelBarContainer}>
            <div
              className={classes.levelBar}
              style={{
                width: `${w}%`,
              }}
            />
            <div>{d.llr.toFixed(2)}</div>
          </div>
        );
      },
    },
  ];
};

const Section = ({ chemblId, classes, name }) => {
  const { data, loading, fetchMore } = useQuery(ADVERSE_EVENTS_QUERY, {
    variables: {
      chemblId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleTableAction = ({ page }) => {
    fetchMore({
      variables: {
        index: page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  };

  const { critVal = 0, rows = [], count } = data?.drug?.adverseEvents ?? {};

  // TODO: Change GraphQL schema to have a maxLlr field instead of having to
  // get the first item of adverse events to get the largest llr since
  // items are sorted in decreasing llr order.
  const maxLlr = data?.drug?.maxLlr.rows[0].llr;

  const getAllAdverseEvents = useBatchDownloader(
    ADVERSE_EVENTS_QUERY,
    {
      chemblId,
    },
    'data.drug.adverseEvents'
  );

  return (
    <Table
      serverSide
      dataDownloader
      dataDownloaderRows={getAllAdverseEvents}
      loading={loading}
      columns={getColumns(critVal, maxLlr, classes)}
      rows={rows}
      rowCount={count}
      onTableAction={handleTableAction}
      pagination={PaginationActionsComplete}
    />
  );
};

export default withStyles(styles)(Section);

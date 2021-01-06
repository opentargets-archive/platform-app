import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { Table, PaginationActionsComplete } from '../../../components/Table';
import useBatchDownloader from '../../../hooks/useBatchDownloader';
import Link from '../../../components/Link';

const ADVERSE_EVENTS_QUERY = gql`
  query AdverseEventsQuery(
    $chemblId: String!
    $index: Int = 0
    $size: Int = 10
  ) {
    drug(chemblId: $chemblId) {
      id
      maxLlr: adverseEvents(page: { index: 0, size: 1 }) {
        rows {
          logLR
        }
      }
      adverseEvents(page: { index: $index, size: $size }) {
        criticalValue
        count
        rows {
          name
          count
          logLR
          meddraCode
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
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
}));

const getColumns = (critVal, maxLlr, classes) => {
  return [
    {
      id: 'name',
      label: 'Adverse event',
      renderCell: d => (
        <Link to={`https://identifiers.org/meddra:${d.meddraCode}`}>
          <Typography
            variant="caption"
            noWrap
            display="block"
            title={_.upperFirst(d.name)}
          >
            {_.upperFirst(d.name)}
          </Typography>
        </Link>
      ),
      width: '30%',
    },
    {
      id: 'count',
      label: 'Number of reported events',
      numeric: true,
      width: '25%',
    },
    {
      id: 'llr',
      label: `Log likelihood ratio (CV = ${critVal.toFixed(2)})`,
      renderCell: d => {
        const w = ((d.logLR / maxLlr) * 85).toFixed(2); // scale to max 85% of the width to allows space for label
        return (
          <div className={classes.levelBarContainer}>
            <div
              className={classes.levelBar}
              style={{
                width: `${w}%`,
              }}
            />
            <div>{d.logLR.toFixed(2)}</div>
          </div>
        );
      },
      exportValue: d => d.logLR.toFixed(2),
      width: '45%',
    },
  ];
};

function Body({ definition, id: chemblId, label: name }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(ADVERSE_EVENTS_QUERY, {
    variables: { chemblId },
  });

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchMore({
      variables: {
        index: newPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  };

  const getAllAdverseEvents = useBatchDownloader(
    ADVERSE_EVENTS_QUERY,
    { chemblId },
    'data.drug.adverseEvents'
  );

  return (
    <SectionItem
      definition={definition}
      request={{ loading, error, data }}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
        // TODO: Change GraphQL schema to have a maxLlr field instead of having
        // to get the first item of adverse events to get the largest llr since
        // items are sorted in decreasing llr order.
        const maxLlr = data.drug.maxLlr.rows[0].logLR;
        const { criticalValue, rows, count } = data.drug.adverseEvents;

        return (
          <Table
            dataDownloader
            dataDownloaderRows={getAllAdverseEvents}
            dataDownloaderFileStem={`${name}-adverse-events`}
            loading={loading}
            columns={getColumns(criticalValue, maxLlr, classes)}
            rows={rows}
            rowCount={count}
            page={page}
            onPageChange={handlePageChange}
            ActionsComponent={PaginationActionsComplete}
            fixed
          />
        );
      }}
    />
  );
}

export default Body;

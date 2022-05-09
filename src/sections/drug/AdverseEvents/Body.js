import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import { Table, PaginationActionsComplete } from '../../../components/Table';
import useBatchDownloader from '../../../hooks/useBatchDownloader';
import Link from '../../../components/Link';

const ADVERSE_EVENTS_QUERY = loader('./AdverseEventsQuery.gql');

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
      label: 'Adverse event (MedDRA)',
      renderCell: d =>
        d.meddraCode ? (
          <Link to={`https://identifiers.org/meddra:${d.meddraCode}`} external>
            <Typography
              variant="caption"
              noWrap
              display="block"
              title={_.upperFirst(d.name)}
            >
              {_.upperFirst(d.name)}
            </Typography>
          </Link>
        ) : (
          _.upperFirst(d.name)
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
  const variables = { chemblId };
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { loading, error, data, fetchMore } = useQuery(ADVERSE_EVENTS_QUERY, {
    variables,
  });

  // TODO: fetchMore doesn't seem to use gql/apollo caching
  // but a new query causes flickering when rendering the table
  function getData(page, size) {
    fetchMore({
      variables: {
        index: page,
        size: size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  }

  const handlePageChange = newPage => {
    setPage(newPage);
    getData(newPage, pageSize);
  };

  function handleRowsPerPageChange(newSize) {
    setPageSize(newSize);
    setPage(0);
    getData(0, newSize);
  }

  const getAllAdverseEvents = useBatchDownloader(
    ADVERSE_EVENTS_QUERY,
    variables,
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
            pageSize={pageSize}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            query={ADVERSE_EVENTS_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;

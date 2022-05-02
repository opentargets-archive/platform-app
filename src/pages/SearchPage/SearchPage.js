import React, { useState, useEffect, lazy, Suspense } from 'react';
import { loader } from 'graphql.macro';
import queryString from 'query-string';
import { Typography } from '@material-ui/core';
import BasePage from '../../components/BasePage';
import LoadingBackdrop from '../../components/LoadingBackdrop';

import client from '../../client';

const SearchContainer = lazy(() => import('./SearchContainer'));
const EmptyPage = lazy(() => import('../EmptyPage'));

const SEARCH_PAGE_QUERY = loader('./SearchPageQuery.gql');
const QS_OPTIONS = {
  sort: false,
  arrayFormat: 'comma',
  skipNull: true,
};

const parseQueryString = qs => {
  const params = queryString.parse(qs, QS_OPTIONS);
  if (!params.entities) {
    params.entities = [];
  } else if (typeof params.entities === 'string') {
    params.entities = [params.entities];
  }
  return params;
};

const SearchPage = ({ location, history }) => {
  const { q, page, entities } = parseQueryString(location.search);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      let isCurrent = true;
      client
        .query({
          query: SEARCH_PAGE_QUERY,
          variables: {
            queryString: q,
            index: page - 1,
            entityNames: entities,
          },
        })
        .then(res => {
          if (isCurrent) {
            setData(res.data);
          }
        });

      return () => {
        isCurrent = false;
      };
    },
    [q, page, entities]
  );

  const handleChangePage = (event, page) => {
    const params = { q, page: page + 1, entities };
    const qs = queryString.stringify(params, QS_OPTIONS);
    history.push(`/search?${qs}`);
  };

  const handleSetEntity = entity => (event, checked) => {
    const params = {
      q,
      page: 1, // reset to page 1
      entities: checked
        ? [...entities, entity]
        : entities.filter(e => e !== entity),
    };
    const qs = queryString.stringify(params, QS_OPTIONS);
    history.push(`/search?${qs}`);
  };

  return (
    <BasePage>
      <Suspense fallback={<LoadingBackdrop />}>
        {data ? (
          data.search.total === 0 ? (
            <EmptyPage>
              <Typography align="center">
                We could not find anything in the Platform database that matches
              </Typography>
              <Typography align="center">"{q}"</Typography>
            </EmptyPage>
          ) : (
            <SearchContainer
              q={q}
              page={page}
              entities={entities}
              onSetEntity={handleSetEntity}
              onChangePage={handleChangePage}
              data={data}
            />
          )
        ) : null}
      </Suspense>
    </BasePage>
  );
};

export default SearchPage;

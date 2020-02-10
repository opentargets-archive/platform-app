import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'ot-ui';
import BasePage from '../common/BasePage';
import { client2 } from '../App';
import TargetDetail from './TargetDetail';
import DiseaseDetail from './DiseaseDetail';
import DrugDetail from './DrugDetail';

console.log('DiseaseDetail', DiseaseDetail);

const AGGS_QUERY = loader('./SearchPageAggsQuery.gql');
const SEARCH_PAGE_QUERY = loader('./SearchPageQuery.gql');
const TOP_HIT_QUERY = loader('./TopHitQuery.gql');
const QS_OPTIONS = {
  sort: false,
  arrayFormat: 'comma',
  skipNull: true,
};

const TargetResult = ({ data }) => {
  return (
    <>
      <Link to={`/target/${data.id}`}>{data.approvedSymbol}</Link>
      <Typography component="div">
        <Clampy clampSize="4">{data.proteinAnnotations.functions[0]}</Clampy>
      </Typography>
    </>
  );
};

const DiseaseResult = ({ data }) => {
  return (
    <>
      <Link to={`/disease/${data.id}`}>{data.name}</Link>
      <Typography>{data.description}</Typography>
    </>
  );
};

const DrugResult = ({ data }) => {
  return (
    <div>
      <Link to={`drug/${data.id}`}>{data.name}</Link>
    </div>
  );
};

const TopHitDetails = ({ data }) => {
  const { __typename } = data;
  return (
    <Card elevation={0}>
      {__typename === 'Target' ? (
        <TargetDetail data={data} />
      ) : __typename === 'Disease' ? (
        <DiseaseDetail data={data} />
      ) : (
        <DrugDetail data={data} />
      )}
    </Card>
  );
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

  const changePage = (event, page) => {
    const params = { q, page: page + 1, entities };
    const qs = queryString.stringify(params, QS_OPTIONS);
    history.push(`/search?${qs}`);
  };

  const setEntity = entity => (event, checked) => {
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
      <Typography variant="h5">Search results for {q}</Typography>
      <Grid container>
        <Grid item md={2}>
          <Typography>Refine by:</Typography>
          <FormGroup>
            <Query
              client={client2}
              query={AGGS_QUERY}
              variables={{ queryString: q }}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading...';
                }

                if (error) {
                  return 'Error...';
                }

                const targetCount = data.search.aggregations.entities.find(
                  entity => entity.name === 'target'
                ).total;
                const diseaseCount = data.search.aggregations.entities.find(
                  entity => entity.name === 'disease'
                ).total;
                const drugCount = data.search.aggregations.entities.find(
                  entity => entity.name === 'drug'
                ).total;

                return (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={entities.includes('target')}
                          onChange={setEntity('target')}
                        />
                      }
                      label={`Target (${targetCount})`}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={entities.includes('disease')}
                          onChange={setEntity('disease')}
                        />
                      }
                      label={`Disease (${diseaseCount})`}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={entities.includes('drug')}
                          onChange={setEntity('drug')}
                        />
                      }
                      label={`Drug (${drugCount})`}
                    />
                  </>
                );
              }}
            </Query>
          </FormGroup>
        </Grid>
        <Grid item md={7}>
          <Query
            client={client2}
            query={SEARCH_PAGE_QUERY}
            variables={{
              queryString: q,
              index: page - 1,
              entityNames: entities,
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }

              if (error) {
                return 'Error';
              }

              const results = data.search.hits;

              return (
                <>
                  {results.map(({ object }) => {
                    return object.__typename === 'Target' ? (
                      <TargetResult key={object.id} data={object} />
                    ) : object.__typename === 'Disease' ? (
                      <DiseaseResult key={object.id} data={object} />
                    ) : (
                      <DrugResult key={object.id} data={object} />
                    );
                  })}
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    rowsPerPage={10}
                    count={data.search.total}
                    page={page - 1}
                    onChangePage={changePage}
                  />
                </>
              );
            }}
          </Query>
        </Grid>
        <Grid item md={3}>
          <Query
            client={client2}
            query={TOP_HIT_QUERY}
            variables={{ queryString: q, entityNames: entities }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }

              if (error) {
                return 'Error...';
              }

              return data.search.hits.length > 0 ? (
                <TopHitDetails data={data.search.hits[0].object} />
              ) : null;
            }}
          </Query>
        </Grid>
      </Grid>
    </BasePage>
  );
};

export default SearchPage;

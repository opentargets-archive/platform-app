import React from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import queryString from 'query-string';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TablePagination from '@material-ui/core/TablePagination';
import BasePage from '../common/BasePage';
import { client2 } from '../App';
import TargetDetail from './TargetDetail';
import DiseaseDetail from './DiseaseDetail';
import DrugDetail from './DrugDetail';
import TargetResult from './TargetResult';
import DiseaseResult from './DiseaseResult';
import DrugResult from './DrugResult';

const AGGS_QUERY = loader('./SearchPageAggsQuery.gql');
const SEARCH_PAGE_QUERY = loader('./SearchPageQuery.gql');
const TOP_HIT_QUERY = loader('./TopHitQuery.gql');
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

const getCounts = entities => {
  const counts = {
    target: 0,
    disease: 0,
    drug: 0,
  };

  entities.forEach(entity => {
    counts[entity.name] = entity.total;
  });

  return counts;
};

const styles = () => ({
  label: {
    marginLeft: '-6px',
  },
});

const SearchPage = ({ classes, location, history }) => {
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
      <Typography variant="h5" gutterBottom>
        Search results for {q}
      </Typography>
      <Grid container spacing={24}>
        <Grid item md={2}>
          <Typography>Refine by:</Typography>
          <FormGroup row>
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

                const counts = getCounts(data.search.aggregations.entities);

                return (
                  <>
                    <FormControlLabel
                      className={classes.label}
                      control={
                        <Checkbox
                          checked={entities.includes('target')}
                          onChange={setEntity('target')}
                        />
                      }
                      label={`Target (${counts.target})`}
                    />
                    <FormControlLabel
                      className={classes.label}
                      control={
                        <Checkbox
                          checked={entities.includes('disease')}
                          onChange={setEntity('disease')}
                        />
                      }
                      label={`Disease (${counts.disease})`}
                    />
                    <FormControlLabel
                      className={classes.label}
                      control={
                        <Checkbox
                          checked={entities.includes('drug')}
                          onChange={setEntity('drug')}
                        />
                      }
                      label={`Drug (${counts.drug})`}
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

              const topHit =
                data.search.hits.length > 0 ? data.search.hits[0].object : null;

              return topHit ? (
                <Card elevation={0}>
                  {topHit.__typename === 'Target' ? (
                    <TargetDetail data={topHit} />
                  ) : topHit.__typename === 'Disease' ? (
                    <DiseaseDetail data={topHit} />
                  ) : topHit.__typename === 'Drug' ? (
                    <DrugDetail data={topHit} />
                  ) : null}
                </Card>
              ) : null;
            }}
          </Query>
        </Grid>
      </Grid>
    </BasePage>
  );
};

export default withStyles(styles)(SearchPage);

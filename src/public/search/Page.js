import React from 'react';
import { useQuery } from '@apollo/client';
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
import { client2 } from '../client';
import TargetIcon from '../../icons/TargetIcon';
import DiseaseIcon from '../../icons/DiseaseIcon';
import DrugIcon from '../../icons/DrugIcon';
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

const parseQueryString = (qs) => {
  const params = queryString.parse(qs, QS_OPTIONS);
  if (!params.entities) {
    params.entities = [];
  } else if (typeof params.entities === 'string') {
    params.entities = [params.entities];
  }
  return params;
};

const getCounts = (entities) => {
  const counts = {
    target: 0,
    disease: 0,
    drug: 0,
  };

  entities.forEach((entity) => {
    counts[entity.name] = entity.total;
  });

  return counts;
};

const styles = (theme) => ({
  label: {
    marginLeft: '-6px',
  },
  targetIcon: {
    verticalAlign: 'bottom',
    color: theme.palette.primary.main,
    marginRight: '14px',
  },
  diseaseIcon: {
    verticalAlign: 'bottom',
    color: theme.palette.primary.main,
    marginRight: '3px',
  },
  drugIcon: {
    verticalAlign: 'bottom',
    color: theme.palette.primary.main,
    marginRight: '8px',
  },
});

const SearchFilters = withStyles(styles)(
  ({ classes, q, entities, setEntity }) => {
    const { loading, error, data } = useQuery(AGGS_QUERY, {
      client: client2,
      variables: { queryString: q },
    });

    if (loading || error) return null;

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
          label={
            <>
              <TargetIcon className={classes.targetIcon} />
              Target ({counts.target})
            </>
          }
        />
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={entities.includes('disease')}
              onChange={setEntity('disease')}
            />
          }
          label={
            <>
              <DiseaseIcon className={classes.diseaseIcon} />
              Disease ({counts.disease}){' '}
            </>
          }
        />
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={entities.includes('drug')}
              onChange={setEntity('drug')}
            />
          }
          label={
            <>
              <DrugIcon className={classes.drugIcon} />
              Drug ({counts.drug})
            </>
          }
        />
      </>
    );
  }
);

const SearchResults = ({ q, page, entities, changePage }) => {
  const { loading, error, data } = useQuery(SEARCH_PAGE_QUERY, {
    client: client2,
    variables: {
      queryString: q,
      index: page - 1,
      entityNames: entities,
    },
  });

  if (loading || error) return null;

  const results = data.search.hits;

  return (
    <>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        rowsPerPage={10}
        count={data.search.total}
        page={page - 1}
        onChangePage={changePage}
      />
      {results.map(({ highlights, object }) => {
        return object.__typename === 'Target' ? (
          <TargetResult key={object.id} data={object} highlights={highlights} />
        ) : object.__typename === 'Disease' ? (
          <DiseaseResult
            key={object.id}
            data={object}
            highlights={highlights}
          />
        ) : (
          <DrugResult key={object.id} data={object} highlights={highlights} />
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
};

const TopHitDetail = ({ q, entities }) => {
  const { loading, error, data } = useQuery(TOP_HIT_QUERY, {
    client: client2,
    variables: { queryString: q, entityNames: entities },
  });

  if (loading || error) return null;

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
};

const SearchPage = ({ location, history }) => {
  const { q, page, entities } = parseQueryString(location.search);

  const changePage = (event, page) => {
    const params = { q, page: page + 1, entities };
    const qs = queryString.stringify(params, QS_OPTIONS);
    history.push(`/search?${qs}`);
  };

  const setEntity = (entity) => (event, checked) => {
    const params = {
      q,
      page: 1, // reset to page 1
      entities: checked
        ? [...entities, entity]
        : entities.filter((e) => e !== entity),
    };
    const qs = queryString.stringify(params, QS_OPTIONS);
    history.push(`/search?${qs}`);
  };

  return (
    <BasePage>
      <Typography variant="h5" gutterBottom>
        Search results for {q}
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <Typography>Refine by:</Typography>
          <FormGroup>
            <SearchFilters q={q} entities={entities} setEntity={setEntity} />
          </FormGroup>
        </Grid>
        <Grid item md={7}>
          <SearchResults
            q={q}
            page={page}
            entities={entities}
            changePage={changePage}
          />
        </Grid>
        <Grid item md={3}>
          <TopHitDetail q={q} entities={entities} />
        </Grid>
      </Grid>
    </BasePage>
  );
};

export default SearchPage;

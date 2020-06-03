import React, { useState, useEffect } from 'react';
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
import EmptyPage from '../common/EmptyPage';
import ErrorBoundary from '../common/ErrorBoundary';
import TargetIcon from '../../icons/TargetIcon';
import DiseaseIcon from '../../icons/DiseaseIcon';
import DrugIcon from '../../icons/DrugIcon';
import TargetDetail from './TargetDetail';
import DiseaseDetail from './DiseaseDetail';
import DrugDetail from './DrugDetail';
import TargetResult from './TargetResult';
import DiseaseResult from './DiseaseResult';
import DrugResult from './DrugResult';
import client from '../client';

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

const styles = theme => ({
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
  ({ classes, entities, entitiesCount, setEntity }) => {
    const counts = getCounts(entitiesCount);

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
              <Typography variant="body2" display="inline">
                Target ({counts.target})
              </Typography>
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
              <Typography variant="body2" display="inline">
                Disease ({counts.disease})
              </Typography>
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
              <Typography variant="body2" display="inline">
                Drug ({counts.drug})
              </Typography>
            </>
          }
        />
      </>
    );
  }
);

const SearchResults = ({ q, results, page, entities, onChangePage }) => {
  return (
    <>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        rowsPerPage={10}
        count={results.total}
        page={page - 1}
        onChangePage={onChangePage}
      />
      {results.hits.map(({ highlights, object }) => {
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
        count={results.total}
        page={page - 1}
        onChangePage={onChangePage}
      />
    </>
  );
};

const TopHitDetail = ({ topHit }) => {
  return (
    <Card elevation={0}>
      <ErrorBoundary>
        {topHit.__typename === 'Target' ? (
          <TargetDetail data={topHit} />
        ) : topHit.__typename === 'Disease' ? (
          <DiseaseDetail data={topHit} />
        ) : topHit.__typename === 'Drug' ? (
          <DrugDetail data={topHit} />
        ) : null}
      </ErrorBoundary>
    </Card>
  );
};

const SearchContainer = ({
  q,
  page,
  entities,
  data,
  onChangePage,
  onSetEntity,
}) => {
  const { entities: entitiesCount } = data.search.aggregations;
  const topHit = data.topHit.hits[0].object;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Search results for {q}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Typography variant="body2">Refine by:</Typography>
          <FormGroup>
            <SearchFilters
              entities={entities}
              entitiesCount={entitiesCount}
              setEntity={onSetEntity}
            />
          </FormGroup>
        </Grid>
        <Grid item md={7}>
          <SearchResults
            page={page}
            results={data.search}
            onChangePage={onChangePage}
          />
        </Grid>
        <Grid item md={3}>
          <TopHitDetail topHit={topHit} />
        </Grid>
      </Grid>
    </>
  );
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
    </BasePage>
  );
};

export default SearchPage;

import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TablePagination,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';

import DiseaseDetail from './DiseaseDetail';
import DiseaseResult from './DiseaseResult';
import DrugDetail from './DrugDetail';
import DrugResult from './DrugResult';
import ErrorBoundary from '../../components/ErrorBoundary';
import TargetDetail from './TargetDetail';
import TargetResult from './TargetResult';

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
  labelIcon: {
    color: theme.palette.primary.main,
    marginRight: '2px',
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
              <FontAwesomeIcon
                icon={faDna}
                fixedWidth
                className={classes.labelIcon}
              />
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
              <FontAwesomeIcon
                icon={faStethoscope}
                fixedWidth
                className={classes.labelIcon}
              />
              <Typography variant="body2" display="inline">
                Disease or phenotype ({counts.disease})
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
              <FontAwesomeIcon
                icon={faPrescriptionBottleAlt}
                fixedWidth
                className={classes.labelIcon}
              />
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

const SearchResults = ({ results, page, onChangePage }) => {
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
  const topHit = data.topHit.hits[0]?.object;

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
          {data.search.hits.length > 0 ? (
            <SearchResults
              page={page}
              results={data.search}
              onChangePage={onChangePage}
            />
          ) : null}
        </Grid>
        <Grid item md={3}>
          {topHit ? <TopHitDetail topHit={topHit} /> : null}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchContainer;

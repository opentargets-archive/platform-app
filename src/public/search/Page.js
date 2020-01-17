import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'ot-ui';
import BasePage from '../common/BasePage';
import { client2 } from '../App';

const SEARCH_PAGE_QUERY = loader('./SearchPageQuery.gql');

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
  return <Link to={`drug/${data.id}`}>{data.name}</Link>;
};

const SearchPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const queryString = searchParams.get('q');
  return (
    <BasePage>
      <Typography variant="h5">
        Search results for {searchParams.get('q')}
      </Typography>
      <Query
        client={client2}
        query={SEARCH_PAGE_QUERY}
        variables={{ queryString }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }

          if (error) {
            return 'Error';
          }

          const results = [
            ...data.search.targets,
            ...data.search.diseases,
            ...data.search.drugs,
          ];

          return (
            <Grid container>
              <Grid item md={2}>
                <Typography>Refine by:</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Target" />
                  <FormControlLabel control={<Checkbox />} label="Disease" />
                  <FormControlLabel control={<Checkbox />} label="Drug" />
                </FormGroup>
              </Grid>
              <Grid item md={7}>
                {results.map(data => {
                  return data.__typename === 'Target' ? (
                    <TargetResult key={data.id} data={data} />
                  ) : data.__typename === 'Disease' ? (
                    <DiseaseResult key={data.id} data={data} />
                  ) : (
                    <DrugResult key={data.id} data={data} />
                  );
                })}
              </Grid>
              <Grid item md={3}>
                Top Hit
              </Grid>
            </Grid>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default SearchPage;

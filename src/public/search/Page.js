import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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

const TargetDetail = ({ data }) => {
  const {
    approvedSymbol,
    approvedName,
    proteinAnnotations: { functions, accessions },
    associationsOnTheFly: { rows },
  } = data;
  return (
    <>
      <CardHeader title={approvedSymbol} subheader={approvedName} />
      <CardContent>
        <Typography>{functions[0]}</Typography>
        <Typography variant="h6">Top associated diseases</Typography>
        {rows.map(({ id }) => {
          return (
            <Link key={id} to={`/disease/${id}`}>
              {id}
            </Link>
          );
        })}
        <Typography variant="h6">Biotype</Typography>
        <Typography>{data.bioType}</Typography>
        <Typography variant="h6">Uniprot accessions</Typography>
        {accessions.map(accession => {
          return (
            <Link
              key={accession}
              external
              to={`http://www.uniprot.org/uniprot/${accession}`}
            >
              {accession}
            </Link>
          );
        })}
      </CardContent>
    </>
  );
};

const DiseaseDetail = ({ data }) => {
  return 'Disease detail';
};

const DrugDetail = ({ data }) => {
  return 'Drug detail';
};

const TopHitDetails = ({ data }) => {
  const { __typename } = data;
  return (
    <Card elevation={0}>
      {__typename === 'Target' ? (
        <TargetDetail data={data} />
      ) : __typename === 'Disease' ? (
        <DiseaseDetail />
      ) : (
        <DrugDetail />
      )}
    </Card>
  );
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
                <TopHitDetails data={results[0]} />
              </Grid>
            </Grid>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default SearchPage;

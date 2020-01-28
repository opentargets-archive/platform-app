import React, { Fragment, useState } from 'react';
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
import TablePagination from '@material-ui/core/TablePagination';
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
  return (
    <div>
      <Link to={`drug/${data.id}`}>{data.name}</Link>
    </div>
  );
};

const TargetDetail = ({ data }) => {
  const {
    approvedSymbol,
    approvedName,
    proteinAnnotations: { functions, accessions },
    bioType,
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
            <Fragment key={id}>
              <Link to={`/disease/${id}`}>{id}</Link>{' '}
            </Fragment>
          );
        })}
        <Typography variant="h6">Biotype</Typography>
        <Typography>{bioType}</Typography>
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
  const {
    name,
    description,
    associationsOnTheFly: { rows },
    therapeuticAreas,
  } = data;
  return (
    <>
      <CardHeader title={name} />
      <CardContent>
        <Typography>{description}</Typography>
        <Typography variant="h6">Top associated targets</Typography>
        {rows.map(({ id }) => {
          return (
            <Fragment key={id}>
              <Link to={`/target/${id}`}>{id}</Link>{' '}
            </Fragment>
          );
        })}
        <Typography variant="h6">Therapeutic areas</Typography>
        {therapeuticAreas.map(area => {
          return (
            <Link key={area.id} to={`/disease/${area.id}`}>
              {area.name}
            </Link>
          );
        })}
      </CardContent>
    </>
  );
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
        <DiseaseDetail data={data} />
      ) : (
        <DrugDetail data={data} />
      )}
    </Card>
  );
};

const SearchPage = ({ location }) => {
  const [index, setIndex] = useState(0);
  const [entities, setEntities] = useState({
    target: false,
    disease: false,
    drug: false,
  });
  const searchParams = new URLSearchParams(location.search);
  const queryString = searchParams.get('q');

  const changePage = (event, page) => {
    setIndex(page);
  };

  const setEntity = entity => (event, checked) => {
    setEntities({ ...entities, [entity]: checked });
  };

  const entityNames = Object.keys(entities).filter(entity => entities[entity]);

  return (
    <BasePage>
      <Typography variant="h5">
        Search results for {searchParams.get('q')}
      </Typography>
      <Grid container>
        <Grid item md={2}>
          <Typography>Refine by:</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={entities.target}
                  onChange={setEntity('target')}
                />
              }
              label="Target"
            />
            <FormControlLabel
              control={<Checkbox onChange={setEntity('disease')} />}
              label="Disease"
            />
            <FormControlLabel
              control={<Checkbox onChange={setEntity('drug')} />}
              label="Drug"
            />
          </FormGroup>
        </Grid>
        <Query
          client={client2}
          query={SEARCH_PAGE_QUERY}
          variables={{ queryString, index, entityNames }}
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
                <Grid item md={7}>
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
                    count={100}
                    page={index}
                    onChangePage={changePage}
                  />
                </Grid>
                <Grid item md={3}>
                  <TopHitDetails data={data.search.top.object} />
                </Grid>
              </>
            );
          }}
        </Query>
      </Grid>
    </BasePage>
  );
};

export default SearchPage;

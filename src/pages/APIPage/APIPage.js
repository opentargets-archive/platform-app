import { Suspense, useState, lazy } from 'react';
import { loader } from 'graphql.macro';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'graphiql/graphiql.min.css';

import Link from '../../components/Link';
import config from '../../config';

const TARGET_ASSOCS = loader('./TargetAssocs.gql');
const DISEASE_ASSOCS = loader('./DiseaseAssocs.gql');
const GraphiQL = lazy(() => import('graphiql'));

const useStyles = makeStyles({
  container: {
    minHeight: '600px',
  },
  buttonMargin: {
    marginBottom: '12px',
  },
});

const fetcher = async graphQLParams => {
  const data = await fetch(config.urlApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
  });
  return data.json();
};

function APIPage() {
  const classes = useStyles();
  const [query, setQuery] = useState(null);

  return (
    <>
      <Typography variant="h4" paragraph>
        API
      </Typography>
      <Typography paragraph>
        The Open Targets Platform is powered by a GraphQL API that supports
        graphical queries for a single entity or target-disease association
        across our knowledge graph. Read our{' '}
        <Link
          external
          to="https://platform-docs.opentargets.org/data-access/graphql-api"
        >
          GraphQL API documentation
        </Link>{' '}
        and visit the{' '}
        <Link external to="https://community.opentargets.org">
          Open Targets Community
        </Link>{' '}
        for more how-to guides and tutorials.
      </Typography>
      <Typography paragraph>
        Please note that ur API is optimised for a single query. For more
        programmatic or systematic analyses, please use{' '}
        <Link
          external
          to="https://platform-docs.opentargets.org/data-access/datasets"
        >
          our dataset downloads
        </Link>{' '}
        or{' '}
        <Link
          external
          to="https://platform-docs.opentargets.org/data-access/google-bigquery"
        >
          Google BigQuery instance
        </Link>
        .
      </Typography>
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={3} xl={2}>
          <Typography variant="h5" paragraph>
            Example queries
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Target-disease association (2)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find targets associated with a specific disease or phenotype
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    // console.log('lol', TARGET_DISEASE_ASSOCS.loc.source.body)
                    setQuery(DISEASE_ASSOCS.loc.source.body)
                  }
                >
                  Run sample query
                </Button>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find diseases and phenotypes associated with a specific target
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(TARGET_ASSOCS.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Target-disease evidence (2)
              </Typography>
            </AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Target annotation (3)</Typography>
            </AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Disease annotation (3)
              </Typography>
            </AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Drug annotation (2)</Typography>
            </AccordionSummary>
            <AccordionDetails />
          </Accordion>
        </Grid>
        <Grid item md={9} xl={10}>
          <Suspense fallback={<div>Loading...</div>}>
            <GraphiQL fetcher={fetcher} query={query} />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}

export default APIPage;

import { Suspense, lazy } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import 'graphiql/graphiql.min.css';

import Link from '../../components/Link';
import config from '../../config';

const GraphiQL = lazy(() => import('graphiql'));

const useStyles = makeStyles({
  container: {
    minHeight: '600px',
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
        programmatic or systematic analyses, please use our dataset downloads or
        Google BigQuery instance.
      </Typography>
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={2}>
          <Typography variant="h5" paragraph>
            Example queries
          </Typography>
          <Accordion>
            <AccordionSummary>Target-disease association</AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography display="block">
                  Find targets associated with a specific disease or phenotype
                </Typography>
                <Button>Run sample query</Button>
                <Typography display="block">
                  Find diseases and phenotypes associated with a specific target
                </Typography>
                <Button>Run sample query</Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Target-disease evidence</AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary>Target annotation</AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary>Disease annotation</AccordionSummary>
            <AccordionDetails />
          </Accordion>
          <Accordion>
            <AccordionSummary>Drug annotation</AccordionSummary>
            <AccordionDetails />
          </Accordion>
        </Grid>
        <Grid item md={10}>
          <Suspense fallback={<div>Loading...</div>}>
            <GraphiQL fetcher={fetcher} />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}

export default APIPage;

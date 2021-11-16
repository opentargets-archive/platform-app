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
import { fetcher } from '../../utils/global';

const TARGET_ASSOCS = loader('./TargetAssocs.gql');
const DISEASE_ASSOCS = loader('./DiseaseAssocs.gql');
const TARGET_DISEASE_EVIDENCE = loader('./TargetDiseaseEvidence.gql');
const TARGET_ANNOTATION = loader('./TargetAnnotation.gql');
const DISEASE_ANNOTATION = loader('./DiseaseAnnotation.gql');
const DRUG_ANNOTATION = loader('./DrugAnnotation.gql');

// lazy load GraphiQL and remove Logo and Toolbar
const GraphiQL = lazy(() =>
  import('graphiql').then(module => {
    module.default.Logo = () => null;
    module.default.Toolbar = () => null;
    return module;
  })
);

const useStyles = makeStyles({
  container: {
    minHeight: '600px',
  },
  buttonMargin: {
    marginBottom: '12px',
  },
});

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
                Target-disease association
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
                  onClick={() => setQuery(DISEASE_ASSOCS.loc.source.body)}
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
                Target-disease evidence
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Explore evidence that supports a specific target-disease
                  association
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setQuery(TARGET_DISEASE_EVIDENCE.loc.source.body)
                  }
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Target annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find tractability and safety information for a specific target
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(TARGET_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Disease annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find clinical signs and symptoms for a specific disease
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(DISEASE_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Drug annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find approval status and withdrawn and black-box warning for a
                  specific drug
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(DRUG_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
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

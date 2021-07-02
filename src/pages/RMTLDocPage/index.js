import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link, Avatar } from '@material-ui/core';
import BasePage from '../../components/BasePage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  floatLeft: {
    float: 'left',
  },
  maxWidth: {
    maxWidth: '55px',
  },
  paddingLeft: {
    paddingLeft: '45px !important',
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function RMTLDocPage() {
  const classes = useStyles();
  const legalRequirementsLink =
    'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title21-section355c&num=0&edition=prelim';
  const fDPublicationLink =
    'https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology';
  const ensemblStableIDLink =
    'https://useast.ensembl.org/info/genome/stable_ids/index.html#:~:text=Stable%20identifiers%20are%20ways%20that,and%20consistent%20across%20Ensembl%20releases';
  const hugoHgncLink = 'https://www.genenames.org/download/custom/';

  const fdaRMTL = '/fda-rmtl';

  return (
    <BasePage title="RMLT Document Page">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              US Food & Drug Administration Relevant Molecular Target List (FDA
              RMTL)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              In 2018, the United States Food & Drug Administration (FDA)
              published the Pediatric Relevant Molecular Target List (RMTL). In
              general, this list contains targets that are important for studies
              of pediatric cancer. The targets in this list have special legal
              requirements associated with drug development.
            </Typography>
            <Typography paragraph>
              The official FDA publication can be found (
              <Link href={fDPublicationLink} rel="noopener" target="_blank">
                here
              </Link>
              ), and the specific legal requirements can be found in full detail
              (
              <Link href={legalRequirementsLink} rel="noopener" target="_blank">
                here
              </Link>
              ).
            </Typography>
            <Typography paragraph>
              The full RMTL within Open Targets can be accessed (
              <Link href={fdaRMTL} rel="noopener" target="_blank">
                here
              </Link>
              ).
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">Designations</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              In our instance of Open Targets, all targets fall into one of
              three FDA RMTL designations:
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Grid container spacing={0}>
              <Grid item xs className={classes.maxWidth}>
                <Avatar className={classes.avatarHasData}>R</Avatar>
              </Grid>
              <Grid item xs>
                <Typography paragraph>
                  <b>Relevant Molecular Target: </b>
                  These targets have evidence indicating their relevance in the
                  growth or progression of pediatric cancers. Any new drugs
                  developed for these targets in adult cancers must also be
                  studied for use in pediatric cancers.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Grid container spacing={0}>
              <Grid item xs className={classes.maxWidth}>
                <Avatar className={classes.avatarHasData}> NR</Avatar>
              </Grid>
              <Grid item xs>
                <Typography paragraph>
                  <b> Non-Relevant Molecular Target: </b>
                  These targets have evidence indicating that they are not
                  relevant in the growth or progression of pediatric cancers, or
                  that studies of them would be ineffective or impractical for
                  therapeutic pediatric use. Any new drugs developed for these
                  targets in adult cancers will receive an automatic waiver from
                  also studying them in pediatric cancers.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.paddingLeft}>
            <Grid container spacing={0}>
              <Grid item xs className={classes.maxWidth}>
                <Avatar className={classes.avatar}> ?</Avatar>
              </Grid>
              <Grid item xs>
                <Typography paragraph>
                  <b> Unspecified Target:</b>
                  These targets are not mentioned in the FDA RMTL. Most targets
                  within the Open Targets Platform fall into this category by
                  default.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Open Targets Compatibility</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              The RMTL as published by the FDA required significant reformatting
              to allow for machine-readability and compatibility with Open
              Targets.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              In Open Targets, every Target is identified with gene-level
              resolution by a unique (
              <Link href={ensemblStableIDLink} rel="noopener" target="_blank">
                Ensembl stable ID
              </Link>
              ) , and then mapped to other information (like gene name and
              symbol). As published, the FDA RMTL did not identify targets by a
              consistent set of mappable IDs. In addition, many FDA RMTL targets
              are representations of complex proteins or pathways, each
              consisting of a multitude of genes (e.g. “Proteasome”, “Tubulins”
              or “Hippo Pathway”). In order to implement the FDA RMTL into Open
              Targets, the list needed to be machine-readable and contain
              mappable IDs at gene-level resolution. Thus, the following
              standardization steps were taken to obtain our “expanded” FDA
              RMTL:
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Typography paragraph>
              1. Separated each list of genes, gene fusions, and gene
              abnormalities contained within a single target into separate
              targets
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Typography paragraph>
              2. Identified and separated pathways, gene groups, and other
              complex targets that required “unpacking” into component genes
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Typography paragraph>
              3. Using Human Genome Organization Gene Nomenclature Committee (
              <Link href={hugoHgncLink} rel="noopener" target="_blank">
                HUGO HGNC
              </Link>
              ) resources, manually standardized the names and symbols of all
              targets, which enabled mapping each target to Ensembl gene IDs.
              Original FDA-curated citations within the RMTL were used to guide
              this process.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              Note that each FDA RMTL target appearing in our expanded list can
              be directly traced to one or more targets in the FDA’s published
              list. No new targets were added that do not depend upon the FDA
              source.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              The detailed expanded RMTL containing FDA source targets and
              editor’s notes can be accessed (
              <Link href={hugoHgncLink} rel="noopener" target="_blank">
                here
              </Link>
              ) .
            </Typography>
          </Grid>
        </Grid>
      </div>
    </BasePage>
  );
}
export default RMTLDocPage;

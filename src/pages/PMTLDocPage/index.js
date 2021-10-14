import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link, Avatar, Paper } from '@material-ui/core';
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
  table: {
    'border-collapse': 'collapse',
    width: '100%',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
  th: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
}));

function PMTLDocPage() {
  const classes = useStyles();
  const fDPublicationLink =
    'https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology';
  const ensemblStableIDLink =
    'https://useast.ensembl.org/info/genome/stable_ids/index.html#:~:text=Stable%20identifiers%20are%20ways%20that,and%20consistent%20across%20Ensembl%20releases';
  const hugoHgncLink = 'https://www.genenames.org/download/custom/';

  const fdaPMTL = '/fda-pmtl';

  const fdaPmtlColumns = {
    tableHeader: ['Column Header', 'Example Value', 'Description'],
    tableDetail: [
      [
        'Target Symbol',
        'JAK1',
        'Gene-resolution HGNC approved symbol compatible with the Molecular Targets Platform',
      ],
      [
        'Designation',
        'Relevant Molecular Target',
        'FDA designation of “Relevant” or “Non-Relevant” in the growth of pediatric cancers',
      ],
      [
        'FDA Class',
        'Gene Abnormality',
        'Category of the target as listed in the FDA publication',
      ],
      [
        'FDA Target',
        ['JAK1, 2, and 3 | Gene Abnormality: JAK1, 2, and 3'],
        'Target as originally listed in the FDA publication. For targets in the Gene Abnormality FDA Class, the gene abnormality from the FDA publication is included here, separated from the target by “ | “ ' 
      ],
      [
        'Mapping Description',
        'Separate List',
        'Brief description of the action taken to map the target as listed in the FDA publication into one or more gene-level targets compatible with the Molecular Targets Platform'
      ],
    ],
  };

  const mappingDescription = {
    tableHeader: [
      'Mapping Description',
      'Example FDA Target',
      'Example Target Symbol(s) after reformatting',
      'Description',
    ],
    tableDetail: [
      [
        'Unchanged from FDA list',
        'PTEN',
        'PTEN',
        'FDA Target appears exactly as in the FDA publication',
      ],
      [
        'Standardize symbol',
        'Thymidylate synthase',
        'TYMS',
        'FDA Target was mapped to a single HGNC approved symbol',
      ],
      [
        'Separate list',
        'JAK1, 2, and 3',
        ['JAK1', 'JAK2', 'JAK3'],
        'FDA Targets in a human-readable list were separated into unique targets',
      ],
      [
        'Separate gene fusion',
        'BRD3-NUTM1',
        ['BRD3', 'NUTM1'],
        'FDA Target gene fusions were separated into component genes as unique targets',
      ],
      [
        'Separate gene abnormalities',
        ['EZH2 | Gene ', 'Abnormalities: SMARCB1, SMARCA4'],
        ['EZH2', 'SMARCB1', 'SMARCA4'],
        'FDA Targets and their listed gene abnormalities were separated into unique targets',
      ],
      [
        'Unpack complex target',
        'BET bromodomain family',
        ['BRD2', 'BRD3', 'BRD4', 'BRDT'],
        'FDA Targets consisting of multiple genes (such as gene families or complex proteins) were separated into unique, gene-level targets',
      ],
      [
        'Fix human error…',
        'IDH1 and IHD2',
        ['IDH1', 'IDH2'],
        'FDA Targets containing typos or mismatched citations were corrected. Details given for each instance',
      ],
      [
        'Cannot be mapped to gene-level target',
        'GD2',
        'GD2 (Disialoganglioside)',
        'Feedback from the FDA indicated that the FDA Target should not be mapped to any gene. Though incompatible with the Molecular Targets Platform, it will remain in the table for reference',
      ],
    ],
  };

  function displayTable(data) {
    return (
      <table className={classes.table}>
        <thead>
          <tr>
            {!data.tableHeader
              ? null
              : data.tableHeader.map(header => (
                  <th className={classes.th} key={header}>
                    {' '}
                    {header}{' '}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {!data.tableDetail
            ? null
            : data.tableDetail.map((row, i) => (
                <tr key={i + row}>
                  {row.map((detail, i) => (
                    <td className={classes.td} key={i + row + detail}>
                      {typeof detail !== 'object'
                        ? detail
                        : detail.map((item, i) => (
                            <p key={i + detail + item}> {item} </p>
                          ))}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    );
  }

  return (
    <BasePage title="PMTL Document">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              US Food & Drug Administration Pediatric Molecular Target Lists (FDA
              PMTL)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              In 2018, the United States Food & Drug Administration (FDA) published the Pediatric Molecular Target Lists (PMTL). 
              Briefly, these lists contain targets that are <b> important for studies of pediatric cancer</b>;
               one list defines molecular targets that are relevant to the growth of pediatric cancer,
                while the other defines molecular targets that are explicitly not relevant. 
                  The targets in these lists have <b> special legal requirements</b> associated with drug development. 
            </Typography>
            <Typography paragraph>
              While the  <Link href={fDPublicationLink} rel="noopener" target="_blank">
                <b>FDA publications </b>
              </Link>
              remain the authoritative source for these targets, a computable interpretation of the lists is integrated into the Molecular Targets Platform.
            </Typography>
            <Typography paragraph>
              Browse the 
              <Link href={fdaPMTL} rel="noopener" target="_blank">
                <b> FDA PMTL Landing Page </b>
              </Link>
              to identify pediatric molecular targets within the Molecular Targets Platform.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">Designations</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              In the Molecular Targets Platform, all targets fall into one of
              three FDA PMTL designations:
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
                  These targets have evidence indicating their relevance 
                  in the growth or progression of pediatric cancers. 
                  Any new drugs developed for these targets in 
                  adult cancers must also be studied for use in 
                  pediatric cancers. These targets are from the FDA’s 
                  published list of Relevant Molecular Targets.
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
                  These targets have evidence indicating that they are 
                  not relevant in the growth or progression of pediatric 
                  cancers, or that studies of them would be ineffective 
                  or impractical for therapeutic pediatric use. Any new 
                  drugs developed for these targets in adult cancers will
                  receive an automatic waiver from also studying them in
                  pediatric cancers. These targets are from the FDA’s 
                  list of Non-Relevant Molecular Targets (Automatic Waivers).
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
                  <b> Unspecified Target: </b>
                  These targets are not mentioned in the FDA PMTL. 
                  Most targets within the Molecular Targets Platform fall 
                  into this category by default.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Molecular Targets Platform Compatibility</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              The PMTL as published by the FDA is optimized for human-readability. 
              This presents several computational challenges for integration into 
              the Molecular Targets Platform. To overcome these challenges and make the PMTL compatible 
              with the Molecular Targets Platform, significant reformatting and interpretation was required.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              In the Molecular Targets Platform, every Target is identified with gene-level
              resolution by a unique (
              <Link href={ensemblStableIDLink} rel="noopener" target="_blank">
                <b>Ensembl stable ID</b>
              </Link>
              ), and then mapped to other information (e.g. gene name and
              symbol). As published, the FDA PMTL does not use 
              a standardized, computable naming system.  In addition, many FDA PMTL targets
              are representations of complex proteins or pathways, each
              consisting of a multitude of genes (e.g. “Proteasome”, “Tubulins”
              or “Hippo Pathway”).
             </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              In order to implement the FDA PMTL into the Molecular Targets Platform,
              each target needs to be machine-readable and contain mappable
               IDs at gene-level resolution. Thus, the following standardization 
               steps were taken to obtain our interpretation of the FDA PMTL:
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Typography paragraph>
              1. Separated each list of genes, gene fusions, 
              and gene abnormalities contained within a single 
              target into separate targets
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.paddingLeft}>
            <Typography paragraph>
              2. Identified and separated pathways, gene groups, 
              and other complex targets that required “unpacking” 
              into component genes with manual many-to-one mapping
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
              Original FDA-curated citations within the PMTL were used to guide
              this process.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              Note that each FDA PMTL target appearing in our interpretation 
              can be directly traced to one or more targets in the FDA’s 
              published lists. No new targets were added that do not depend 
              upon the FDA source.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              Also note that many Target Symbols occur more than once in the 
              FDA PMTL Landing Page by design. Any target derived from multiple
               FDA Targets will appear once for each FDA Target. For example,
                BRAF is derived from three separate FDA Targets: “BRAF | Gene 
                Abnormality: BRAF”, “ERK | Gene Abnormality: BRAF, MAP2K1”, 
                and “MEK | Gene Abnormality: BRAF and BRAF gene fusions, MAP2K1, 
                NF1”. Searching the Target Symbol column for “BRAF” on the FDA 
                PMTL Landing Page will show all of these derivations separately. 
          </Typography>
          </Grid>
        
         <Grid item xs={12} id="colums-description">
            <Typography variant="h4">Version</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
               The current version of the FDA PMTL used in the Molecular Targets Platform is <b> version 1.1. </b>
            </Typography>
          </Grid>


          <Grid item xs={12}>
            <Typography paragraph>
            We intend to update the targets listed in our 
            interpretation of the FDA PMTL as needed in 
            response to publications from the FDA or feedback 
            from the community. The first digit of the version 
            identifier will increase upon a new FDA publication, 
            and the second digit notes iterative interpretations 
            upon that FDA publication. 
            </Typography>
          </Grid>


          <Grid item xs={12}>
            <Typography paragraph>
            To view and download previous interpretations of the PMTL 
            and the detailed changelog, access the 
            <Link href={hugoHgncLink} rel="noopener" target="_blank">
                 <b> archive</b> 
              </Link>.
            </Typography>
          </Grid>


          <Grid item xs={12} id="colums-description">
            <Typography variant="h4">FDA PMTL Columns</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              The table below contains examples and descriptions of each column
              within the searchable <Link href={fdaPMTL} rel="noopener" target="_blank">
                <b> FDA PMTL Landing Page</b>
              </Link>.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" elevation={0}>
              {displayTable(fdaPmtlColumns)}
            </Paper>
          </Grid>
          <br />

          <Grid item xs={12} id="mapping-description">
            <Typography variant="h4">FDA PMTL Mapping Description</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography paragraph>
              The table below contains a description of each potential value in 
              the Mapping Description column. These describe the action(s) taken 
              to map targets within the published FDA PMTL into the computable, 
              gene-level targets used in the Molecular Targets Platform. Many FDA targets required 
              more than one action to reach Molecular Targets Platform compatibility; these are
              all listed for each target when appropriate (e.g. “Separate list 
              and standardize symbol”).
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" elevation={0}>
              {displayTable(mappingDescription)}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BasePage>
  );
}
export default PMTLDocPage;

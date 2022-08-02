import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Helmet } from 'react-helmet';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import ScrollToTop from '../../components/ScrollToTop';
import Link from '../../components/Link';
import {
  appDescription,
  appCanonicalUrl,
  contact
} from '../../constants';
import RelevantIcon from '../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../components/RMTL/NonRelevantIcon';
import UnspecifiedIcon from '../../components/RMTL/UnspecifiedIcon';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';
import Infographic from '../../assets/about/Infographic.png';
import classNames from 'classnames';
import cn from '../../components/helpers/classNameConcat';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '0 0 100px 0',
  },
  molecularTargetC: {
    margin: `${theme.header.height} 0px 0px`,
    padding: `${theme.header.spacing} 0px 56px`,
    backgroundColor: '#CDE9FF',
    fontSize: '16px'
  },
  container: {
    margin: '58px 0 0px 0',
    fontSize: '16px'
  },
  datasetContainer: {
    fontSize: '16px'
  },
  centerText: {
    textAlign: 'center'
  },
  title: {
    margin: '30px',
    color: '#5C605E',
    fontFamily: 'Inter',
    fontSize: '34px',
    fontWeight: '600',
  },
  'firstTitle': {
    marginTop: '0px',
  },
  boxTitle: {
    marginBottom: '34px',
  },

  infographicContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  infographicContent: {
    flex: 1,
    paddingLeft: '20px'
  },
  log10: {
    verticalAlign: 'bottom'
  },

  /* List Container CSS */
  listHeaderDiv: {
    display: 'flex', justifyContent: 'flexStart', alignItems: 'center', color: '#3489CA', cursor: 'pointer'
  },
  listContent: {
    backgroundColor: '#D7E8F6',
    padding: '20px 25px 20px 18px',
    font: 'Inter Regular',
    fontSize: '16px',
    lineHeight: '25px',
    color: '#5C605E',
    borderRadius: '10px'
  },
  listHeaderText:{
    fontSize: '19px',
    fontFamily: 'Inter',
    lineHeight: 1.6,
    fontWeight:500,

  },
  listHeaderAcronym:{
    fontSize: '16px',
    fontFamily: 'Inter',
    fontWeight:400,
  },
  playArrowIcon: {
    marginRight: '12px'
  },
  playArrowIconDown: {
        transform: 'rotate(90deg)',
        marginRight: '12px'
  },
  containerDiverHr: {
    color: '#808080', backgroundColor: '#808080', height: '2px', borderColor : '#808080',
  },
  listDiverHr: {
    color: '#D7E8F6', backgroundColor: '#D7E8F6', height: '2px',borderColor : '#D7E8F6'
  },
  space: {
    marginBottom: '64px'
  },
  space90: {
    marginBottom: '90px'
  },
  projectTitle: {
    color: '#2188D8'
  },  
  changeLogPaper: {
    marginBottom: '8px',
    borderRadius: '8px',
  },
  changeLogBox:{
    display: 'flex', 
    border: '1px solid #2188D8', 
    borderRadius: '6px'
  },

  changeLogBoxLeft:{
    flex: 1, padding: '12px 17px 17px 14px' 
  },

  changeLogBoxRight:{
    flex: 1,
    padding: '12px 17px 17px 14px',
    borderLeft: '1px solid #2188D8' 
  },

  base: {
    fontSize: 'inherit',
    textDecoration: 'none',
  },
  baseDefault: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  contactEmail: {
    // In order to fit long character of email 
    '@media (max-width: 450px)': {
      fontSize: '11px'
    },
  }
}));

const AboutView = ({ data }) => {
  const classes = useStyles();
  const appTitle = "About Page";
  const [showHide, setShowHide] = useState(
    {
      fdaPmtlDS: true,
      openPedCanDS: false,
      targetDS: false,
      kidsFirstDS: false,
      openPbtaDS: false,
      oncokbDS: false,
      gtexDS: false,

      pedCanDataNavDV: true,
      fdaPmtlDV: false,
      somaticAlterationsDV: false,
      geneExpressionDV: false

    }
  )
  const contactEmail = `mailto:${contact.email}`

  const showHideContent = (id) => {
    const newResult = !showHide[id]
    setShowHide({...showHide, [id]:newResult})
  }

  const listHeader = (headerStr,acronym, id) => {

    let headSplit = headerStr.split("%acronym");
    let header = <div><Typography variant="h6" component="h1" className={classes.listHeaderText}> {headerStr} </Typography></div>;
    if(acronym !== ""){
      header= <div>
              <span className={classes.listHeaderText}> {headSplit[0].replace("%acronym","")} </span>
               <span className={classes.listHeaderAcronym}> ({acronym})</span>
                <span className={classes.listHeaderText}> {headSplit[1]} </span>
          </div>
    }

    return (
      <div className={classes.listHeaderDiv} onClick={()=> showHideContent(id)}>
        <div className={showHide[id]? classes.playArrowIconDown : classes.playArrowIcon}><PlayArrowIcon /></div>
       {header}
      </div>
    )
  }

  const fdaPmtlDataSource = ()=>{
    return (
      <div className={classes.listContent}>
        <p>
          In accordance with the Race to Accelerate Cures and Equity (RACE) for Children Act, the FDA and NCI generated two lists: 
          one list of molecular targets relevant to the growth of pediatric cancers and one list of molecular targets not relevant 
          to the growth of pediatric cancers. The Molecular Targets Platform integrates a computable interpretation of these lists 
          in order to better inform decisions and improve treatments for childhood cancers. To read more about the implementation 
          of the FDA PMTL within the Molecular Targets Platform, read our detailed 
          <Link to="/fda-pmtl-docs">{' '} 
            FDA PMTL Documentation.
          </Link>
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target" external>{' '} 
            FDA Pediatric Molecular Target Lists<ExternalLinkIcon />{' '}
          </Link><br/> 
          Where this data is used in the MTP: 
          <Link to="/fda-pmtl">{' '} 
            FDA PMTL Landing Page 
          </Link><br/> 
          
        </p>
      </div>
    )
  }

  const openPedCanDataSource = ()=>{
    return (
      <div className={classes.listContent}>
        <p>
          The Open Pediatric Cancer (OpenPedCan) project at the Children’s Hospital of Philadelphia is an open analysis effort that harmonizes
          pediatric cancer data from multiple sources. Within the Molecular Targets Platform, the OpenPedCan analyses currently include the following datasets, described more fully 
          below: TARGET, Kids First Neuroblastoma, and OpenPBTA.
        </p>
        <p>
          SOURCE: 
          <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external>{' '} 
            OpenPedCan (v10)<ExternalLinkIcon />{' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Alterations; OpenPedCan Gene Expression
        </p>
      </div>
    )
  }

  const targetDataSource = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The Therapeutically Applicable Research to Generate Effective Treatments (TARGET) Initiative is an NCI-funded collection of 
          disease-specific projects that seeks to identify the genomic changes of pediatric cancers. The overall goal is to collect 
          genomic data to accelerate the development of more effective therapies. Within the Molecular Targets Platform, the OpenPedCan 
          analyses include the seven diseases present include the TARGET dataset: Acute Lymphoblastic Leukemia (ALL), Acute Myeloid Leukemia (AML), 
          Clear cell sarcoma of the kidney, Neuroblastoma, Osteosarcoma, Rhabdoid tumor, and Wilm’s Tumor.
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>{' '} 
            TARGET (v23)<ExternalLinkIcon />{' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Alterations; OpenPedCan Gene Expression
        </p>
      </div>
    )
  } 

  const kidsFirstDataSource = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The Gabriella Miller Kids First Pediatric Research Program (Kids First) is a large-scale effort to accelerate research and 
          gene discovery in pediatric cancers and structural birth defects. The program includes whole genome sequencing (WGS) from 
          patients with pediatric cancers and structural birth defects and their families. Within the Molecular Targets Platform, 
          the OpenPedCan analyses include Neuroblastoma data from the Kids First project.
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external>{' '} 
            Kids First Neuroblastoma<ExternalLinkIcon />{' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Alterations; OpenPedCan Gene Expression
        </p>
      </div>
    )
  }
  const openPbtaDataSource = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The Open Pediatric Brain Tumor Atlas (OpenPBTA) Project is an open science initiative led by 
          <Link to="https://www.alexslemonade.org/data-lab" external>{' '} 
            Alex’s Lemonade Stand Foundation Childhood Cancer Data Lab<ExternalLinkIcon />{' '}
          </Link>
          and the
          <Link to="https://d3b.center/" external>{' '} 
            Center for Data-Driven Discovery at the Children’s Hospital of Philadelphia 
            <ExternalLinkIcon />{', '}
          </Link> 
          which genomically characterized pediatric brain tumor data from the 
          <Link to="https://cbtn.org/" external>{' '} 
            Children’s Brain Tumor Network (CBTN)<ExternalLinkIcon />{', '}
          </Link> 
          and the 
          <Link to="https://pnoc.us/" external>{' '} 
            Pacific Pediatric Neuro-oncology Consortium (PNOC)<ExternalLinkIcon />{'. '}
          </Link> 
          The Molecular Targets Platform includes OpenPBTA data from over 1,000 tumors spanning more than 30 histologies.
        </p>
        <p>
          SOURCE: 
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '} 
            OpenPBTA for the CBTN (v21)<ExternalLinkIcon />{' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Alterations; OpenPedCan Gene Expression
        </p>
      </div>
    )
  }

  const oncokbDataSource = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The OncoKB Cancer Gene list from the Memorial Sloan Kettering Cancer Center is a curated list of genes considered 
          to be oncogenes or tumor suppressor genes based on inclusion in various other sequencing panels. The Molecular Targets Platform 
          includes the OncoKB list annotations as a field within the OpenPedCan Somatic Alterations displays.
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
            OncoKB (v3.5)<ExternalLinkIcon />
          </Link>{', '}
          <Link to="https://ascopubs.org/doi/full/10.1200/PO.17.00011" external>{' '} 
            Chakravarty et al., JCO PO 2017<ExternalLinkIcon />
          </Link><br />
          Where this data is used in the MTP: OpenPedCan Somatic Alterations
        </p>
      </div>
    )
  }
  
  const gtexDataSource = () => {
    return (
      <div className={classes.listContent}>
        <p>
          GTEx project is an ongoing effort to build a comprehensive public data resource and tissue
          bank to study tissue-specific gene expression, regulation and their relationship with
          genetic variants. Samples were collected from 54 non-diseased tissue sites across nearly
          1000 individuals, primarily for molecular assays including WGS, WES, and RNA-Seq.
          OpenPedCan project includes 17382 GTEx RNA-Seq samples from GTEx v8 release, which
          span across 31 GTEx groups in the v10 release.
        </p>
        <p>
          SOURCE:{' '}
          <Link to="https://gtexportal.org/home/" external>
            GTEx<ExternalLinkIcon />
          </Link>
        </p>
      </div>
    )
  }

  const fdaPmtlDataVisualizations = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The designations of the FDA Pediatric Molecular Target Lists can be visualized within the Molecular Targets Platform in several ways:
          <ul>
            <li>Browse the dedicated <Link to="/fda-pmtl"> FDA PMTL Landing Page </Link> to find Targets and see FDA details</li>
            <li>
              Icons throughout the Molecular Targets Platform identify targets as <RelevantIcon /> Relevant, <NonRelevantIcon /> Non-Relevant, or <UnspecifiedIcon /> Unspecified in pediatric cancers, and can be found:
              <ul>
                <li>On Target and Evidence Page headers</li>
                <li>On Disease pages when viewing the Associated Targets tab</li>
                <li>Within the OpenPedCan Somatic Alterations display</li>
              </ul>
            </li>
          </ul>	
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target" external>{' '} 
            FDA Publications of Pediatric Molecular Target Lists<ExternalLinkIcon />
          </Link>
          
        </p>
      </div>
    )
  }
  
  const pedCanDataNavDataVisualizations = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The <Link to="/pediatric-cancer-data-navigation"> Pediatric Cancer Data Navigation </Link> 
          page allows users to identify and navigate to pages that are certain to contain pediatric 
          cancer data visualizations. Searching for a target or disease on this page queries a 
          database containing only target-disease combinations for which new pediatric cancer 
          evidence exists. Search results include links to target and evidence pages, both of which 
          will include pediatric cancer data visualizations.
        </p>
        <p>
          Though it is possible to encounter pediatric cancer data when browsing the Molecular 
          Targets Platform, the Pediatric Cancer Data Navigation page is the most reliable method of 
          locating pediatric cancer data in the initial Platform release. Integration of the new 
          pediatric cancer data into existing Open Targets association heatmap displays is planned 
          for future release.
        </p>
        <p>
          SOURCE: 
          <Link to={"https://github.com/PediatricOpenTargets/OpenPedCan-analysis/blob/"+
                      "4fb04fe60754b90da3c241dbb8b727c3722487cc/doc/release-notes.md"} external>{' '} 
            OpenPedCan (v10)<ExternalLinkIcon />
          </Link>
          
        </p>
      </div>
    )
  }

  const saDataVisualizations =() => {
    return (
      <div className={classes.listContent}>
        <p>
          The OpenPedCan Somatic Alterations display aggregates data from harmonized analyses across several pediatric cancer datasets 
          performed within the OpenPedCan project. The primary goal of this display is to show the frequency of targets in both primary 
          and relapse pediatric tumors, where available. The display is organized into five tabs, each representing a different type of data:
            <ul>
              <li><b>SNV by Gene</b>: Frequency of <b>S</b>ingle <b>N</b>ucleotide <b>V</b>ariants aggregated by gene</li>
              <li><b>SNV by Variant</b>: Frequecy of specific <b>S</b>ingle <b>N</b>ucleotide <b>V</b>ariants</li>
              <li><b>CNV by Gene</b>: Frequency of specific <b>C</b>opy <b>N</b>umber <b>V</b>ariants</li>
              <li><b>Fusion by Gene</b>: Frequency of gene fusions aggregated by gene</li>
              <li><b>Fusion</b>: Frequency of specific gene fusions</li>
            </ul> 
            
          The OpenPedCan Somatic Alterations display is accessible within the Molecular Targets Platform on both the Target and Evidence pages. 
          The data driving each display is identical; however, the Target page display will show frequencies of the Target across all pediatric cancers, 
          while the Evidence page display is filtered to only show frequencies of the Target in a specific Disease.

          The data within the OpenPedCan Somatic Alterations display is derived from several source datasets, also known as cohorts. 
          A frequency is calculated and displayed for each dataset. Some Target-Disease combinations are present in more than one dataset; 
          these also have a frequency calculation across all datasets and are designated as 'All Cohorts'.
        </p>
        <p>
          SOURCE: 
          <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external> {' '}
            OpenPedCan (v10)<ExternalLinkIcon />
          </Link>{', '}
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>
            TARGET (v23)<ExternalLinkIcon />
          </Link>{', '}
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external> 
            Kids First Neuroblastoma<ExternalLinkIcon />
          </Link>{', '}
          <Link to="https://github.com/AlexsLemonade/OpenPBTA-analysis/" external>
            OpenPBTA for CBTN and PNOC (v21) analysis<ExternalLinkIcon />
          </Link>, and 
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '}
            manuscript<ExternalLinkIcon />
          </Link>{', '}
          <Link to="https://www.oncokb.org/news#07162021" external> 
            OncoKB (v3.5)<ExternalLinkIcon />
          </Link>
        </p>
      </div>
    )
  }
  
  const geneExDataVisualizations = () => {
    return (
      <div className={classes.listContent}>
        <p>
          The OpenPedCan Gene Expression plots visualize mRNA expression of Targets within pediatric cancers. 
          The expression is measured in Transcript Per Million (TPM) and is viewable with either a linear or log<span className={classes.log10}>10</span> scale. 
          The OpenPedCan Gene Expression plots are accessible on both the Target and Evidence pages, 
          though the views differ:
          <ul>
            <li><b>Target Page</b>: expression of specific Target across all pediatric cancers</li>
            <li><b>Evidence Page</b>: expression of specific Target in singlepediatric cancer alongside expression of the sameTarget across normal adult GTEx tissue</li>
          </ul> <br />

          The data within the OpenPedCan Gene Expression plots is derived from several source datasets. A single frequency box for each cancer is 
          calculated and displayed for each dataset. Some cancers are present in more than one dataset; these also have a frequency box calculated 
          across all datasets and designated as “All Cohorts”. 
        </p>
        <p>
          SOURCE: 
          <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external>{' '} 
            OpenPedCan (v10)<ExternalLinkIcon />
          </Link>, 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>{' '} 
            TARGET (v23)<ExternalLinkIcon />
          </Link>, 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external>{' '} 
            Kids First Neuroblastoma<ExternalLinkIcon />
          </Link>,
          <Link to="https://github.com/AlexsLemonade/OpenPBTA-analysis/" external>{' '} 
            OpenPBTA for CBTN and PNOC (v21) analysis<ExternalLinkIcon />
          </Link>, and
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '} 
            manuscript<ExternalLinkIcon />
          </Link>,
          <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
            OncoKB (v3.5)<ExternalLinkIcon />
          </Link>
          
        </p>
      </div>
    )
  }



  return (
    <>
    <Helmet title={appTitle}>
      <meta name="description" content={appDescription} />
      <link rel="canonical" href={appCanonicalUrl} />
    </Helmet>
    <ScrollToTop/>
    <NCIHeader/>
    <Grid container justify="center" className={classes.paper}>
      <Grid item >
        {/* The Molecular Targets Platform */}
        <Grid container justify="center" className={classes.molecularTargetC}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
            <Typography 
              variant="h4"
              component="h1"
              align="center"
              paragraph
              className={classNames(classes.title, classes.firstTitle)}
            >
              The Molecular Targets Platform
            </Typography>

            <Typography paragraph>
              The Molecular Targets Platform is a National Cancer Institute (NCI) instance of the 
              <Link to="https://platform.opentargets.org/" external>{' '} 
                Open Targets Platform<ExternalLinkIcon />{' '}
              </Link>
              with a focus on pediatric cancer data. This tool allows users to browse and identify associations between molecular targets, diseases, and drugs. 
              The Molecular Targets Platform builds upon the data and functionality of the Open Targets Platform while also including: 
            </Typography>
            
            <ul>
              <li>The FDA Pediatric Molecular Target Lists (FDA PMTL)</li>
              <li>
              Analyses of pediatric oncology datasets from the Open Pediatric Cancer (OpenPedCan) project at the
              Children's Hospital of Philadelphia:
                <ul>
                  <li>Therapeutically Applicable Research to Generate Effective Treatments (TARGET)</li>
                  <li>Open Pediatric Brain Tumor Atlas (OpenPBTA) </li>
                  <li>Gabriella Miller Kids First (Kids First) Neuroblastoma</li>
                </ul>
              </li>
            </ul>

            <Typography paragraph>
              As the project matures, new pediatric cancer data and additional functionality will be added to the Molecular Targets Platform.
            </Typography>

            <Typography paragraph>
         
             
              As the CCDI continues to refine the Molecular Targets Platform, input from the community is highly valued to help improve usability. Please send your feedback and comments to 
               {' '}
               <a className={classNames(classes.base, classes.baseDefault, classes.contactEmail)} href={contactEmail}>
                 {contact.email}
              </a>&nbsp;.
            </Typography>

          </Grid>
        </Grid>

        {/* The Open Targets Platform  */}
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>

            <Typography variant="h4" component="h1" align="center" paragraph className={classes.title}>
              The Open Targets Platform
            </Typography>

            <Typography paragraph>
              The 
              <Link to="https://platform.opentargets.org/" external>{' '} 
                Open Targets Platform<ExternalLinkIcon />{' '}
              </Link>
              is the open-source infrastructure upon which the Molecular Targets Platform is built. 

            </Typography>
            
            <Grid item container direction="row" alignItems="center" justify="center" className={classes.infographicContainer}>
                <Grid item>
                  <img src={Infographic} alt="Infographic of Molecular Targets Platform"/>
                </Grid>
                <Grid className={classes.infographicContent} item >
                  <Typography paragraph>
                    The Open Targets Platform is a comprehensive tool that supports systematic identification and prioritisation of 
                    potential therapeutic drug targets. By integrating publicly available datasets including data generated by the Open Targets consortium, 
                    the Platform builds and scores target-disease associations to assist in drug target identification and prioritisation. 
                    It also integrates relevant annotation information about targets, diseases, phenotypes, and drugs, as well as their most relevant relationships.
                  </Typography>
                </Grid>
            </Grid>
            
            <Typography paragraph>
              The Open Targets Platform is not an NCI program; their site is not affiliated with the NCI or any other US government agency. 
              However, the Open Targets Platform is an open-source product, meaning that the data and code are shared freely with other 
              organizations for development. The NCI has added pediatric cancer data and additional functionality into a separate instance 
              of the Open Targets Platform under NCI control – the Molecular Targets Platform.
            </Typography>
            <Typography paragraph>
              This About page will document all of the new data and features present in the Molecular Targets Platform. 
              For detailed descriptions and tutorials of the built-in functions of the Open Targets Platform, please see their{' '}
              <Link to="https://platform-docs.opentargets.org/" external> 
                documentation<ExternalLinkIcon />
              </Link>{' '}
              or their{' '}
              <Link to="https://platform-docs.opentargets.org/citation" external> 
                 most recent publication<ExternalLinkIcon />
              </Link>.
            </Typography>

            <Typography paragraph className={classes.space}>
              The Open Targets Platform undergoes regular updates to add new data and functionalities, which are integrated into the Molecular 
              Targets Platform as soon as possible.
            </Typography>
            
          
            <hr className={classes.containerDiverHr}/>

          </Grid>

        </Grid>

        {/* Pediatric Cancer Disease */}
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
            <Typography variant="h4" component="h1" align="center" className={classNames(classes.title, classes.boxTitle)}>
              Pediatric Cancer Disease
            </Typography>
            <Typography paragraph>
              Pediatric cancers are rare and heterogeneous, and have a different biology even from adult
              cancers of the same name. Due to the complexity and rarity, there was no international
              standard of classification until the end of 2021 when WHO updated their standards to
              include a distinct section for pediatric tumors. Considering the challenges and historical
              lack of standards, disease assignment and molecular subtyping is a challenging process.
              For Open Targets, classifying pediatric tumors starts with the pathologist’s report from
              original diagnosis followed by confirmation of the molecular features of the disease using
              the repository data. The specific molecular features examined for each disease were
              determined by the literature with expert review and curation from both bioinformaticians
              and clinicians. A final disease label is assigned based on the combination of the clinical
              pathology report and the molecular features in the data. If there is a discrepancy between
              clinical and molecular labels, samples are reviewed by a pathologist and final disease
              assignment is made in consultation with pathology, bioinformatics, and clinicians. For
              each disease, a non-exhaustive list of synonyms as well as the specific Experimental
              Factor Ontology (EFO) label used can be found on the individual page for each disease. For
              more details on disease assignment see {' '}
              <Link external to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/tree/dev/analyses/molecular-subtyping-pathology">
                OpenPedCan Molecular Subtyping and Pathology Documentation
                <ExternalLinkIcon />
              </Link>.
              For a summary table of the number of subjects included,{' '}
              <Link external to="https://github.com/PediatricOpenTargets/documentation/blob/main/disease_subject_counts.tsv">
                a table is available for viewing and download
                <ExternalLinkIcon />
              </Link>.
            </Typography>

            <div className={classes.space90}></div>
          </Grid>
        </Grid>
        
        {/* Pediatric Cancer Data Sources */}
        <Grid container justify="center" className={classes.datasetContainer}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
            <Typography variant="h4" component="h1" align="center" className={classNames(classes.title, classes.boxTitle)}>
              Pediatric Cancer Data Sources
            </Typography>

            {/* FDA Pediatric Molecular Target Lists (FDA PMTL) */}
            {listHeader("FDA Pediatric Molecular Target Lists %acronym", "FDA PMTL", "fdaPmtlDS")}
            {showHide.fdaPmtlDS && fdaPmtlDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Open Pediatric Cancer (OpenPedCan) */}
            {listHeader("Open Pediatric Cancer %acronym", "OpenPedCan", "openPedCanDS")}
            {showHide.openPedCanDS && openPedCanDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Therapeutically Applicable Research to Generate Effective Treatments (TARGET) */}
            {listHeader("Therapeutically Applicable Research to Generate Effective Treatments %acronym", "TARGET", "targetDS")}
            {showHide.targetDS && targetDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Gabriella Miller Kids First Neuroblastoma (Kids First) */}
            {listHeader("Gabriella Miller Kids First Neuroblastoma %acronym", "Kids First", "kidsFirstDS")}
            {showHide.kidsFirstDS && kidsFirstDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Open Pediatric Brain Tumor Atlas (OpenPBTA) */}
            {listHeader("Open Pediatric Brain Tumor Atlas %acronym","OpenPBTA", "openPbtaDS")}
            {showHide.openPbtaDS && openPbtaDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Oncology Knowledge Base (OncoKB) Cancer Gene List */}
            {listHeader("Oncology Knowledge Base %acronym Cancer Gene List", "OncoKB", "oncokbDS")}
            {showHide.oncokbDS && oncokbDataSource()}
            <hr className={classes.listDiverHr} />

            {/* Genotype-Tissue Expression */}
            {listHeader("Genotype-Tissue Expression %acronym", "GTEx", "gtexDS")}
            {showHide.gtexDS && gtexDataSource()}
            <hr className={classes.listDiverHr} />

            <div className={classes.space90}></div>

          </Grid>
        </Grid>

        {/* Pediatric Cancer Data Processing */}
        <Grid container justify="center" className={classes.datasetContainer}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
            <Typography variant="h4" component="h1" align="center" className={classNames(classes.title, classes.boxTitle)}>
              Pediatric Cancer Data Processing
            </Typography>
            <Typography paragraph>
              Open Pediatric Cancer (OpenPedCan) project at the Children’s Hospital of Philadelphia,
              in partnership with the National Cancer Institute, is combining and harmonizing pediatric
              cancer datasets to accelerate pediatric cancer target identification and drug development.
              To read more about the OpenPedCan data processing methods, view the{' '}
              <Link to="https://github.com/PediatricOpenTargets/documentation" external>
                documentation<ExternalLinkIcon />
              </Link>.
            </Typography>

            <div className={classes.space90}></div>

          </Grid>
        </Grid>

        {/* Pediatric Cancer Data Visualizations */}
        <Grid container justify="center" className={classes.datasetContainer}>
          <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
            <Typography variant="h4" component="h1" align="center" className={classNames(classes.title, classes.boxTitle)}>
              Pediatric Cancer Data Visualizations
            </Typography>

            {/* Pediatric Cancer Data Navigation */}
            {listHeader("Pediatric Cancer Data Navigation", "", "pedCanDataNavDV")}
            {showHide.pedCanDataNavDV && pedCanDataNavDataVisualizations()}
            <hr className={classes.listDiverHr} />

            {/* FDA Pediatric Molecular Target Lists (FDA PMTL) */}
            {listHeader("FDA Pediatric Molecular Target Lists %acronym","FDA PMTL", "fdaPmtlDV")}
            {showHide.fdaPmtlDV && fdaPmtlDataVisualizations()}
            <hr className={classes.listDiverHr} />

            {/* OpenPedCan Somatic Alterations (SA)*/}
            {listHeader("OpenPedCan Somatic Alterations", "", "somaticAlterationsDV")}
            {showHide.somaticAlterationsDV && saDataVisualizations()}
            <hr className={classes.listDiverHr} />

            {/* OpenPedCan Gene Expression (GX)*/}
            {listHeader("OpenPedCan Gene Expression", "", "geneExpressionDV")}
            {showHide.geneExpressionDV && geneExDataVisualizations()}
            <hr className={classes.listDiverHr} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <NCIFooter/>
    </>
  );
};

export default AboutView;

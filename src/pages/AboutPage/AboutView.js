import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { Helmet } from 'react-helmet';

import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import Link from '../../components/Link';
import {
  appDescription,
  appCanonicalUrl,
} from '../../constants';

import RelevantIcon from '../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../components/RMTL/NonRelevantIcon';
import UnspecifiedIcon from '../../components/RMTL/UnspecifiedIcon';

import externalIcon from '../../assets/about/About-ExternalLink.svg';
import Infographic from '../../assets/about/Infographic.png'

const useStyles = makeStyles(theme => ({

  molecularTargetC: {
    margin: '171px 0 0 0',
    padding: '48px 0 56px 0',
    backgroundColor: '#CDE9FF',
    fontSize: '16px'
  },
  changeLogContainer: {
    padding: '58px 0 68px 0',
    marginBottom: '68px',
    backgroundColor: '#EDF1F4',
    color: '#000000',
    fontSize: '16px'
  },
  container: {
    margin: '58px 0 56px 0',
    fontSize: '16px'
  },
  centerText: {
    textAlign: 'center'
  },
  title: {
    marginBottom: '30px',
    color: '#5C605E',
    fontFamily: 'Inter',
    fontSize: '34px',
    fontWeight: '600',
    lineHeight: '24.96px'

  },
  infographicContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  infographicContent: {
    flex: 1,
    paddingLeft: '20px'
  },

  externalIcon: {
    width: '20px',
    margin: '0 0 0 2px',
    verticalAlign: 'sub'
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
    padding: '10px 25px 20px 18px',
    font: 'Inter Regular',
    fontSize: '16px',
    lineHeight: '25px',
    color: '#5C605E',
    borderRadius: '10px'
  },
  playArrowIcon: {
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
  projectTitle: {
    color: '#2188D8'
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

      fdaPmtlDV: true,
      somaticMutationsDV: false,
      geneExpressionDV: false

    }
  )

  const showHideContent = (id) => {
    const newResult = !showHide[id]
    setShowHide({...showHide, [id]:newResult})
  }

  const listHeader = (header, id) => {
    return (
      <div className={classes.listHeaderDiv} onClick={()=> showHideContent(id)}>
        <div className={classes.playArrowIcon}><PlayArrowIcon /></div>
        <div><Typography variant="h6" component="h1"> {header} </Typography></div> 
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
          in order tobetter inform decisions and improve treatments for childhood cancers. To read more about the implementation 
          of the FDA PMTL within the Molecular Targets Platform, read our detailed 
          <Link to="/fda-pmtl-docs">{' '} 
            FDA PMTL Documentation.
          </Link>
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target" external>{' '} 
            FDA Pediatric Molecular Target List
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
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
            OpenPedCan (v10)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Mutations; OpenPedCan Gene Expression
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
          analyses include the seven diseases present in the TARGET dataset: Acute Lymphoblastic Leukemia (ALL), Acute Myeloid Leukemia (AML), 
          Clear cell sarcoma of the kidney, Neuroblastoma, Osteosarcoma, Rhabdoid tumor, and Wilm’s Tumor.
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>{' '} 
            TARGET (v23)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Mutations; OpenPedCan Gene Expression
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
            Kids First Neuroblastoma
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Mutations; OpenPedCan Gene Expression
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
            Alex’s Lemonade Stand Foundation Childhood Cancer Data Lab 
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />{' '}
          </Link>
          and the
          <Link to="https://d3b.center/" external>{' '} 
            Center for Data-Driven Discovery at the Children’s Hospital of Philadelphia 
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />{', '}
          </Link> 
          which genomically characterized pediatric brain tumor data from the 
          <Link to="https://cbtn.org/" external>{' '} 
            Children’s Brain Tumor Network (CBTN)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />{', '}
          </Link> 
          and the 
          <Link to="https://pnoc.us/" external>{' '} 
            Pacific Pediatric Neuro-oncology Consortium (PNOC)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />{'. '}
          </Link> 
          The Molecular Targets Platform includes OpenPBTA data from over 1,000 tumors spanning more than 30 histologies.
        </p>
        <p>
          SOURCE: 
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '} 
            OpenPBTA for the CBTN (v21)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link><br/> 
          Where this data is used in the MTP: OpenPedCan Somatic Mutations; OpenPedCan Gene Expression
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
          includes the OncoKB list annotations as a field within the OpenPedCan Somatic Mutations displays.
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
            OncoKB (v3.5)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>{', '}
          <Link to="https://ascopubs.org/doi/full/10.1200/PO.17.00011" external>{' '} 
            Chakravarty et al., JCO PO 2017
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link><br />
          Where this data is used in the MTP: OpenPedCan Somatic Mutations
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
                <li>Within the OpenPedCan Somatic Mutations display</li>
              </ul>
            </li>
          </ul>	
        </p>
        <p>
          SOURCE: 
          <Link to="https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target" external>{' '} 
            FDA Publications of Pediatric Molecular Target Lists
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>
          
        </p>
      </div>
    )
  }

  const smDataVisualizations =() => {
    return (
      <div className={classes.listContent}>
        <p>
          The OpenPedCan Somatic Mutations display aggregates data from harmonized analyses across several pediatric cancer datasets 
          performed within the OpenPedCan project. The primary goal of this display is to show the frequency of targets in both primary 
          and relapse pediatric tumors, where available. The display is organized into five tabs, each representing a different type of data:
            <ul>
              <li><b>SNV by Gene</b>: Frequency of <b>S</b>ingle <b>N</b>ucleotide <b>V</b>ariants aggregated by gene</li>
              <li><b>SNV by Variant</b>: Frequecy of specific <b>S</b>ingle <b>N</b>ucleotide <b>V</b>ariants</li>
              <li><b>CNV by Gene</b>: Frequency of specific <b>C</b>opy <b>N</b>umber <b>V</b>ariants</li>
              <li><b>Fusion by Gene</b>: Frequency of gene fusions aggregated by gene</li>
              <li><b>Fusion</b>: Frequency of specific gene fusions</li>
            </ul> 
            
          The OpenPedCan Somatic Mutations display is accessible within the Molecular Target Platform on both the Target and Evidence pages. 
          The data driving each display is identical; however, the Target page display will show frequencies of the Target across all pediatric cancers, 
          while the Evidence page display is filtered to only show frequencies of the Target in a specific Disease.

          The data within the OpenPedCan Somatic Mutations display is derived from several source datasets, also known as cohorts. 
          A frequency is calculated and displayed for each dataset. Some Target-Disease combinations are present in more than one dataset; 
          these also have a frequency calculation across all datasets and are designated as 'All Cohorts'.
        </p>
        <p>
          SOURCE: 
          <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external> {' '}
            OpenPedCan (v10)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>{', '}
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>
            TARGET (v23)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>{', '}
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external> 
            Kids First Neuroblastoma
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>{', '}
          <Link to="https://github.com/AlexsLemonade/OpenPBTA-analysis/" external>
            OpenPBTA for CBTN and PNOC (v21) analysis
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>, and 
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '}
            manuscript
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>{', '}
          <Link to="https://www.oncokb.org/news#07162021" external> 
            OncoKB (v3.5)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>
        </p>
      </div>
    )
  }
  
  const geneExDataVisualizations = () => {
    return (
      <div className={classes.listContent}>
        <p>
          OpenPedCan Gene ExpressionThe OpenPedCan Gene Expression plots visualize mRNA expression of Targets within pediatric cancers. 
          The expression is measured in Transcript Per Million (TPM) and is viewable with either a linear or log<span className={classes.log10}>10</span> scale. 
          The OpenPedCan Gene Expression plots are accessible on both the Target and Evidence pages, 
          though the views differ:
          <ul>
            <li><b>Target Page</b>: expression of specific Target across all pediatric cancers</li>
            <li><b>Evidence Page</b>: expression of specific Target in singlepediatric cancer alongside expression of the sameTarget across normal adult GTEx tissue</li>
          </ul> <br />

          The data within the OpenPedCan Gene Expression plots is derived from several source datasets. A single frequency boxfor each canceris 
          calculated and displayed foreach dataset. Some cancers are present in more than one dataset; these also have a frequency box calculated 
          across all datasets and designated as “All Cohorts”. 
        </p>
        <p>
          SOURCE: 
          <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis" external>{' '} 
          OpenPedCan (v10)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>, 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8" external>{' '} 
          TARGET (v23)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>, 
          <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1" external>{' '} 
          Kids First Neuroblastoma
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>,
          <Link to="https://github.com/AlexsLemonade/OpenPBTA-analysis/" external>{' '} 
          OpenPBTA for CBTN and PNOC (v21) analysis
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>, and
          <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>{' '} 
          manuscript
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
          </Link>,
          <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
            OncoKB (v3.5)
            <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
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

    <NCIHeader/>

    {/* The Molecular Targets Platform */}
    <Grid container justify="center" className={classes.molecularTargetC}>
      <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>

        <Typography variant="h4" component="h1" align="center" paragraph className={classes.title}>
          The Molecular Targets Platform
        </Typography>

        <Typography paragraph>
          The Molecular Targets Platform is a National Cancer Institute (NCI) instance of the 
          <Link to="https://platform.opentargets.org/" external>{' '} 
            Open Target Platform<img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link>
          with a focus on pediatric cancerdata. This tool allows users to browse and identify associations between molecular targets, diseases, and drugs. 
          The Molecular Targets Platform builds uponthe data and functionality of the Open Targets Platform while also including: 
        </Typography>
        
        <ul>
          <li>The FDA Pediatric Molecular Target Lists (FDA PMTL)</li>
          <li>
          Analysesof pediatric oncology datasets from the Open Pediatric Cancer (OpenPedCan) project at the
          Children's Hospital of Philadelphia:
            <ul>
              <li>Therapeutically Applicable Research to Generate Effective Treatments (TARGET)</li>
              <li>Open Pediatric Brain Tumor Atlas (OpenPBTA) </li>
              <li>Gabriella Miller Kids First (Kids First) Neuroblastoma(Kids First)</li>
            </ul>
          </li>
        </ul>

        <Typography paragraph>
          As the project matures, new pediatric cancer data and additional functionality will be added to the Molecular Targets Platform.
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
            Open Target Platform<img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link>
          is the open-source infrastructure upon which the Molecular Targets Platform is built. 

        </Typography>
        
        <Grid item container direction="row" alignItems="center" className={classes.infographicContainer}>
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


        {/*
        <div style={{display: 'flex', 'flexWrap': 'wrap', border: '1px solid #2188D8'}}>
          <div style={{ }}>
            <div><img src={Infographic} alt="info"/></div>
          </div>

          <div style={{flex: 1, borderLeft: '1px solid #2188D8' }}>
            <Grid item style={{'paddingLeft': '20px'}}>
              <Typography paragraph>
                The Open Targets Platform is a comprehensive tool that supports systematic identification and prioritisation of 
                potential therapeutic drug targets. By integrating publicly available datasets including data generated by the Open Targets consortium, 
                the Platform builds and scores target-disease associations to assist in drug target identification and prioritisation. 
                It also integrates relevant annotation information about targets, diseases, phenotypes, and drugs, as well as their most relevant relationships.
              </Typography>
            </Grid>
          </div>
        </div>*/}
        
        <Typography paragraph>
          The Open Targets Platform is not an NCI program; their site is not affiliated withthe NCI or any other US government agency. 
          However, the Open Targets Platform is an open-source product, meaning that the data and code are shared freely with other 
          organizations for development.The NCI has added pediatric cancer data and additional functionality into a separate instance 
          of the Open Targets Platform under NCI control –the Molecular Targets Platform.
        </Typography>
        <Typography paragraph>
          This About page will document all of the new data and features present in the Molecular Targets Platform. 
          For detailed descriptions and tutorialsof the built-in functions of the Open Targets Platform, please see their 
          <Link to="https://platform-docs.opentargets.org/" external>{' '} 
            documentation<img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
          </Link> 
          or their most recent publication: 
        </Typography>
        <Typography paragraph style={{"marginLeft": '50px'}}>

              Ochoa, D. et al. (2021). 
              <Link to="https://academic.oup.com/nar/article/49/D1/D1302/5983621" external>{' '} 
                Open Targets Platform: supporting systematic drug–target identification and prioritisation. 
                <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} /> {' '}
              </Link>
              Nucleic Acids Research.
        </Typography>

        <Typography paragraph className={classes.space}>
          The Open Targets Platform undergoes regular updates to add new data and functionalities, which are integratedinto the Molecular 
          Targets Platform as soon as possible.
        </Typography>
        
      
        <hr className={classes.containerDiverHr}/>

      </Grid>

    </Grid>

    {/* Pediatric Cancer Data Sources */}
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
        <Typography variant="h4" component="h1" align="center" style={{'marginBottom': '34px'}} className={classes.title}>
          Pediatric Cancer Data Sources
        </Typography>

        {/* FDA Pediatric Molecular Targets Lists (FDA PMTL) */}
        {listHeader("FDA Pediatric Molecular Targets Lists (FDA PMTL)", "fdaPmtlDS")}
        {showHide.fdaPmtlDS && fdaPmtlDataSource()}
        <hr className={classes.listDiverHr} />

        {/* Open Pediatric Cancer (OpenPedCan) */}
        {listHeader("Open Pediatric Cancer (OpenPedCan)", "openPedCanDS")}
        {showHide.openPedCanDS && openPedCanDataSource()}
        <hr className={classes.listDiverHr} />

        {/* Therapeutically Applicable Research to Generate Effective Treatments (TARGET) */}
        {listHeader("Therapeutically Applicable Research to Generate Effective Treatments (TARGET)", "targetDS")}
        {showHide.targetDS && targetDataSource()}
        <hr className={classes.listDiverHr} />

        {/* Gabriella Miller Kids First Neuroblastoma (Kids First) */}
        {listHeader("Gabriella Miller Kids First Neuroblastoma (Kids First)", "kidsFirstDS")}
        {showHide.kidsFirstDS && kidsFirstDataSource()}
        <hr className={classes.listDiverHr} />

        {/* Open Pediatric Brain Tumor Atlas (OpenPBTA) */}
        {listHeader("Open Pediatric Brain Tumor Atlas (OpenPBTA)", "openPbtaDS")}
        {showHide.openPbtaDS && openPbtaDataSource()}
        <hr className={classes.listDiverHr} />

        {/* Oncology Knowledge Base (OncoKB) Cancer Gene List */}
        {listHeader("Oncology Knowledge Base (OncoKB) Cancer Gene List", "oncokbDS")}
        {showHide.oncokbDS && oncokbDataSource()}
        <hr className={classes.listDiverHr} />
        
        <div className={classes.space}></div>
        <hr className={classes.containerDiverHr}/>
      </Grid>
    </Grid>

    {/* Pediatric Cancer Data Sources */}
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>
        <Typography variant="h4" component="h1" align="center" style={{'marginBottom': '34px'}} className={classes.title}>
          Pediatric Cancer Data Visualizations
        </Typography>

        {/* FDA Pediatric Molecular Targets Lists (FDA PMTL) */}
        {listHeader("FDA Pediatric Molecular Targets Lists (FDA PMTL)", "fdaPmtlDV")}
        {showHide.fdaPmtlDV && fdaPmtlDataVisualizations()}
        <hr className={classes.listDiverHr} />

        {/* OpenPedCan Somatic Mutations (SM)*/}
        {listHeader("OpenPedCan Somatic Mutations", "somaticMutationsDV")}
        {showHide.somaticMutationsDV && smDataVisualizations()}
        <hr className={classes.listDiverHr} />

        {/* OpenPedCan Gene Expression (GX)*/}
        {listHeader("OpenPedCan Gene Expression", "geneExpressionDV")}
        {showHide.geneExpressionDV && geneExDataVisualizations()}
        <hr className={classes.listDiverHr} />
        
      </Grid>
    </Grid>

    {/* Change Log */}
    <Grid container justify="center" className={[classes.container,classes.changeLogContainer]}>
      <Grid item xs={10} md={8} lg={7} xl={6} className={classes.introContainer}>

        <Typography variant="h4" component="h1" align="center" paragraph className={classes.title}>
          Change Log
        </Typography>

        <Typography paragraph>
          The Molecular Target Platform integrates many different sources of data and analyses, all of which are updated 
          at varying intervals. In order to comprehensively track changes, the various changelogs are aggregated here.
        </Typography>
        
        <Grid item style={{padding:'20px 40px 0px 40px'}}>
          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
              
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Open Targets Platform
                </Typography>

                <b>Version in use</b>: 21.06 (Released 2021-06-30) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://platform-docs.opentargets.org/change-log" external>{' '} 
                  Open Target Platform <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
                </Link>
              
              </div>
              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The Open Targets Platform version represents the built-in data and functions of the Molecular Targets Platform. 
                This includes all data, displays, and site behavior not otherwise defined in this About page.
              </div>
            
            </div>
          </Paper>

          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
            
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Molecular Targets Platform Frontend
                </Typography>
                <b>Version in use</b>: 1.0.0-alpha <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://github.com/CBIIT/ppdc-otp-frontend/releases/tag/v1.0.0-alpha" external>{' '} 
                  MTP Frontend Release <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
                </Link>
              </div>

              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The Molecular Targets Platform Frontend contains all of the visual and user-focused components of the site.
              </div>
            </div>
          </Paper>

          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
            
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  Molecular Targets Platform Backend
                </Typography>
                <b>Version in use</b>: v1.0.0-alpha (Released 2021-11-01) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://github.com/CBIIT/ppdc-otp-backend/releases/tag/v1.0.0-alpha" external>{' '} 
                  MTP Backend Release <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
                </Link>
              </div>

              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The Molecular Targets Platform Backend contains all of the database and infrastructure components of the site. 
              </div>
            </div>
          </Paper>

          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
            
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  OpenPedCan Analyses
                </Typography>
                <b>Version in use</b>: v10 (Released 2021-10-12) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://github.com/PediatricOpenTargets/OpenPedCan-analysis/blob/4fb04fe60754b90da3c241dbb8b727c3722487cc/doc/release-notes.md" external>{' '} 
                  OpenPedCan Analysis Release <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
                </Link>
              </div>

              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The OpenPedCan version represents new analysis results used in the OpenPedCan Somatic Mutations and Gene Expression displays.
              </div>
            </div>
          </Paper>

          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
            
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  OncoKB Cancer Gene List
                </Typography>
                <b>Version in use</b>: v3.5 (Released 2021-07-16) <br />
                <b>Detailed Change Log</b>: 
                <Link to="https://www.oncokb.org/news#07162021" external>{' '} 
                  OncoKB Release <img src={externalIcon} alt="outbounnd web site icon" className={classes.externalIcon} />
                </Link>
              </div>

              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The OncoKB Cancer Gene List version represents the genes identified as OncoKB oncogenes or tumor suppressor genes within the OpenPedCan Somatic Mutations display.
              </div>
            </div>
          </Paper>

          <Paper style={{marginBottom: '8px'}}>
            <div style={{display: 'flex', border: '1px solid #2188D8'}}>
            
              <div style={{flex: 1, padding: '12px 17px 17px 14px' }}>
                <Typography variant="h6" component="h1" paragraph className={classes.projectTitle}>
                  FDA Pediatric Molecular Target Lists
                </Typography>
                <b>Version in use</b>: v1.1 (Released 2021-09-09) <br />
                <b>Detailed Change Log</b>: 
                <Link to="/fda-pmtl-docs">{' '}
                  FDA PMTL Documentation
                </Link>
              </div>

              <div style={{flex: 1, padding: '12px 17px 17px 14px', borderLeft: '1px solid #2188D8' }}>
                The FDA PMTL version represents the computable interpretation of the lists as used within the Molecular Targets Platform. 
                When the FDA publishes new lists, new computable interpretations will be updated here.
              </div>
            </div>
          </Paper>

        </Grid>
      </Grid>
    </Grid>

    <NCIFooter/>
    </>
  );
};

export default AboutView;
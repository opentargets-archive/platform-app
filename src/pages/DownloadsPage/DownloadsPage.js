import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Info } from '@material-ui/icons';
import {
  faBox,
  faDna,
  faFile,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'ot-ui';

import BasePage from '../../components/BasePage';
import releases from './releases';

const useStyles = makeStyles(theme => ({
  accordionSummary: {
    alignItems: 'center',
    margin: 0,
  },
  artifact: {
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[100],
    display: 'inline-flex',
    listStyle: 'none',
    margin: '.5rem',
  },
  artifactTitle: {
    color: theme.palette.grey[700],
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  artifactCardHeader: {
    padding: '.25rem',
    backgroundColor: theme.palette.grey[100],
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    marginRight: '1rem',
  },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  file: {
    alignItems: 'center',
    color: theme.palette.grey[800],
    display: 'flex',
    flexDirection: 'column',
    width: '8rem',
  },
  fileName: {
    fontSize: '.85rem',
    fontWeight: 'bold',
  },
  note: {
    marginBottom: '2rem',
  },
  noteContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  noteIcon: {
    fontSize: '3rem',
    marginRight: '1rem',
  },
  title: {
    color: theme.palette.grey[700],
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  titleIcon: {
    color: 'white',
  },
}));

const mapFile = url => {
  let format = '';
  const fileNameParts = url.split('.');

  if (fileNameParts[fileNameParts.length - 1].toLowerCase() === 'gz') {
    fileNameParts.pop();
    format = 'GZipped';
  }

  return [format, fileNameParts.pop().toUpperCase()].join(' ');
};

const mapIcon = artifact =>
  ({
    'Target list': <FontAwesomeIcon icon={faDna} />,
    'Disease list': <FontAwesomeIcon icon={faStethoscope} />,
  }[artifact.name] ||
  (artifact.shortName || artifact.name.slice(0, 2).toUpperCase()));

function DownloadsPage() {
  const classes = useStyles();

  return (
    <BasePage>
      <Grid container>
        <Grid item>
          <Typography variant="h5" component="h1" paragraph>
            Data Download
          </Typography>
          <Typography paragraph>
            All data from targetvalidation.org is available for download as
            compressed JSON files.
          </Typography>
          <Typography paragraph>
            We provide downloads of all associations between targets and
            diseases calculated by the platform, as well as all the evidence
            used in calculating each association. These are the same objects
            returned by the corresponding <code>/public/associations</code> and{' '}
            <code>/public/evidence</code> API methods. See the{' '}
            <Link
              external
              to="https://docs.targetvalidation.org/tutorials/rest-api"
            >
              API documentation
            </Link>{' '}
            for further details.
          </Typography>

          <Grid item container md={12} lg={8} xl={6} className={classes.note}>
            <Card variant="outlined">
              <CardContent>
                <Box className={classes.noteContainer}>
                  <Info className={classes.noteIcon} />
                  <Typography>
                    The files below are useful only if you want to analyze the
                    data. They are not a database dump and cannot be easily used
                    to replicate the platform locally/somewhere else.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {releases.map((release, index) => (
            <Accordion
              key={release.version}
              defaultExpanded={index === 0}
              variant="outlined"
            >
              <AccordionSummary
                classes={{ content: classes.accordionSummary }}
                expandIcon={<ExpandMore />}
              >
                <Avatar className={classes.avatar}>
                  <FontAwesomeIcon icon={faBox} className={classes.titleIcon} />
                </Avatar>
                <Typography className={classes.title}>
                  {release.date}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.cardContent}>
                <Grid container spacing={2}>
                  {release.artifacts.map(artifact => (
                    <Grid key={artifact.name} item xs={12} sm={6} lg={4} xl={2}>
                      <Card variant="outlined">
                        <CardHeader
                          className={classes.artifactCardHeader}
                          avatar={
                            <Avatar className={classes.avatar}>
                              {mapIcon(artifact)}
                            </Avatar>
                          }
                          title={artifact.name}
                          titleTypographyProps={{
                            className: classes.artifactTitle,
                          }}
                        />
                        <CardContent className={classes.cardContent}>
                          {artifact.files.map((file, index) => (
                            <Link
                              external
                              key={index}
                              className={classes.file}
                              to={file.url}
                            >
                              <FontAwesomeIcon icon={faFile} size="4x" />
                              <Typography className={classes.fileName}>
                                {mapFile(file.url)}
                              </Typography>
                              <Typography variant="subtitle2">
                                {file.size}
                              </Typography>
                            </Link>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </BasePage>
  );
}

export default DownloadsPage;

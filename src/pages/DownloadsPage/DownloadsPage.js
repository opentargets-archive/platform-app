import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { faBox, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'ot-ui';

import BasePage from '../../components/BasePage';
import releases from './releases';
import { useState } from 'react';
import { mapFile, mapIcon } from './utils';

const useStyles = makeStyles(theme => ({
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
  cardHeader: {
    alignItems: 'center',
    margin: 0,
  },
  importantArtifactContainer: {
    display: 'flex',
    margin: 0,
  },
  importantArtifactFile: {
    alignItems: 'center',
    color: theme.palette.grey[800],
    display: 'flex',
    flexDirection: 'column',
    width: '8rem',
  },
  importantArtifactTitle: {
    color: theme.palette.grey[700],
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  importantArtifactCardHeader: {
    padding: '.25rem',
    backgroundColor: theme.palette.grey[100],
  },
  fileLink: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '.5rem',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      margin: 0,
    },
  },
  fileList: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      margin: 0,
    },
  },
  fileName: {
    fontSize: '.85rem',
    fontWeight: '500',
    marginRight: '.25rem',
  },
  fileSize: {
    fontSize: '.66rem',
    fontWeight: '300',
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
  tableContainer: {
    marginTop: '.5rem',
  },
  tableFilesRow: {
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[300],
  },
  tableRowRoot: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.grey[100],
    },
    '& td': {
      border: 'none',
    },
  },
  title: {
    color: theme.palette.grey[700],
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  titleIcon: {
    color: 'white',
  },
  versionSelect: {
    alignItems: 'baseline',
    display: 'flex',
    marginTop: '2rem',
  },
  versionSelectCaption: {
    marginRight: '.5rem',
  },
}));

releases[0].date = `${releases[0].date} (latest)`;

function DownloadsPage() {
  const classes = useStyles();
  const [shownRelease, setShownRelease] = useState(0);
  const release = releases[shownRelease];

  const handleShownReleaseChange = e => {
    setShownRelease(e.target.value);
  };

  const moreDownloads = release.artifacts.filter(
    artifact => !artifact.important
  );

  return (
    <BasePage>
      <Typography variant="h4" component="h1" paragraph>
        Data Download
      </Typography>
      <Typography paragraph>
        All data from targetvalidation.org is available for download.
      </Typography>
      <Typography paragraph>
        We provide downloads of all associations between targets and diseases
        calculated by the platform, as well as all the evidence used in
        calculating each association. These are the same objects returned by the
        corresponding <code>/public/associations</code> and{' '}
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
                The files below are useful only if you want to analyze the data.
                They are not a database dump and cannot be easily used to
                replicate the platform locally/somewhere else.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Typography variant="h5" component="h1" paragraph>
        Programmatic access
      </Typography>
      <Typography paragraph>
        Information about programmatic access to the data will be available
        soon.
      </Typography>

      <Typography variant="h5" component="h1" paragraph>
        Direct downloads
      </Typography>

      <Card elevation={0}>
        <CardHeader
          classes={{ content: classes.cardHeader }}
          avatar={
            <Avatar className={classes.avatar}>
              <FontAwesomeIcon icon={faBox} className={classes.titleIcon} />
            </Avatar>
          }
          title={
            <Typography className={classes.title}>{release.date}</Typography>
          }
        />

        <CardContent className={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid
              item
              container
              xs={12}
              lg={4}
              xl={6}
              className={classes.importantArtifactContainer}
              spacing={2}
            >
              {release.artifacts
                .filter(artifact => artifact.important)
                .map(artifact => (
                  <Grid key={artifact.name} item xs={12} sm={6} lg={12} xl={4}>
                    <Card variant="outlined">
                      <CardHeader
                        className={classes.importantArtifactCardHeader}
                        avatar={
                          <Avatar className={classes.avatar}>
                            {mapIcon(artifact.name)}
                          </Avatar>
                        }
                        title={artifact.name}
                        titleTypographyProps={{
                          className: classes.importantArtifactTitle,
                        }}
                      />
                      <CardContent className={classes.cardContent}>
                        {artifact.files.map((file, index) => (
                          <Link
                            external
                            key={index}
                            className={classes.importantArtifactFile}
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

            {moreDownloads.length > 0 && (
              <Grid item xs={12} lg={8} xl={6}>
                <Typography variant="h6">
                  More resources for download
                </Typography>
                <Table size="small" className={classes.tableContainer}>
                  <TableHead>
                    <TableRow className={classes.tableHeader}>
                      <TableCell>Artifact</TableCell>
                      <TableCell className={classes.tableFilesRow}>
                        Files
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {moreDownloads
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(artifact => (
                        <TableRow
                          key={artifact.name}
                          classes={{ root: classes.tableRowRoot }}
                        >
                          <TableCell>
                            {mapIcon(artifact.name)} {artifact.name}
                          </TableCell>
                          <TableCell>
                            <Box className={classes.fileList}>
                              {artifact.files.map((file, index) => (
                                <Link
                                  external
                                  className={classes.fileLink}
                                  key={index}
                                  to={file.url}
                                >
                                  <Typography className={classes.fileName}>
                                    {mapFile(file.url)}
                                  </Typography>
                                  <Typography className={classes.fileSize}>
                                    ({file.size})
                                  </Typography>
                                </Link>
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Box className={classes.versionSelect}>
        <Typography className={classes.versionSelectCaption}>
          Select a different release:
        </Typography>

        <Select value={shownRelease} onChange={handleShownReleaseChange}>
          {releases.map((release, index) => (
            <MenuItem key={index} value={index}>
              {release.date}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </BasePage>
  );
}

export default DownloadsPage;

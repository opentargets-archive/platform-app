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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
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
  fileLink: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '.5rem',
  },
  fileList: {
    display: 'flex',
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
      <Typography paragraph>todo</Typography>

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
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell>Artifact</TableCell>
                  <TableCell>Files</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {release.artifacts
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(artifact => (
                    <TableRow
                      key={artifact.name}
                      classes={{ root: classes.tableRowRoot }}
                    >
                      <TableCell>
                        {mapIcon(artifact.name)}
                        {artifact.name}
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
          </TableContainer>
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

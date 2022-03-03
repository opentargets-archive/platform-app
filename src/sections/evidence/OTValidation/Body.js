import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import { dataTypesMap } from '../../../dataTypes';
import Summary from './Summary';
import Description from './Description';
import Tooltip from '../../../components/Tooltip';
import ChipList from '../../../components/ChipList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Box, makeStyles, Typography, Chip, Grid } from '@material-ui/core';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';
import classNames from 'classnames';
import _ from 'lodash';

const VALIDATION_QUERY = loader('./OTValidationQuery.gql');

const useStyles = makeStyles(theme => {
  return {
    primaryColor: {
      color: theme.palette.primary.main,
    },
    grey: {
      color: theme.palette.grey[300],
    },
    circleUp: {
      marginRight: '10px',
    },
    hypotesisBox: {
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    hypotesisLegend: {
      marginBottom: '1rem',
    },
    bold: {
      fontWeight: 700,
    },
    // hypothesis status classes
    hsLegendChip: {
      width: '32px',
    },
    hsGreen: {
      backgroundColor: '#407253',
      border: `1px solid ${theme.palette.grey[600]}`,
    },
    hsRed: {
      backgroundColor: '#9e1316',
      border: `1px solid ${theme.palette.grey[600]}`,
    },
    hsWhite: {
      backgroundColor: '#ffffff',
      color: theme.palette.grey[600],
      border: `1px solid ${theme.palette.grey[600]}`,
    },
    hsGrey: {
      backgroundColor: theme.palette.grey[500],
      border: `1px solid ${theme.palette.grey[600]}`,
    },
  };
});

const isHit = (conf, validatedConf) => {
  if (conf && validatedConf) {
    return conf.toLowerCase() === validatedConf.toLowerCase();
  }
  return conf.toLowerCase() === 'significant';
};

const HitIcon = ({ isHit, classes }) => (
  <FontAwesomeIcon
    icon={isHit ? faCheckCircle : faTimesCircle}
    size="2x"
    className={isHit ? classes.primaryColor : classes.grey}
  />
);

// Map response hypotheses status to style and labels
const hypothesesStatus = [
  {
    status: 'expected but not observed',
    expected: true,
    observed: false,
    styles: 'hsGrey',
  },
  {
    status: 'observed and expected',
    expected: true,
    observed: true,
    styles: 'hsGreen',
  },
  {
    status: 'not expected and not observed',
    expected: false,
    observed: false,
    styles: 'hsWhite',
  },
  {
    status: 'observed but not expected',
    expected: false,
    observed: true,
    styles: 'hsRed',
  },
];

const getColumns = classes => [
  {
    id: 'disease',
    label: 'Reported disease',
    renderCell: row => (
      <Link to={`/disease/${row.disease.id}`}>{row.disease.name}</Link>
    ),
    filterValue: row => row.diseaseLabel + ', ' + row.diseaseId,
  },
  {
    id: 'projectDescription',
    label: 'OTAR primary project',
    renderCell: row => (
      <Link to={`http://home.opentargets.org/${row.projectId}`} external>
        {row.projectDescription}
        <Typography variant="caption" display="block">
          {row.projectId}
        </Typography>
      </Link>
    ),
    filterValue: row => row.projectDescription + ', ' + row.projectId,
  },
  {
    id: 'contrast',
    label: 'Contrast',
    renderCell: row => (
      <Tooltip title={row.studyOverview} showHelpIcon>
        {row.contrast}
      </Tooltip>
    ),
    filterValue: row => row.contrast + ', ' + row.studyOverview,
  },
  {
    id: 'diseaseCellLines',
    label: 'Cell line',
    renderCell: row => (
      <>
        {row.diseaseCellLines.map(line => (
          <Link
            to={`https://cellmodelpassports.sanger.ac.uk/passports/${line.id}`}
            external
            key={line.id}
          >
            {line.name}
          </Link>
        ))}
      </>
    ),
    filterValue: row =>
      row.diseaseCellLines.map(line => line.name + ', ' + line.id).join(', '),
    width: '8%',
  },
  {
    id: 'biomarkerList',
    label: 'Cell line biomarkers',
    renderCell: row => {
      return (
        <ChipList
          small
          items={row.biomarkerList.map(bm => ({
            label: bm.name,
            tooltip: bm.description,
          }))}
        />
      );
    },
    filterValue: row =>
      row.biomarkerList.map(bm => bm.name + ', ' + bm.description).join(', '),
  },
  {
    id: 'resourceScore',
    label: 'Effect size',
    renderCell: row => <>{row.resourceScore}</>,
    numeric: true,
    width: '8%',
  },
  {
    id: 'confidence',
    label: 'Hit',
    renderCell: row => (
      <HitIcon isHit={isHit(row.confidence)} classes={classes} />
    ),
    width: '8%',
  },
  {
    id: 'projectHit',
    label: 'Primary project hit',
    renderCell: row => (
      <HitIcon isHit={isHit(row.expectedConfidence)} classes={classes} />
    ),
    width: '8%',
  },
];

const exportColumns = [
  {
    label: 'disease',
    exportValue: row => row.disease.name,
  },
  {
    label: 'disease id',
    exportValue: row => row.disease.id,
  },
  {
    label: 'project description',
    exportValue: row => row.projectDescription,
  },
  {
    label: 'project id',
    exportValue: row => row.projectId,
  },
  {
    label: 'contrast',
    exportValue: row => row.contrast,
  },
  {
    label: 'study overview',
    exportValue: row => row.studyOverview,
  },
  {
    label: 'disease cell line',
    exportValue: row =>
      row.diseaseCellLines.map(line => `${line.name} (${line.id})`),
  },
  {
    label: 'biomarkers',
    exportValue: row => row.biomarkerList.map(bm => bm.name),
  },
  {
    label: 'effect size',
    exportValue: row => row.resourceScore,
  },
  {
    label: 'hit',
    exportValue: row => isHit(row.confidence),
  },
  {
    label: 'primary project hit',
    exportValue: row => isHit(row.expectedConfidence),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      otValidationSummary: { count: size },
    },
  } = usePlatformApi(Summary.fragments.otValidationSummary);
  const variables = { ensemblId: ensgId, efoId, size };
  const request = useQuery(VALIDATION_QUERY, {
    variables,
  });
  const classes = useStyles();

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.ot_validation_lab}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        const hypothesis = _.uniqBy(
          rows.reduce(
            (prev, curr) =>
              prev.concat(
                curr.validationHypotheses.map(vht => ({
                  label: vht.name,
                  tooltip: vht.description,
                  customClass:
                    classes[
                      (hypothesesStatus.find(s => s.status === vht.status)
                        ?.styles)
                    ] || null,
                }))
              ),
            []
          ),
          'label'
        );

        return (
          <>
            <Box className={classes.hypotesisBox}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.bold}
              >
                OTVL biomarker assessment for {symbol}
              </Typography>
              {/** LEGEND */}
              <div className={classes.hypotesisLegend}>
                <Grid container spacing={4} direction="row">
                  {hypothesesStatus.map(hs => (
                    <Grid item key={hs.status}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <Chip
                            className={classNames(
                              classes[hs.styles],
                              classes.hsLegendChip
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" display="block">
                            <span className={classes.bold}>
                              {hs.expected ? 'Expected' : 'Not expected'}
                            </span>{' '}
                            in OTAR primary project
                          </Typography>
                          <Typography variant="caption" display="block">
                            <span className={classes.bold}>
                              {hs.observed ? 'Observed' : 'Not observed'}
                            </span>{' '}
                            in OTVL
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </div>
              {/** CHIPLIST */}
              <ChipList items={hypothesis} />
            </Box>

            <DataTable
              columns={getColumns(classes)}
              rows={rows}
              dataDownloader
              dataDownloaderColumns={exportColumns}
              dataDownloaderFileStem={`${ensgId}-${efoId}-otvalidation`}
              showGlobalFilter
              sortBy="resourceScore"
              order="des"
              fixed
              noWrap={false}
              noWrapHeader={false}
              rowsPerPageOptions={defaultRowsPerPageOptions}
              query={VALIDATION_QUERY.loc.source.body}
              variables={variables}
            />
          </>
        );
      }}
    />
  );
}

export default Body;

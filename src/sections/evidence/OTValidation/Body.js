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
// import TooltipStyledLabel from '../../../components/TooltipStyledLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';
// import classNames from 'classnames';

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
      // display: 'flex',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
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
    exportValue: row => row.diseaseLabel,
  },
  {
    label: 'disease id',
    exportValue: row => row.diseaseId,
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
    exportValue: row => row.biomarkers.map(bm => bm.name),
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

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.otValidationSummary
  );
  const request = useQuery(VALIDATION_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.otValidationSummary.count,
    },
  });
  const classes = useStyles();

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.ot_validation_lab}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        const hypothesis = rows.reduce(
          (prev, curr) =>
            prev.concat(
              curr.validationHypotheses.map(vht => ({
                label: vht.name,
                tooltip: vht.description,
              }))
            ),
          []
        );

        return (
          <>
            <Box className={classes.hypotesisBox}>
              <Typography variant="subtitle1" gutterBottom>
                OTVL biomarker assessment for {label.symbol}
              </Typography>
              <br />
              {/** LEGEND */}
              {/** CHIPLIST */}
              <div>
                <ChipList items={hypothesis} />
              </div>
            </Box>

            <DataTable
              columns={getColumns(classes)}
              rows={rows}
              dataDownloader
              dataDownloaderColumns={exportColumns}
              query={VALIDATION_QUERY.loc.source.body}
              dataDownloaderFileStem={`${ensemblId}-${efoId}-otvalidation`}
              showGlobalFilter
              sortBy="resourceScore"
              order="des"
              fixed
              noWrap={false}
              noWrapHeader={false}
              rowsPerPageOptions={defaultRowsPerPageOptions}
            />
          </>
        );
      }}
    />
  );
}

export default Body;

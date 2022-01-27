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
import TooltipStyledLabel from '../../../components/TooltipStyledLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { makeStyles, Typography } from '@material-ui/core';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';
import classNames from 'classnames';

const VALIDATION_QUERY = loader('./OTValidationQuery.gql');

// TODO: remove mock data
import sample from './data/sample';

const useStyles = makeStyles(theme => {
  return {
    primaryColor: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
    grey: {
      color: theme.palette.grey[300],
    },
    circleUp: {
      marginRight: '10px',
    },
  };
});

const HitIcon = ({ isHit, classes }) => (
  <FontAwesomeIcon
    icon={isHit ? faCheckCircle : faTimesCircle}
    size="2x"
    className={isHit ? classes.primaryColor : classes.grey}
  />
);

const getColumns = classes => [
  /*{
    id: 'disease',
    label: 'Disease',
    renderCell: row => (
      <Link to={`/disease/${row.disease.id}`}>{row.disease.name}</Link>
    ),
    filterValue: row => row.disease.name + ', ' + row.disease.id,
  },
  {
    id: 'target',
    label: 'Target A',
    renderCell: row => (
      <Link to={`/target/${row.target.id}`}>{row.target.approvedSymbol}</Link>
    ),
    filterValue: row => row.target.approvedSymbol + ', ' + row.target.id,
  },
  {
    id: 'interactingTargetFromSourceId',
    label: 'Target B',
    renderCell: row => row.interactingTargetFromSourceId,
  },
  {
    id: 'phenotypicConsequenceLogFoldChange',
    label: 'Direction of effect',
    renderCell: row => (
      <>
        <Tooltip
          title={
            <>
              <TooltipStyledLabel
                label={'Log-fold change'}
                description={row.phenotypicConsequenceLogFoldChange}
              />
              <TooltipStyledLabel
                label={'P-value'}
                description={row.phenotypicConsequencePValue}
              />
              <TooltipStyledLabel
                label={'FDR'}
                description={row.phenotypicConsequenceFDR}
              />
            </>
          }
        >
          <span>
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              size="lg"
              className={classNames(
                row.phenotypicConsequenceLogFoldChange >= 0
                  ? classes.primaryColor
                  : classes.grey,
                classes.circleUp
              )}
            />
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              size="lg"
              className={
                row.phenotypicConsequenceLogFoldChange < 0
                  ? classes.primaryColor
                  : classes.grey
              }
            />
          </span>
        </Tooltip>
      </>
    ),
  },
  {
    id: 'geneticInteractionPValue',
    label: 'Cooperativity (Type of effect)',
    renderCell: row => (
      <Tooltip
        title={
          <>
            <TooltipStyledLabel
              label={'Method'}
              description={row.geneticInteractionMethod}
            />
            <TooltipStyledLabel
              label={'Score'}
              description={row.geneticInteractionScore}
            />
            <TooltipStyledLabel
              label={'P-value'}
              description={row.geneticInteractionPValue}
            />
            <TooltipStyledLabel
              label={'FDR'}
              description={row.geneticInteractionFDR}
            />
          </>
        }
      >
        <span className={classes.primaryColor}>
          {row.geneticInteractionPValue >= 0.05 ? 'Additive' : 'Synergistic'}
        </span>
      </Tooltip>
    ),
    filterValue: row =>
      row.geneticInteractionPValue >= 0.05 ? 'Additive' : 'Synergistic',
  },
  {
    id: 'cellType',
    label: 'Cell line',
    renderCell: row => (
      <Link
        external
        to={`https://cellmodelpassports.sanger.ac.uk/passports/${row.cellType}`}
      >
        {row.cellType}
      </Link>
    ),
  },*/
  {
    id: 'disease',
    label: 'Reported disease',
    renderCell: row => (
      <Link to={`/disease/${row.diseaseId}`}>{row.diseaseLabel}</Link>
    ),
    // filterValue: row => row.disease.name + ', ' + row.disease.id,
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
  },
  {
    id: 'contrast',
    label: 'Contrast',
    renderCell: row => (
      <Tooltip title={row.studyOverview} showHelpIcon>
        {row.contrast}
      </Tooltip>
    ),
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
  },
  {
    id: 'biomarkers',
    label: (
      <>
        Cell line biomarkers
        <br />
        <Typography variant="caption">
          Available as seen in cell lines
        </Typography>
      </>
    ),
    renderCell: row => {
      return (
        <ChipList
          small
          items={row.biomarkers.map(bm => ({
            label: bm.name,
            tooltip: bm.description,
          }))}
        />
      );
    },
  },
  {
    id: 'resourceScore',
    label: 'Effect size',
    renderCell: row => <>{row.resourceScore}</>,
  },
  {
    id: 'confidence',
    label: 'Hit',
    renderCell: row => (
      <HitIcon
        isHit={row.confidence.toLowerCase() === 'significant'}
        classes={classes}
      />
    ),
  },
  {
    id: 'projectHit',
    label: 'Primary project hit',
    renderCell: row => (
      <HitIcon
        isHit={row.expectedConfidence.toLowerCase() === 'significant'}
        classes={classes}
      />
    ),
  },
  {
    id: 'observation',
    label: 'Validated observation',
    renderCell: row => (
      <HitIcon
        isHit={
          row.confidence.toLowerCase() === row.expectedConfidence.toLowerCase()
        }
        classes={classes}
      />
    ),
  },
  {
    id: 'validationHypotheses',
    label: 'Validated hypothesis',
    renderCell: row => (
      <>{row.validationHypotheses?.length > 0 ? 'yes' : '-'}</>
    ),
  },
];

const exportColumns = [
  // {
  //   label: 'disease',
  //   exportValue: row => row.disease.name,
  // },
  // {
  //   label: 'disease id',
  //   exportValue: row => row.disease.id,
  // },
  // {
  //   label: 'target A',
  //   exportValue: row => row.target.approvedSymbol,
  // },
  // {
  //   label: 'target A id',
  //   exportValue: row => row.target.id,
  // },
  // {
  //   label: 'target B',
  //   exportValue: row => row.interactingTargetFromSourceId,
  // },
  // {
  //   label: 'direction of effect',
  //   exportValue: row =>
  //     row.phenotypicConsequenceLogFoldChange >= 0 ? 'up' : 'down',
  // },
  // {
  //   label: 'phenotypicConsequenceLogFoldChange',
  //   exportValue: row => row.phenotypicConsequenceLogFoldChange,
  // },
  // {
  //   label: 'phenotypicConsequencePValue',
  //   exportValue: row => row.phenotypicConsequencePValue,
  // },
  // {
  //   label: 'phenotypicConsequenceFDR',
  //   exportValue: row => row.phenotypicConsequenceFDR,
  // },
  // {
  //   label: 'Cooperativity',
  //   exportValue: row =>
  //     row.geneticInteractionPValue >= 0.05 ? 'Additive' : 'Synergistic',
  // },
  // {
  //   label: 'geneticInteractionMethod',
  //   exportValue: row => row.geneticInteractionMethod,
  // },
  // {
  //   label: 'geneticInteractionScore',
  //   exportValue: row => row.geneticInteractionScore,
  // },
  // {
  //   label: 'geneticInteractionPValue',
  //   exportValue: row => row.geneticInteractionPValue,
  // },
  // {
  //   label: 'geneticInteractionFDR',
  //   exportValue: row => row.geneticInteractionFDR,
  // },
  // {
  //   label: 'cell line',
  //   exportValue: row => row.cellType,
  // },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.otEncoreSummary
  );
  const request = useQuery(VALIDATION_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: 10, //summaryData.otValidationSummary.count,
    },
  });
  const classes = useStyles();

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.ot_partner}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        // TODO
        {
          /* const { rows } = disease.evidences; */
        }
        const { rows } = sample;
        return (
          <DataTable
            columns={getColumns(classes)}
            rows={rows}
            dataDownloader
            dataDownloaderColumns={exportColumns}
            dataDownloaderFileStem={`${ensemblId}-${efoId}-otencore`}
            showGlobalFilter
            sortBy="geneticInteractionPValue"
            order="asc"
            fixed
            noWrap={false}
            noWrapHeader={false}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;

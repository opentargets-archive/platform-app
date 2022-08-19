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
import TooltipStyledLabel from '../../../components/TooltipStyledLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import Link from '../../../components/Link';
import ChipList from '../../../components/ChipList';
import { defaultRowsPerPageOptions } from '../../../constants';
import classNames from 'classnames';

const ENCORE_QUERY = loader('./OTEncoreQuery.gql');

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

const getColumns = classes => [
  {
    id: 'disease',
    label: 'Reported disease',
    renderCell: row => (
      <Link to={`/disease/${row.disease.id}`}>{row.disease.name}</Link>
    ),
    filterValue: row => row.disease.name + ', ' + row.disease.id,
  },
  {
    id: 'target',
    label: 'Target A',
    renderCell: row => (
      <Tooltip title={row.targetRole}>
        <span>
          <Link to={`/target/${row.target.id}`}>
            {row.target.approvedSymbol}
          </Link>
        </span>
      </Tooltip>
    ),
    filterValue: row => row.target.approvedSymbol + ', ' + row.target.id,
  },
  {
    id: 'interactingTargetFromSourceId',
    label: 'Target B',
    renderCell: row => (
      <Tooltip title={row.interactingTargetRole}>
        <span>
          <Link to={`/target/${row.target.id}`}>
            {row.interactingTargetFromSourceId}
          </Link>
        </span>
      </Tooltip>
    ),
  },
  {
    id: 'phenotypicConsequenceLogFoldChange',
    label: 'Cell count log fold change',
    tooltip: (
      <>
        When a negative log fold change is measured, it means there is an excess
        of cell death.
      </>
    ),
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
    label: 'Type of effect',
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
        <span className={classes.primaryColor}>{row.geneInteractionType}</span>
      </Tooltip>
    ),
    filterValue: row => row.geneInteractionType,
  },
  {
    id: 'cellType',
    label: 'Cell line',
    renderCell: row =>
      row.diseaseCellLines.map(diseaseCellLine => (
        <Link
          external
          to={`https://cellmodelpassports.sanger.ac.uk/passports/${
            diseaseCellLine.id
          }`}
        >
          {diseaseCellLine.name}
        </Link>
      )),
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
    label: 'target A',
    exportValue: row => row.target.approvedSymbol,
  },
  {
    label: 'target A id',
    exportValue: row => row.target.id,
  },
  {
    label: 'target B',
    exportValue: row => row.interactingTargetFromSourceId,
  },
  {
    label: 'direction of effect',
    exportValue: row =>
      row.phenotypicConsequenceLogFoldChange >= 0 ? 'up' : 'down',
  },
  {
    label: 'phenotypicConsequenceLogFoldChange',
    exportValue: row => row.phenotypicConsequenceLogFoldChange,
  },
  {
    label: 'phenotypicConsequencePValue',
    exportValue: row => row.phenotypicConsequencePValue,
  },
  {
    label: 'phenotypicConsequenceFDR',
    exportValue: row => row.phenotypicConsequenceFDR,
  },
  {
    label: 'Cooperativity',
    exportValue: row =>
      row.geneticInteractionPValue >= 0.05 ? 'Additive' : 'Synergistic',
  },
  {
    label: 'geneticInteractionMethod',
    exportValue: row => row.geneticInteractionMethod,
  },
  {
    label: 'geneticInteractionScore',
    exportValue: row => row.geneticInteractionScore,
  },
  {
    label: 'geneticInteractionPValue',
    exportValue: row => row.geneticInteractionPValue,
  },
  {
    label: 'geneticInteractionFDR',
    exportValue: row => row.geneticInteractionFDR,
  },
  {
    label: 'cell line',
    exportValue: row => row.cellType,
  },
  {
    label: 'cell line biomarkers',
    exportValue: row => row.biomarkerList.join(','),
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.otEncoreSummary
  );
  const request = useQuery(ENCORE_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.otEncoreSummary.count,
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
        const { rows } = disease.evidences;
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

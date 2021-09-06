import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { dataTypesMap } from '../../../dataTypes';
import Summary from './Summary';
import Description from './Description';
import Tooltip from '../../../components/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretSquareUp,
  faCaretSquareDown,
} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import Link from '../../../components/Link';

const CRISPR_QUERY = loader('./OTCrisprQuery.gql');

const useStyles = makeStyles(theme => {
  return {
    significanceIcon: {
      color: theme.palette.primary.main,
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
  },
  {
    id: 'projectId',
    label: 'OTAR project code',
    renderCell: row => row.projectId,
  },
  {
    id: 'contrast',
    label: 'Contrast / Study overview',
    renderCell: row =>
      row.contrast ? (
        <Tooltip title={row.studyOverview}>
          <span>{row.contrast}</span>
        </Tooltip>
      ) : (
        row.studyOverview
      ),
    width: '25%',
  },
  {
    id: 'cellType',
    label: 'Cell type',
    renderCell: row =>
      row.cellLineBackground ? (
        <Tooltip title={row.cellLineBackground}>
          <span>{row.cellType}</span>
        </Tooltip>
      ) : (
        row.cellType
      ),
  },
  {
    id: 'crisprScreenLibrary',
    label: 'CRISPR screen library',
    renderCell: row => row.crisprScreenLibrary,
  },
  {
    id: 'resourceScore',
    label: 'Significance',
    renderCell: row => (
      <>
        {row.resourceScore}{' '}
        <Tooltip title={row.statisticalTestTail}>
          <span className={classes.significanceIcon}>
            <FontAwesomeIcon
              icon={
                row.statisticalTestTail.toLowerCase() === 'upper tail'
                  ? faCaretSquareUp
                  : faCaretSquareDown
              }
            />
          </span>
        </Tooltip>
      </>
    ),
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.OtCrisprSummary
  );
  // console.log(summaryData);
  const request = useQuery(CRISPR_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.OtCrisprSummary.count,
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
            showGlobalFilter
            sortBy="resourceScore"
            fixed
            noWrap={false}
            noWrapHeader={false}
          />
        );
      }}
    />
  );
}

export default Body;

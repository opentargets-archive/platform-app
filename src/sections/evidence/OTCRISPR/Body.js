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
import { makeStyles } from '@material-ui/core';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';

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
    filterValue: row => row.disease.name + ', ' + row.disease.id,
  },
  {
    id: 'projectId',
    label: 'OTAR project code',
    renderCell: row => (
      <Link external to={`http://home.opentargets.org/${row.projectId}`}>
        {row.projectId}
      </Link>
    ),
  },
  {
    id: 'contrast',
    label: 'Contrast / Study overview',
    renderCell: row =>
      row.contrast ? (
        <Tooltip
          showHelpIcon
          title={
            <TooltipStyledLabel
              label={'Study overview'}
              description={row.studyOverview}
            />
          }
        >
          <span>{row.contrast}</span>
        </Tooltip>
      ) : (
        row.studyOverview
      ),
    width: '25%',
    filterValue: row => row.contrast + '; ' + row.studyOverview,
  },
  {
    id: 'cellType',
    label: 'Cell type',
    renderCell: row =>
      row.cellLineBackground ? (
        <Tooltip
          showHelpIcon
          title={
            <TooltipStyledLabel
              label={'Cell line background'}
              description={row.cellLineBackground}
            />
          }
        >
          <span>{row.cellType}</span>
        </Tooltip>
      ) : (
        row.cellType
      ),
    filterValue: row => row.cellType + '; ' + row.cellLineBackground,
  },
  {
    id: 'log2FoldChangeValue',
    label: 'log2 fold change',
    renderCell: row =>
      row.log2FoldChangeValue ? row.log2FoldChangeValue : 'N/A',
  },
  {
    id: 'resourceScore',
    label: 'Significance',
    filterValue: row => row.resourceScore + '; ' + row.statisticalTestTail,
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
    label: 'OTAR project code',
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
    label: 'cell type',
    exportValue: row => row.cellType,
  },
  {
    label: 'cell line background',
    exportValue: row => row.cellLineBackground,
  },
  {
    label: 'CRISPR screen library',
    exportValue: row => row.crisprScreenLibrary,
  },
  {
    label: 'resource score',
    exportValue: row => row.resourceScore,
  },
  {
    label: 'statistical test tail',
    exportValue: row => row.statisticalTestTail,
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.OtCrisprSummary
  );
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
            dataDownloaderColumns={exportColumns}
            dataDownloaderFileStem={`${ensemblId}-${efoId}-otcrispr`}
            showGlobalFilter
            sortBy="resourceScore"
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

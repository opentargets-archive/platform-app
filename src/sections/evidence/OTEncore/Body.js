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
  faCaretSquareUp,
  faCaretSquareDown,
} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import Link from '../../../components/Link';
import { defaultRowsPerPageOptions } from '../../../constants';

const ENCORE_QUERY = loader('./OTEncoreQuery.gql');

const useStyles = makeStyles(theme => {
  return {
    significanceIcon: {
      color: theme.palette.primary.main,
    },
  };
});

/*

Disease	Target A	Target B	Direction of effect	Cooperativity (Type of effect)	Cell line

 */
const getColumns = classes => [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: row => (
      <Link to={`/disease/${row.disease.id}`}>{row.disease.name}</Link>
    ),
    // filterValue: row => row.disease.name + ', ' + row.disease.id,
  },
  {
    id: 'target',
    label: 'Target A',
    renderCell: row => (
      <Link to={`/target/${row.target.id}`}>{row.target.approvedSymbol}</Link>
    ),
  },
  {
    id: 'interactingTargetFromSourceId',
    label: 'Target B',
    renderCell: row => row.interactingTargetFromSourceId,
    // filterValue: row => row.contrast + '; ' + row.studyOverview,
  },
  {
    id: 'phenotypicConsequenceLogFoldChange',
    label: 'Direction of effect',
    renderCell: row =>
      row.phenotypicConsequenceLogFoldChange >= 0 ? 'up' : 'down',
    // filterValue: row => row.cellType + '; ' + row.cellLineBackground,
  },
  {
    id: 'geneticInteractionPValue',
    label: 'Cooperativity (Type of effect)',
    renderCell: row => row.geneticInteractionPValue,
  },
  {
    id: 'cellType',
    label: 'Cell line',
    renderCell: row => row.cellType,
    // (
    //   <>
    //     <Tooltip
    //       title={
    //         <TooltipStyledLabel
    //           label={'Statistical test tail'}
    //           description={row.statisticalTestTail}
    //         />
    //       }
    //     >
    //       <span className={classes.significanceIcon}>
    //         <FontAwesomeIcon
    //           icon={
    //             row.statisticalTestTail.toLowerCase() === 'upper tail'
    //               ? faCaretSquareUp
    //               : faCaretSquareDown
    //           }
    //         />
    //       </span>
    //     </Tooltip>{' '}
    //     {row.resourceScore}
    //   </>
    // ),
    // filterValue: row => row.resourceScore + '; ' + row.statisticalTestTail,
  },
];

const exportColumns = [];
// const exportColumns = [
//   {
//     label: 'disease',
//     exportValue: row => row.disease.name,
//   },
//   {
//     label: 'disease id',
//     exportValue: row => row.disease.id,
//   },
//   {
//     label: 'OTAR project code',
//     exportValue: row => row.projectId,
//   },
//   {
//     label: 'contrast',
//     exportValue: row => row.contrast,
//   },
//   {
//     label: 'study overview',
//     exportValue: row => row.studyOverview,
//   },
//   {
//     label: 'cell type',
//     exportValue: row => row.cellType,
//   },
//   {
//     label: 'cell line background',
//     exportValue: row => row.cellLineBackground,
//   },
//   {
//     label: 'CRISPR screen library',
//     exportValue: row => row.crisprScreenLibrary,
//   },
//   {
//     label: 'resource score',
//     exportValue: row => row.resourceScore,
//   },
//   {
//     label: 'statistical test tail',
//     exportValue: row => row.statisticalTestTail,
//   },
// ];

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
        {
          return (
            <DataTable
              columns={getColumns(classes)}
              rows={rows}
              dataDownloader
              dataDownloaderColumns={exportColumns}
              dataDownloaderFileStem={`${ensemblId}-${efoId}-otencore`}
              showGlobalFilter
              sortBy="resourceScore"
              fixed
              noWrap={false}
              noWrapHeader={false}
              rowsPerPageOptions={defaultRowsPerPageOptions}
            />
          );
        }
      }}
    />
  );
}

export default Body;

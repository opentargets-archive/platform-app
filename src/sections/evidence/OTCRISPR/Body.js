import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Link } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { dataTypesMap } from '../../../dataTypes';
import Summary from './Summary';
import Description from './Description';

const CRISPR_QUERY = loader('./OTCrisprQuery.gql');

const columns = [
  {
    id: 'disease',
    label: 'Reported disease',
    renderCell: row => row.disease.name,
  },
  {
    id: 'projectId',
    label: 'OTAR project code',
    renderCell: row => row.projectId,
  },
  {
    id: 'contrast',
    label: 'Contrast / Study overview',
    renderCell: row => row.contrast ?? row.studyOverview,
  },
  {
    id: 'cellType',
    label: 'Cell type',
    renderCell: row => row.cellType,
  },
  {
    id: 'crisprScreenLibrary',
    label: 'CRISPR screen library',
    renderCell: row => row.crisprScreenLibrary,
  },
  {
    id: 'resourceScore',
    label: 'Significance',
    renderCell: row => row.resourceScore, // TODO: add statisticalTestTail as a FontAwesome icon
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
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
            sortBy="resourceScore"
            order="desc"
          />
        );
      }}
    />
  );
}

export default Body;

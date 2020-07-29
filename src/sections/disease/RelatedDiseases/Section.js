import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../components/LinearVenn';
import { Table, PaginationActionsComplete } from '../../../components/Table';
import useBatchDownloader from '../../../hooks/useBatchDownloader';

const RELATED_DISEASES_QUERY = loader('./sectionQuery.gql');

const columns = (name, maxCountAOrB) => [
  {
    id: 'name',
    propertyPath: 'B.name',
    label: 'Related disease Ⓑ',
    exportLabel: 'relatedDisease',
    renderCell: d => <Link to={`/disease/${d.B.id}`}>{d.B.name}</Link>,
  },
  {
    id: 'score',
    label: 'Similarity score',
    exportLabel: 'similarityScore',
    numeric: true,
    exportValue: d => significantFigures(d.score),
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'countANotB',
    label: '|Ⓐ - Ⓑ|',
    exportLabel: 'countANotB',
    tooltip: `Diseases associated with ${name} but not the related disease`,
    numeric: true,
    hidden: ['mdDown'],
    exportValue: d => d.countA - d.countAAndB,
    renderCell: d => d.countA - d.countAAndB,
  },
  {
    id: 'countAAndB',
    label: '|Ⓐ ∩ Ⓑ|',
    exportLabel: 'countAAndB',
    tooltip: 'Shared disease associations',
    numeric: true,
  },
  {
    id: 'countBNotA',
    label: '|Ⓑ - Ⓐ|',
    exportLabel: 'countBNotA',
    tooltip: `Diseases associated with the related disease but not ${name}`,
    numeric: true,
    hidden: ['mdDown'],
    exportValue: d => d.countB - d.countAAndB,
    renderCell: d => d.countB - d.countAAndB,
  },
  {
    id: 'chart',
    label: <LinearVennLegend a="|Ⓐ - Ⓑ|" aAndB="|Ⓐ ∩ Ⓑ|" b="|Ⓑ - Ⓐ|" />,
    labelStyle: { paddingLeft: '1.5rem' },
    exportValue: false,
    tooltip: (
      <LinearVennLegend
        tooltip
        a={`Diseases associated with ${name} but not the related disease`}
        aAndB="Shared disease associations"
        b={`Diseases associated with the related target but not ${name}`}
      />
    ),
    tooltipStyle: {
      popper: { maxWidth: 'none' },
      tooltip: { maxWidth: 'none' },
    },
    hidden: ['lgDown'],
    style: { width: '400px', lineHeight: 0, paddingLeft: '1.5rem' },
    renderCell: d => (
      <LinearVenn
        aOnly={d.countA - d.countAAndB}
        bOnly={d.countB - d.countAAndB}
        aAndB={d.countAAndB}
        max={maxCountAOrB}
      />
    ),
  },
];

const Section = ({ efoId, name }) => {
  const [page, setPage] = useState(0);

  const { data, loading, fetchMore } = useQuery(RELATED_DISEASES_QUERY, {
    variables: {
      efoId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const getWholeDataset = useBatchDownloader(
    RELATED_DISEASES_QUERY,
    { efoId },
    'data.disease.relatedDiseases'
  );

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchMore({
      variables: {
        index: newPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  };

  const { count, maxCountAOrB, rows = [] } =
    data?.disease.relatedDiseases ?? {};

  return (
    <Table
      loading={loading}
      columns={columns(name, maxCountAOrB)}
      dataDownloader
      dataDownloaderFileStem={`${efoId}-related_diseases`}
      dataDownloaderRows={getWholeDataset}
      rows={rows}
      rowCount={count}
      page={page}
      onPageChange={handlePageChange}
      ActionsComponent={PaginationActionsComplete}
    />
  );
};

export default Section;

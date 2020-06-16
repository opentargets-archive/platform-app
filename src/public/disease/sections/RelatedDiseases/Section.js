import React, { useEffect, useState } from 'react';

import { Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';
import Table from '../../../common/Table/Table';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';
import { sectionQuery } from '.';

const aLabel = String.fromCodePoint('9398');
const bLabel = String.fromCodePoint('9399');
const difference = String.fromCodePoint('8726');
const intersection = String.fromCodePoint('8898');
const countANotBLabel = ['|', aLabel, difference, bLabel, '|'].join(' ');
const countBNotALabel = ['|', bLabel, difference, aLabel, '|'].join(' ');
const countAAndBLabel = ['|', aLabel, intersection, bLabel, '|'].join(' ');

const columns = (name, maxCountAOrB) => [
  {
    id: 'name',
    propertyPath: 'B.name',
    label: `Related disease ${String.fromCodePoint('9399')}`,
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
    label: countANotBLabel,
    exportLabel: 'countANotB',
    tooltip: `Diseases associated with ${name} but not the related disease`,
    numeric: true,
    hidden: ['mdDown'],
    exportValue: d => d.countA - d.countAAndB,
    renderCell: d => d.countA - d.countAAndB,
  },
  {
    id: 'countAAndB',
    label: countAAndBLabel,
    exportLabel: 'countAAndB',
    tooltip: 'Shared disease associations',
    numeric: true,
  },
  {
    id: 'countBNotA',
    label: countBNotALabel,
    exportLabel: 'countBNotA',
    tooltip: `Diseases associated with the related disease but not ${name}`,
    numeric: true,
    hidden: ['mdDown'],
    exportValue: d => d.countB - d.countAAndB,
    renderCell: d => d.countB - d.countAAndB,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={countANotBLabel}
        aAndB={countAAndBLabel}
        b={countBNotALabel}
      />
    ),
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

const Section = ({ efoId, data, name, fetchMore }) => {
  const { rows, count, maxCountAOrB } = data;
  const [pageIndex, setPageIndex] = useState(0);

  const getWholeDataset = useBatchDownloader(
    sectionQuery,
    { efoId },
    'data.disease.relatedDiseases'
  );

  const onTableAction = params => setPageIndex(params.page);
  const pageSize = 10;

  useEffect(
    () => {
      fetchMore({
        variables: { index: pageIndex, size: pageSize },
        updateQuery: (prev, { fetchMoreResult }) =>
          !fetchMoreResult ? prev : { ...prev, ...fetchMoreResult },
      });
    },
    [fetchMore, pageIndex]
  );

  return (
    <Table
      columns={columns(name, maxCountAOrB)}
      dataDownloader
      dataDownloaderFileStem={`${efoId}-related_diseases`}
      dataDownloaderRows={getWholeDataset}
      onTableAction={onTableAction}
      pagination={PaginationActionsComplete}
      rowCount={count}
      rows={rows}
      serverSide={true}
    />
  );
};

export default Section;

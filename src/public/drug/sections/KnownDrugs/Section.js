import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'ot-ui';

import SourceDrawer from '../../../common/sections/KnownDrugs/custom/SourceDrawer';
import Table from '../../../common/Table/Table';
import useCursorBatchDownloader from '../../../../hooks/useCursorBatchDownloader';
import { label } from '../../../../utils/global';
import { sectionQuery } from '.';

const columnPool = {
  clinicalTrialsColumns: {
    label: 'Clinical trials information',
    columns: [
      {
        id: 'phase',
        filterValue: d =>
          // filter phase with arabic numerals
          `${d.phase} Phase ${
            { 0: 0, I: 1, II: 2, III: 3, IV: 4 }[
              d.phase.split('Phase ')[1] ?? 0
            ]
          }`,
      },
      {
        id: 'status',
        renderCell: d => label(d.status),
      },
      {
        id: 'sources',
        label: 'Source',
        filterValue: false,
        exportValue: d => d.urls.map(reference => reference.url),
        renderCell: d => <SourceDrawer references={d.urls} />,
      },
    ],
  },
  diseaseColumns: {
    label: 'Disease information',
    columns: [
      {
        id: 'disease',
        propertyPath: 'disease.id',
        filterValue: d => d.disease.name,
        renderCell: d => (
          <Link to={`/disease/${d.disease.id}`}>{label(d.disease.name)}</Link>
        ),
      },
    ],
  },
  drugColumns: {
    label: 'Drug information',
    columns: [
      {
        id: 'drug',
        propertyPath: 'drug.id',
        filterValue: d => d.drug.name,
        renderCell: d => (
          <Link to={`/drug/${d.drug.id}`}>{label(d.drug.name)}</Link>
        ),
      },
      {
        id: 'type',
        propertyPath: 'drugType',
        renderCell: d => label(d.drugType),
      },
      {
        id: 'mechanismOfAction',
      },
      {
        id: 'activity',
        renderCell: d => label(d.activity),
      },
    ],
  },
  targetColumns: {
    label: 'Target information',
    columns: [
      {
        id: 'targetSymbol',
        label: 'Symbol',
        propertyPath: 'target.approvedSymbol',
        filterValue: d => d.target.approvedSymbol,
        renderCell: d => (
          <Link to={`/target/${d.target.id}`}>{d.target.approvedSymbol}</Link>
        ),
      },
      {
        id: 'targetName',
        label: 'Name',
        propertyPath: 'target.approvedName',
        filterValue: d => d.target.approvedName,
        renderCell: d => label(d.target.approvedName),
      },
    ],
  },
};

const columnsToShow = [
  columnPool.diseaseColumns,
  columnPool.targetColumns,
  columnPool.clinicalTrialsColumns,
];

const stickyColumn = 'disease';

const columns = [];

columnsToShow.forEach(columnGroup => {
  columns.push(
    ...columnGroup.columns.map(column =>
      column.id === stickyColumn ? { ...column, sticky: true } : column
    )
  );
});

const headerGroups = [
  ...columnsToShow.map(group => ({
    colspan: group.columns.length,
    label: group.label,
  })),
];

const Section = ({ data, fetchMore, chemblId }) => {
  const pageSize = 10;
  const [cursor, setCursor] = useState(data.cursor);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(data.rows.slice(0, pageSize));

  const getWholeDataset = useCursorBatchDownloader(
    sectionQuery,
    { chemblId, freeTextQuery: globalFilter },
    'data.drug.knownDrugs'
  );

  async function fetchMoreRows(cursor, globalFilter, invalidate = false) {
    setLoading(true);

    await fetchMore({
      variables: { cursor, freeTextQuery: globalFilter },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newCursor = fetchMoreResult.drug.knownDrugs?.cursor || null;
        const newCount = fetchMoreResult.drug.knownDrugs?.count || 0;
        const newRows = fetchMoreResult.drug.knownDrugs?.rows || [];

        setCursor(newCursor);

        prev.drug.knownDrugs.rows = invalidate
          ? newRows
          : [...prev.drug.knownDrugs.rows, ...newRows];

        prev.drug.knownDrugs.count = newCount;
        prev.drug.knownDrugs.cursor = newCursor;

        return prev;
      },
    });

    setLoading(false);
  }

  const onTableAction = async params => {
    const startRow = params.page * pageSize;
    const endRow = startRow + pageSize;

    // Cases where we need to fetch more rows: filter has changed, or we are
    // out of rows but not yet at the end of the dataset.
    if (params.globalFilter !== globalFilter) {
      setGlobalFilter(params.globalFilter);

      // create event in GA
      if (params.globalFilter) {
        ReactGA.event({
          category: 'Disease Profile Page',
          action: 'Typed in knownDrugs widget search',
          label: params.globalFilter,
        });
      }

      await fetchMoreRows(null, params.globalFilter, true);
    } else if (endRow > data.rows.length && endRow < data.count) {
      await fetchMoreRows(cursor, params.globalFilter, false);
    }

    setRows(data.rows.slice(startRow, endRow));
  };

  return (
    <Table
      columns={columns}
      dataDownloader
      dataDownloaderRows={getWholeDataset}
      dataDownloaderFileStem={`${chemblId}-known_drugs`}
      headerGroups={headerGroups}
      loading={loading}
      rowCount={data?.count || 0}
      rows={rows}
      serverSide={true}
      showGlobalFilter
      onTableAction={onTableAction}
    />
  );
};

export default Section;

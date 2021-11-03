import React, { useState, useEffect } from 'react';

import client from '../../../client';
import Link from '../../../components/Link';
import { naLabel, phaseMap } from '../../../constants';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';
import SourceDrawer from './SourceDrawer';
import { Table, getPage } from '../../../components/Table';
import useCursorBatchDownloader from '../../../hooks/useCursorBatchDownloader';

function getColumnPool(id, entity) {
  return {
    clinicalTrials: {
      label: 'Clinical trials information',
      columns: [
        {
          id: 'phase',
          label: 'Phase',
          sortable: true,
          renderCell: ({ phase }) => phaseMap[phase],
          filterValue: ({ phase }) => phaseMap[phase],
        },
        {
          id: 'status',
          renderCell: d => (d.status ? d.status : naLabel),
        },
        {
          id: 'sources',
          label: 'Source',
          exportValue: d => d.urls.map(reference => reference.url),
          renderCell: d => <SourceDrawer references={d.urls} />,
        },
      ],
    },
    disease: {
      label: 'Disease information',
      columns: [
        {
          id: 'disease',
          propertyPath: 'disease.id',
          renderCell: d => (
            <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
          ),
        },
      ],
    },
    drug: {
      label: 'Drug information',
      columns: [
        {
          id: 'drug',
          propertyPath: 'drug.id',
          renderCell: d => {
            return d.drug ? (
              <Link to={`/drug/${d.drug.id}`}>{d.drug.name}</Link>
            ) : (
              naLabel
            );
          },
        },
        {
          id: 'type',
          propertyPath: 'drugType',
          renderCell: d => d.drugType,
        },
        {
          id: 'mechanismOfAction',
        },
        {
          id: 'Action type',
          renderCell: ({ drug: { mechanismsOfAction }, target }) => {
            if (!mechanismsOfAction) return naLabel;
            const at = new Set();

            const targetId = entity === 'target' ? id : target.id;

            mechanismsOfAction.rows.forEach(row => {
              row.targets.forEach(t => {
                if (t.id === targetId) {
                  at.add(row.actionType);
                }
              });
            });

            const actionTypes = Array.from(at);

            return actionTypes.length > 0 ? (
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {actionTypes.map(actionType => (
                  <li key={actionType}>{sentenceCase(actionType)}</li>
                ))}
              </ul>
            ) : (
              naLabel
            );
          },
        },
      ],
    },
    target: {
      label: 'Target information',
      columns: [
        {
          id: 'targetSymbol',
          label: 'Symbol',
          propertyPath: 'target.approvedSymbol',
          renderCell: d => (
            <Link to={`/target/${d.target.id}`}>{d.target.approvedSymbol}</Link>
          ),
        },
        {
          id: 'targetName',
          label: 'Name',
          propertyPath: 'target.approvedName',
          hidden: ['lgDown'],
          renderCell: d => d.target.approvedName,
        },
      ],
    },
  };
}

const INIT_PAGE_SIZE = 10;

function Body({
  definition,
  entity,
  variables,
  BODY_QUERY,
  Description,
  columnsToShow,
  stickyColumn,
  exportColumns,
}) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [cursor, setCursor] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE);
  const [globalFilter, setGlobalFilter] = useState('');

  const id = variables[Object.keys(variables)[0]];
  const columnPool = getColumnPool(id, entity);
  const columns = [];

  columnsToShow.forEach(columnGroupName => {
    columns.push(
      ...columnPool[columnGroupName].columns.map(column =>
        column.id === stickyColumn ? { ...column, sticky: true } : column
      )
    );
  });

  const headerGroups = [
    ...columnsToShow.map(columnGroupName => ({
      colspan: columnPool[columnGroupName].columns.length,
      label: columnPool[columnGroupName].label,
    })),
  ];

  const fetchDrugs = (variables, cursor, size, freeTextQuery) => {
    return client.query({
      query: BODY_QUERY,
      variables: {
        ...variables,
        cursor,
        size: size * 10, // fetch 10 pages ahead of time
        freeTextQuery,
      },
    });
  };

  useEffect(
    () => {
      let isCurrent = true;

      fetchDrugs(variables, null, INIT_PAGE_SIZE).then(res => {
        const { cursor, count, rows } = res.data[entity].knownDrugs;

        if (isCurrent) {
          setInitialLoading(false);
          setCursor(cursor);
          setCount(count);
          setRows(rows);
        }
      });

      return () => {
        isCurrent = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variables]
  );

  const getWholeDataset = useCursorBatchDownloader(
    BODY_QUERY,
    { ...variables, freeTextQuery: globalFilter },
    `data[${entity}].knownDrugs`
  );

  const handlePageChange = newPage => {
    if (pageSize * newPage + pageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchDrugs(variables, cursor, pageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data[entity].knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setPage(newPage);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = newPageSize => {
    if (newPageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchDrugs(variables, cursor, newPageSize, globalFilter).then(res => {
        const { cursor, rows: newRows } = res.data[entity].knownDrugs;
        setLoading(false);
        setCursor(cursor);
        setPage(0);
        setPageSize(newPageSize);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  };

  const handleGlobalFilterChange = newGlobalFilter => {
    setLoading(true);
    fetchDrugs(variables, null, pageSize, newGlobalFilter).then(res => {
      const { cursor, count, rows: newRows = [] } =
        res.data[entity].knownDrugs ?? {};
      setLoading(false);
      setPage(0);
      setCursor(cursor);
      setCount(count);
      setGlobalFilter(newGlobalFilter);
      setRows(newRows);
    });
  };

  return (
    <SectionItem
      definition={definition}
      request={{ loading: initialLoading, error: false, data: rows }}
      renderDescription={Description}
      renderBody={() => (
        <Table
          loading={loading}
          stickyHeader
          showGlobalFilter
          globalFilter={globalFilter}
          dataDownloader
          dataDownloaderRows={getWholeDataset}
          dataDownloaderFileStem={`${id}-known-drugs`}
          headerGroups={headerGroups}
          columns={columns}
          rows={getPage(rows, page, pageSize)}
          rowCount={count}
          rowsPerPageOptions={[10, 25, 100]}
          page={page}
          pageSize={pageSize}
          onGlobalFilterChange={handleGlobalFilterChange}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          dataDownloaderColumns={exportColumns}
          query={BODY_QUERY.loc.source.body}
          variables={variables}
        />
      )}
    />
  );
}

export default Body;

import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import { useQuery } from '@apollo/client';
import { makeStyles, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Table } from '../../components/Table';
import useBatchDownloader from '../../hooks/useBatchDownloader';

import { client3 } from '../../client';

const DISEASE_ASSOCIATIONS_QUERY = gql`
  query DiseaseAssociationsQuery(
    $efoId: String!
    $index: Int!
    $size: Int!
    $sortBy: String!
  ) {
    disease(efoId: $efoId) {
      associatedTargets(
        orderByScore: $sortBy
        page: { index: $index, size: $size }
      ) {
        count
        rows {
          target {
            id
            approvedSymbol
            approvedName
          }
          score
          datatypeScores {
            componentId: id
            score
          }
        }
      }
    }
  }
`;

const dataTypes = [
  { id: 'genetic_association', label: 'Genetic associations' },
  { id: 'somatic_mutation', label: 'Somatic mutations' },
  { id: 'known_drug', label: 'Drugs' },
  { id: 'affected_pathway', label: 'Pathways & systems biology' },
  { id: 'rna_expression', label: 'RNA expression' },
  { id: 'literature', label: 'Text mining' },
  { id: 'animal_model', label: 'Animal models' },
];

const colorRange = [
  '#e8edf1',
  '#d2dce4',
  '#bbcbd6',
  '#a5b9c9',
  '#8fa8bc',
  '#7897ae',
  '#6285a1',
  '#4b7493',
  '#356386',
  '#1f5279',
];

const color = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

const useStyles = makeStyles({
  root: {
    overflow: 'visible',
  },
  table: {
    tableLayout: 'fixed',
  },
  symbolHeaderCell: {
    width: '10%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
    textAlign: 'end',
    paddingBottom: '.4rem',
  },
  nameHeaderCell: {
    width: '20%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
    paddingBottom: '.4rem',
  },
  headerCell: {
    position: 'relative',
    borderBottom: 0,
    height: '140px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  overallCell: {
    border: 0,
    textAlign: 'center',
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '1px',
    paddingRight: '10px',
    height: '1px', // hack
  },
  cell: {
    border: 0,
    textAlign: 'center',
    padding: '1px 1px',
    height: '1px', // hack
    '&:last-child': {
      paddingRight: 0,
    },
  },
  colorDiv: {
    height: '100%',
    border: '1px solid #eeefef',
  },
  symbolCell: {
    border: 0,
    width: '20%',
    padding: '0 0.5rem 0 0',
  },
  nameCell: {
    border: 0,
    width: '10%',
    padding: '0 0 0 0.5rem',
  },
  symbolContainer: {
    display: 'block',
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  nameContainer: {
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

function getColumns(efoId, classes) {
  return [
    {
      id: 'symbol',
      label: 'Symbol',
      headerClass: classes.symbolHeaderCell,
      cellClasses: classes.symbolCell,
      exportValue: data => data.target.approvedSymbol,
      renderCell: row => {
        return (
          <Link
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}`}
            className={classes.symbolContainer}
            underline="none"
            title={row.symbol}
            color="textPrimary"
          >
            {row.symbol}
          </Link>
        );
      },
    },
    {
      id: 'score',
      label: 'Overall association score',
      slanted: true,
      headerClass: classes.headerCell,
      cellClasses: classes.overallCell,
      sortable: true,
      exportValue: data => data.score,
      renderCell: row => {
        return (
          <div
            className={classes.colorDiv}
            title={`Score: ${row.score.toFixed(2)}`}
            style={{ backgroundColor: color(row.score) }}
          />
        );
      },
    },
    {
      id: 'genetic_association',
      label: 'Genetic associations',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'genetic_association'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:genetic_association`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.genetic_association
                  ? `Score: ${row.genetic_association.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.genetic_association) }}
            />
          </a>
        );
      },
    },
    {
      id: 'somatic_mutation',
      label: 'Somatic mutations',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'somatic_mutation'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:somatic_mutation`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.somatic_mutation
                  ? `Score: ${row.somatic_mutation.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.somatic_mutation) }}
            />
          </a>
        );
      },
    },
    {
      id: 'known_drug',
      label: 'Drugs',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'known_drug'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:known_drug`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.known_drug
                  ? `Score: ${row.known_drug.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.known_drug) }}
            />
          </a>
        );
      },
    },
    {
      id: 'affected_pathway',
      label: 'Pathways & systems biology',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'affected_pathway'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:affected_pathway`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.affected_pathway
                  ? `Score: ${row.affected_pathway.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.affected_pathway) }}
            />
          </a>
        );
      },
    },
    {
      id: 'rna_expression',
      label: 'RNA expression',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'rna_expression'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:rna_expression`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.rna_expression
                  ? `Score: ${row.rna_expression.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.rna_expression) }}
            />
          </a>
        );
      },
    },
    {
      id: 'literature',
      label: 'Text mining',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'literature'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:literature`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.literature
                  ? `Score: ${row.literature.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.literature) }}
            />
          </a>
        );
      },
    },
    {
      id: 'animal_model',
      label: 'Animal models',
      headerClass: classes.headerCell,
      cellClasses: classes.cell,
      slanted: true,
      sortable: true,
      exportValue: data => {
        const datatypeScore = data.datatypeScores.find(
          datatypeScore => datatypeScore.componentId === 'animal_model'
        );
        return datatypeScore ? datatypeScore.score : 'No data';
      },
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}?view=sec:animal_model`}
          >
            <div
              className={classes.colorDiv}
              title={
                row.animal_model
                  ? `Score: ${row.animal_model.toFixed(2)}`
                  : 'No data'
              }
              style={{ backgroundColor: color(row.animal_model) }}
            />
          </a>
        );
      },
    },
    {
      id: 'name',
      label: 'Target name',
      headerClass: classes.nameHeaderCell,
      cellClasses: classes.nameCell,
      exportValue: data => data.target.approvedName,
      renderCell: row => {
        return (
          <Link
            href={`https://www.targetvalidation.org/evidence/${
              row.ensemblId
            }/${efoId}`}
            className={classes.nameContainer}
            underline="none"
            color="textPrimary"
          >
            {row.name}
          </Link>
        );
      },
    },
  ];
}

function getRows(data) {
  return data.map(d => {
    const row = {
      ensemblId: d.target.id,
      symbol: d.target.approvedSymbol,
      name: d.target.approvedName,
      score: d.score,
    };
    dataTypes.forEach(dataType => {
      const dataTypeScore = d.datatypeScores.find(
        dataTypeScore => dataTypeScore.componentId === dataType.id
      );

      if (dataTypeScore) {
        row[dataType.id] = dataTypeScore.score;
      }
    });
    return row;
  });
}

function Legend() {
  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          border: '1px solid #eeefef',
          height: '20px',
          width: '20px',
        }}
      />
      No data
      <div style={{ display: 'flex' }}>
        <div>0</div>
        {colorRange.map(color => {
          return (
            <div
              key={color}
              style={{
                backgroundColor: color,
                height: '20px',
                width: '20px',
              }}
            />
          );
        })}
        <div>1</div>
      </div>
      <Link href="https://docs.targetvalidation.org/getting-started/scoring">
        <FontAwesomeIcon icon={faQuestionCircle} size="xs" /> Score
      </Link>
    </div>
  );
}

function ClassicAssociationsTable({ efoId }) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const { loading, error, data } = useQuery(DISEASE_ASSOCIATIONS_QUERY, {
    variables: {
      efoId,
      index: page,
      size: pageSize,
      sortBy,
    },
    client: client3,
  });

  const getAllAssociations = useBatchDownloader(
    DISEASE_ASSOCIATIONS_QUERY,
    { efoId },
    'data.disease.associatedTargets',
    client3
  );

  function handlePageChange(page) {
    setPage(page);
  }

  function handleRowsPerPageChange(pageSize) {
    setPageSize(pageSize);
    setPage(0);
  }

  function handleSort(sortBy) {
    setSortBy(sortBy);
  }

  if (error) return null;

  const { count, rows = [] } = data?.disease.associatedTargets ?? {};
  const columns = getColumns(efoId, classes);
  const processedRows = getRows(rows);

  return (
    <>
      <Table
        loading={loading}
        dataDownloader
        dataDownloaderRows={getAllAssociations}
        dataDownloaderFileStem={`${efoId}-associated-diseases`}
        classes={{ root: classes.root, table: classes.table }}
        sortBy={sortBy}
        order="asc"
        page={page}
        columns={columns}
        rows={processedRows}
        pageSize={pageSize}
        rowCount={count}
        rowsPerPageOptions={[10, 50, 200, 500]}
        onSortBy={handleSort}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Legend />
    </>
  );
}

export default ClassicAssociationsTable;

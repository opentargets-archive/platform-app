import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import { useQuery } from '@apollo/client';
import { makeStyles, Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Table } from '../../components/Table';

import { client3 } from '../../client';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery($ensemblId: String!, $page: Pagination!) {
    target(ensemblId: $ensemblId) {
      associatedDiseases(page: $page) {
        count
        rows {
          disease {
            id
            name
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
  sortLabel: {
    top: '8px',
  },
  innerLabel: {
    position: 'absolute',
    display: 'inline-block',
    transformOrigin: '0 0',
    bottom: 0,
    transform: 'rotate(315deg)',
    marginBottom: '5px',
  },
  nameHeaderCell: {
    width: '20%',
    borderBottom: 0,
    height: '140px',
    verticalAlign: 'bottom',
    textAlign: 'end',
    paddingBottom: '.4rem',
  },
  headerCell: {
    position: 'relative',
    borderBottom: 0,
    height: '140px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'bottom',
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
  nameCell: {
    border: 0,
    width: '20%',
    padding: '0 0.5rem 0 0',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  nameContainer: {
    display: 'block',
    textAlign: 'end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

function getColumns(ensemblId, classes) {
  return [
    {
      id: 'name',
      label: 'Name',
      classes: {
        headerCell: classes.nameHeaderCell,
        cell: classes.nameCell,
      },
      renderCell: row => {
        return (
          <Link
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }`}
            className={classes.nameContainer}
            title={row.name}
            underline="none"
            color="textPrimary"
          >
            {row.name}
          </Link>
        );
      },
    },
    {
      id: 'score',
      label: 'Overall association score',
      classes: {
        headerCell: classes.headerCell,
        cell: classes.overallCell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:genetic_association`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:somatic_mutation`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:known_drug`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:affected_pathway`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:rna_expression`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:literature`}
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
      classes: {
        headerCell: classes.headerCell,
        cell: classes.cell,
        sortLabel: classes.sortLabel,
        innerLabel: classes.innerLabel,
      },
      sortable: true,
      renderCell: row => {
        return (
          <a
            href={`https://www.targetvalidation.org/evidence/${ensemblId}/${
              row.efoId
            }?view=sec:animal_model`}
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
  ];
}

function getRows(data) {
  const { rows = [] } = data;
  return rows.map(d => {
    const row = {
      name: d.disease.name,
      efoId: d.disease.id,
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

function ClassicAssociationsTable({ ensgId }) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('score');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const { loading, error, data } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: {
      ensemblId: ensgId,
      page: { index: page, size: pageSize },
    },
    client: client3,
  });

  function handlePageChange(page) {
    setPage(page);
  }

  function handleRowsPerPageChange(pageSize) {
    setPageSize(pageSize);
    setPage(0);
  }

  if (error) return null;

  const columns = getColumns(ensgId, classes);
  const rows = getRows(data?.target.associatedDiseases ?? {});

  return (
    <>
      <Table
        loading={loading}
        classes={{ root: classes.root, table: classes.table }}
        page={page}
        sortBy={sortBy}
        order="asc"
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        rowCount={600}
        rowsPerPageOptions={[10, 50, 200, 500]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Legend />
    </>
  );
}

export default ClassicAssociationsTable;

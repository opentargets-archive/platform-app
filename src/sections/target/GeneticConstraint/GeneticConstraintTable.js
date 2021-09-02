import React from 'react';
import { makeStyles } from '@material-ui/core';

import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';

import { DataTable } from '../../../components/Table';

import { defaultRowsPerPageOptions } from '../../../constants';

const useStyles = makeStyles(theme => ({
  filled: {
    display: 'inline-block',
    border: '1px solid black',
    backgroundColor: theme.palette.primary.main,
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    marginRight: '3px',
  },
  notFilled: {
    display: 'inline-block',
    border: '1px solid black',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    marginRight: '3px',
  },
  title: {
    display: 'inline-block',
    marginTop: '11px',
  },
}));

const constraintTypeMap = {
  syn: 'Synonymous',
  mis: 'Missense',
  lof: 'pLoF',
};

const upperBin6Map = {
  0: 'very high constraint',
  1: 'high constraint',
  2: 'medium constraint',
  3: 'low constraint',
  4: 'very low constraint',
  5: 'very low constraint',
};

function ConstraintAssessment({ ensemblId, symbol, upperBin6 }) {
  const classes = useStyles();
  const circles = [];

  for (let i = 0; i < 5; i++) {
    circles.push(
      <span
        key={i}
        className={5 - upperBin6 > i ? classes.filled : classes.notFilled}
      />
    );
  }

  return (
    <>
      <Tooltip
        title={`Binned representation of ${symbol} rank in the loss-function observed/expected upper bound fraction (LOEUF) distribution. Higher scored assessments correspond to strong selection against predicted loss-of-function (pLoF) variation in the particular gene.`}
        showHelpIcon
      >
        <span className={classes.title}>Constraint assessment</span>
      </Tooltip>

      <div>{circles}</div>
      <Link external to={`https://gnomad.broadinstitute.org/gene/${ensemblId}`}>
        {5 - upperBin6}/5 {upperBin6Map[upperBin6]}
      </Link>
    </>
  );
}

function getColumns(ensemblId, symbol) {
  return [
    {
      id: 'constraintType',
      label: 'Category',
      renderCell: ({ constraintType }) => {
        return constraintTypeMap[constraintType];
      },
    },
    {
      id: 'exp',
      label: 'Expected SNVs',
    },
    {
      id: 'obs',
      label: 'Observed SNVs',
    },
    {
      id: 'metrics',
      label: 'Constraint metrics',
      renderCell: ({ score, oe, oeLower, oeUpper, upperBin6 }) => {
        return (
          <>
            <div>Z = {score}</div>
            <div>
              o/e = {oe} ({oeLower} - {oeUpper})
            </div>
            {upperBin6 === null ? null : (
              <ConstraintAssessment
                ensemblId={ensemblId}
                symbol={symbol}
                upperBin6={upperBin6}
              />
            )}
          </>
        );
      },
    },
  ];
}

function GeneticConstraintTable({ ensemblId, symbol, geneticConstraint }) {
  return (
    <DataTable
      dataDownloader
      columns={getColumns(ensemblId, symbol)}
      rows={geneticConstraint}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default GeneticConstraintTable;

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
  oe: {
    marginBottom: '10px',
  },
}));

const constraintTypeMap = {
  syn: 'Synonymous',
  mis: 'Missense',
  lof: 'pLoF',
};

function getColumns(ensemblId, symbol, classes) {
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
      renderCell: ({
        constraintType,
        score,
        oe,
        oeLower,
        oeUpper,
        upperBin6,
      }) => {
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
            <div>Z = {score}</div>
            <div className={classes.oe}>
              o/e = {oe} ({oeLower} - {oeUpper})
            </div>
            <Tooltip
              title={`Binned representation of ${symbol} rank in the loss-function observed/expected upper bound fraction (LOEUF) distribution. Higher scored assessments correspond to strong selection against predicted loss-of-function (pLoF) variation in the particular gene.`}
              showHelpIcon
            >
              <span>Constraint assessment</span>
            </Tooltip>
            <div />
            {constraintType === 'lof' ? (
              <>
                <div>{circles}</div>
                <Link
                  external
                  to={`https://gnomad.broadinstitute.org/gene/${ensemblId}`}
                >
                  {symbol} constraint report
                </Link>
              </>
            ) : null}
          </>
        );
      },
    },
  ];
}

function GeneticConstraintTable({ ensemblId, symbol, geneticConstraint }) {
  const classes = useStyles();

  return (
    <DataTable
      dataDownloader
      columns={getColumns(ensemblId, symbol, classes)}
      rows={geneticConstraint}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default GeneticConstraintTable;

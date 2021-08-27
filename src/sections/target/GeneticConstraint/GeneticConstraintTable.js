import React from 'react';
import classNames from 'classnames';
import { Typography, makeStyles } from '@material-ui/core';

import Link from '../../../components/Link';

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
}));

const constraintTypeMap = {
  syn: 'Synonymous',
  mis: 'Missense',
  lof: 'pLoF',
};

function getColumns(symbol, classes) {
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
        if (constraintType === 'lof') {
          console.log({ upperBin6 });
        }

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
            <div>
              o/e = {oe} ({oeLower} - {oeUpper})
            </div>
            <div>Constraint assessment</div>
            <div />
            {constraintType === 'lof' ? (
              <>
                <div>{circles}</div>
                <Link external to="">
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

function GeneticConstraintTable({ symbol, geneticConstraint }) {
  const classes = useStyles();

  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      columns={getColumns(symbol, classes)}
      rows={geneticConstraint}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default GeneticConstraintTable;

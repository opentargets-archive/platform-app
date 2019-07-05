import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { PALETTE } from 'ot-ui';

const proteinLevel = level => {
  if (level === 0) {
    return 'Under expressed';
  }
  if (level === 1) {
    return 'Low';
  }
  if (level === 2) {
    return 'Medium';
  }
  return 'High';
};

const rnaValueToPercent = (maxRnaValue, value) => {
  return (value * 100) / maxRnaValue;
};

const proteinLevelToPercent = level => {
  return (level * 100) / 3;
};

const styles = theme => ({
  parentRow: {
    height: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: PALETTE.lightgrey,
    },
  },
  openedParentRow: {
    borderTop: `1px solid ${PALETTE.darkgrey}`,
    borderLeft: `1px solid ${PALETTE.darkgrey}`,
    borderRight: `1px solid ${PALETTE.darkgrey}`,
  },
  row: {
    height: '24px',
    backgroundColor: PALETTE.lightgrey,
    borderLeft: `1px solid ${PALETTE.darkgrey}`,
    borderRight: `1px solid ${PALETTE.darkgrey}`,
  },
  lastChildRow: {
    borderBottom: `1px solid ${PALETTE.darkgrey}`,
  },
  cell: {
    border: 'none',
    width: '230px',
  },
  parentTissueCell: {
    fontWeight: 'bold',
  },
  tissueCell: {
    textTransform: 'capitalize',
    paddingRight: '8px',
  },
  rnaCell: {
    paddingRight: '8px',
  },
  proteinCell: {
    paddingLeft: '8px',
  },
  barContainer: {
    height: '12px',
    backgroundColor: PALETTE.mediumgrey,
    fontSize: '10px',
    textAlign: 'center',
  },
});

let SummaryRow = class extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };

  render() {
    const { classes, parent, maxRnaValue } = this.props;
    const { collapsed } = this.state;

    return (
      <Fragment>
        <TableRow
          className={classNames(classes.parentRow, {
            [classes.openedParentRow]: !collapsed,
          })}
          onClick={this.handleClick}
        >
          <TableCell
            className={classNames(
              classes.cell,
              classes.parentTissueCell,
              classes.tissueCell
            )}
          >
            {parent.parentLabel}
          </TableCell>
          <TableCell className={classNames(classes.cell, classes.rnaCell)}>
            <div className={classes.barContainer}>
              {parent.maxRnaLevel >= 0 ? (
                <div
                  title={`${parent.maxRnaValue} (normalized count)`}
                  style={{
                    backgroundColor: PALETTE.darkblue,
                    width: `${rnaValueToPercent(
                      maxRnaValue,
                      parent.maxRnaValue
                    )}%`,
                    height: '12px',
                    float: 'right',
                  }}
                />
              ) : (
                'N/A'
              )}
            </div>
          </TableCell>
          <TableCell className={classNames(classes.cell, classes.proteinCell)}>
            <div className={classes.barContainer}>
              {parent.maxProteinLevel >= 0 ? (
                <div
                  title={proteinLevel(parent.maxProteinLevel)}
                  style={{
                    backgroundColor: PALETTE.darkblue,
                    width: `${proteinLevelToPercent(parent.maxProteinLevel)}%`,
                    height: '12px',
                  }}
                />
              ) : (
                'N/A'
              )}
            </div>
          </TableCell>
        </TableRow>
        {parent.tissues.map((tissue, index, tissues) => {
          const rnaPercent = rnaValueToPercent(maxRnaValue, tissue.rna.value);
          const proteinPercent = proteinLevelToPercent(tissue.protein.level);

          return (
            <TableRow
              className={classNames(classes.row, {
                [classes.lastChildRow]: index === tissues.length - 1,
              })}
              key={tissue.label}
              style={{ display: collapsed ? 'none' : 'table-row' }}
            >
              <TableCell
                className={classNames(classes.cell, classes.tissueCell)}
              >
                {tissue.label}
              </TableCell>
              <TableCell className={classNames(classes.cell, classes.rnaCell)}>
                <div className={classes.barContainer}>
                  {tissue.rna.level >= 0 ? (
                    <div
                      title={`${tissue.rna.value} (normalized count)`}
                      style={{
                        backgroundColor: PALETTE.blue,
                        width: `${rnaPercent}%`,
                        height: '12px',
                        float: 'right',
                      }}
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              </TableCell>
              <TableCell
                className={classNames(classes.cell, classes.proteinCell)}
              >
                <div className={classes.barContainer}>
                  {tissue.protein.level >= 0 ? (
                    <div
                      title={proteinLevel(tissue.protein.level)}
                      style={{
                        backgroundColor: PALETTE.blue,
                        width: `${proteinPercent}%`,
                        height: '12px',
                      }}
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </Fragment>
    );
  }
};

export default withStyles(styles)(SummaryRow);

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';

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

const getMaxRnaValue = tissues => {
  return _.maxBy(tissues, tissue => tissue.rna.value).rna.value;
};

const rowStyles = theme => ({
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
    height: '10px',
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
  naText: {
    textAlign: 'right',
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
          <TableCell className={classNames(classes.cell, classes.tissueCell)}>
            {parent.parentLabel}
          </TableCell>
          <TableCell className={classNames(classes.cell, classes.rnaCell)}>
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
              <div className={classes.naText}>N/A</div>
            )}
          </TableCell>
          <TableCell className={classNames(classes.cell, classes.proteinCell)}>
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
              <div>N/A</div>
            )}
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
                  <div className={classes.naText} title="No experimental data">
                    N/A
                  </div>
                )}
              </TableCell>
              <TableCell
                className={classNames(classes.cell, classes.proteinCell)}
              >
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
                  <div>N/A</div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </Fragment>
    );
  }
};

SummaryRow = withStyles(rowStyles)(SummaryRow);

const groupTissues = (tissues, groupBy) => {
  const groupedTissues = {};

  tissues.forEach(tissue => {
    const parentLabels = tissue[groupBy];
    parentLabels.forEach(label => {
      if (!groupedTissues[label]) {
        groupedTissues[label] = {
          parentLabel: label,
          tissues: [],
          maxRnaValue: Number.NEGATIVE_INFINITY,
          maxRnaLevel: Number.NEGATIVE_INFINITY,
          maxProteinLevel: Number.NEGATIVE_INFINITY,
        };
      }

      const parent = groupedTissues[label];

      parent.tissues.push(tissue);
      parent.maxRnaValue =
        parent.maxRnaValue < tissue.rna.value
          ? tissue.rna.value
          : parent.maxRnaValue;
      parent.maxRnaLevel =
        parent.maxRnaLevel < tissue.rna.level
          ? tissue.rna.level
          : parent.maxRnaLevel;
      parent.maxProteinLevel =
        parent.maxProteinLevel < tissue.protein.level
          ? tissue.protein.level
          : parent.maxProteinLevel;
    });
  });

  return Object.values(groupedTissues);
};

const tissueComparator = sortBy => {
  if (sortBy === 'rna') {
    return (a, b) => {
      return b.rna.value - a.rna.value;
    };
  }

  return (a, b) => {
    return b.protein.level - a.protein.level;
  };
};

const parentComparator = sortBy => {
  if (sortBy === 'rna') {
    return (a, b) => {
      return b.maxRnaValue - a.maxRnaValue;
    };
  }

  return (a, b) => {
    return b.maxProteinLevel - a.maxProteinLevel;
  };
};

const sort = (parents, sortBy) => {
  parents.forEach(parent => {
    parent.tissues.sort(tissueComparator(sortBy));
  });
  return parents.sort(parentComparator(sortBy));
};

const styles = () => ({
  inlineBlock: {
    display: 'inline-block',
  },
  table: {
    width: '678px',
  },
  headerCell: {
    textAlign: 'center',
  },
  cell: {
    width: '230px',
  },
  rnaCell: {
    paddingRight: '8px',
  },
  proteinCell: {
    paddingLeft: '8px',
  },
  row: {
    height: '10px',
  },
});

class SummaryTable extends Component {
  state = { groupBy: 'organs', sortBy: 'rna' };

  handleChange = (_, groupBy) => {
    if (groupBy) {
      this.setState({ groupBy });
    }
  };

  handleSort = sortBy => {
    this.setState({ sortBy });
  };

  render() {
    const { classes, tissues } = this.props;
    const { groupBy, sortBy } = this.state;

    const maxRnaValue = getMaxRnaValue(tissues);
    const parents = sort(groupTissues(tissues, groupBy), sortBy);

    return (
      <Fragment>
        <Typography className={classes.inlineBlock}>Group by </Typography>
        <ToggleButtonGroup
          className={classes.inlineBlock}
          value={groupBy}
          exclusive
          onChange={this.handleChange}
        >
          <ToggleButton value="organs">Organs</ToggleButton>
          <ToggleButton value="anatomicalSystems">
            Anatomical Systems
          </ToggleButton>
        </ToggleButtonGroup>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                className={classNames(classes.headerCell, classes.tissueCell)}
              >
                Tissue
              </TableCell>
              <TableCell
                className={classes.headerCell}
                onClick={() => this.handleSort('rna')}
              >
                RNA
              </TableCell>
              <TableCell
                className={classes.headerCell}
                onClick={() => this.handleSort('protein')}
              >
                Protein
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell className={classes.tissueCell} />
              <TableCell className={classes.rnaCell}>
                <Grid container justify="space-between">
                  <Grid item>High</Grid>
                  <Grid item>Low</Grid>
                </Grid>
              </TableCell>
              <TableCell className={classes.proteinCell}>
                <Grid container justify="space-between">
                  <Grid item>Low</Grid>
                  <Grid item>High</Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parents.map(parent => {
              return (
                <SummaryRow
                  key={parent.parentLabel}
                  maxRnaValue={maxRnaValue}
                  parent={parent}
                />
              );
            })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTable);

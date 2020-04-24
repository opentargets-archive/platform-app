import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';

import SummaryRow from './SummaryRow';

const getMaxRnaValue = tissues => {
  return _.maxBy(tissues, tissue => tissue.rna.value).rna.value;
};

// function that transforms tissue data into an array of objects
// where each object has the following shape and where tissues is
// an array of tissues that belong to the parent category
// {
//   parentLabel: string
//   tissues: []
//   maxRnaValue: number
//   maxRnaLevel: number
//   maxProteinLevel: number
// }
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
    marginRight: '7px',
  },
  groupBy: {
    marginBottom: '20px',
    marginTop: '40px',
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
  highLow: {
    border: 'none',
  },
  row: {
    height: '24px',
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
        <Grid
          className={classes.groupBy}
          container
          justify="center"
          alignItems="center"
        >
          <Typography className={classes.inlineBlock}>Group by</Typography>
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
        </Grid>
        <Grid container justify="center">
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell className={classes.headerCell}>Tissue</TableCell>
                <TableCell
                  className={classes.headerCell}
                  onClick={() => this.handleSort('rna')}
                >
                  <TableSortLabel active={sortBy === 'rna'}>RNA</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.headerCell}
                  onClick={() => this.handleSort('protein')}
                >
                  <TableSortLabel active={sortBy === 'protein'}>
                    Protein
                  </TableSortLabel>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell className={classes.highLow} />
                <TableCell
                  className={classNames(classes.highLow, classes.rnaCell)}
                >
                  <Grid container justify="space-between">
                    <Grid item>High</Grid>
                    <Grid item>Low</Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  className={classNames(classes.highLow, classes.proteinCell)}
                >
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
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTable);

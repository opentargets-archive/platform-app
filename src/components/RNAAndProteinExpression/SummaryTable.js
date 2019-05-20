import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

const styles = () => ({
  inlineBlock: {
    display: 'inline-block',
  },
});

const getTissuesByGroup = (groupBy, parentLabel, tissues) => {
  const filteredTissues = [];

  tissues.forEach(tissue => {
    if (tissue[groupBy].includes(parentLabel)) {
      filteredTissues.push(tissue);
    }
  });

  return filteredTissues;
};

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

class SummaryRow extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };

  render() {
    const { parent, maxRnaValue } = this.props;
    const { collapsed } = this.state;

    return (
      <Fragment>
        <tr
          style={{ backgroundColor: 'papayawhip' }}
          onClick={this.handleClick}
        >
          <td>{parent.parentLabel}</td>
          <td>
            {parent.maxRnaLevel >= 0 ? (
              <div
                title={`${parent.maxRnaValue} (normalized count)`}
                style={{
                  backgroundColor: 'blue',
                  width: `${rnaValueToPercent(
                    maxRnaValue,
                    parent.maxRnaValue
                  )}%`,
                  height: '12px',
                  float: 'right',
                }}
              />
            ) : (
              <div>N/A</div>
            )}
          </td>
          <td>
            {parent.maxProteinLevel >= 0 ? (
              <div
                title={proteinLevel(parent.maxProteinLevel)}
                style={{
                  backgroundColor: 'blue',
                  width: `${proteinLevelToPercent(parent.maxProteinLevel)}%`,
                  height: '12px',
                }}
              />
            ) : (
              <div>N/A</div>
            )}
          </td>
        </tr>
        {parent.tissues.map(tissue => {
          const rnaPercent = rnaValueToPercent(maxRnaValue, tissue.rna.value);
          const proteinPercent = proteinLevelToPercent(tissue.protein.level);

          return (
            <tr
              key={tissue.label}
              style={{ display: collapsed ? 'none' : 'table-row' }}
            >
              <td>{tissue.label}</td>
              <td>
                {tissue.rna.level >= 0 ? (
                  <div
                    title={`${tissue.rna.value} (normalized count)`}
                    style={{
                      backgroundColor: 'blue',
                      width: `${rnaPercent}%`,
                      height: '12px',
                      float: 'right',
                    }}
                  />
                ) : (
                  <div title="No experimental data">N/A</div>
                )}
              </td>
              <td>
                {tissue.protein.level >= 0 ? (
                  <div
                    title={proteinLevel(tissue.protein.level)}
                    style={{
                      backgroundColor: 'blue',
                      width: `${proteinPercent}%`,
                      height: '12px',
                    }}
                  />
                ) : (
                  <div>N/A</div>
                )}
              </td>
            </tr>
          );
        })}
      </Fragment>
    );
  }
}

const groupTissues = (tissues, groupBy) => {
  const groupedTissues = {};

  tissues.forEach(tissue => {
    const parentLabels = tissue[groupBy];
    parentLabels.forEach(parentLabel => {
      if (!groupedTissues[parentLabel]) {
        groupedTissues[parentLabel] = {
          parentLabel: parentLabel,
          tissues: [],
          maxRnaValue: Number.NEGATIVE_INFINITY,
          maxRnaLevel: Number.NEGATIVE_INFINITY,
          maxProteinLevel: Number.NEGATIVE_INFINITY,
        };
      }

      groupedTissues[parentLabel].tissues.push(tissue);
      groupedTissues[parentLabel].maxRnaValue =
        groupedTissues[parentLabel].maxRnaValue < tissue.rna.value
          ? tissue.rna.value
          : groupedTissues[parentLabel].maxRnaValue;
      groupedTissues[parentLabel].maxRnaLevel =
        groupedTissues[parentLabel].maxRnaLevel < tissue.rna.level
          ? tissue.rna.level
          : groupedTissues[parentLabel].maxRnaLevel;
      groupedTissues[parentLabel].maxProteinLevel =
        groupedTissues[parentLabel].maxProteinLevel < tissue.protein.level
          ? tissue.protein.level
          : groupedTissues[parentLabel].maxProteinLevel;
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
        <table>
          <thead>
            <tr>
              <td>Tissue</td>
              <td onClick={() => this.handleSort('rna')}>RNA</td>
              <td onClick={() => this.handleSort('protein')}>Protein</td>
            </tr>
            <tr>
              <td />
              <td>High Low</td>
              <td>Low High</td>
            </tr>
          </thead>
          <tbody>
            {parents.map(parent => {
              return (
                <SummaryRow
                  key={parent.parentLabel}
                  maxRnaValue={maxRnaValue}
                  parent={parent}
                />
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTable);

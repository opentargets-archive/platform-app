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

const getRowMaxRnaValue = tissues => {
  return _.maxBy(tissues, tissue => tissue.rna.value).rna.value;
};

const getRowMaxProteinLevel = tissues => {
  return _.maxBy(tissues, tissue => tissue.protein.level).protein.level;
};

class SummaryRow extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };

  render() {
    const { parentLabel, maxRnaValue, tissues, groupBy } = this.props;
    const { collapsed } = this.state;

    const filteredTissues = getTissuesByGroup(groupBy, parentLabel, tissues);
    const rowMaxRnaValue = getRowMaxRnaValue(filteredTissues);
    const rowMaxProteinLevel = getRowMaxProteinLevel(filteredTissues);

    return (
      <Fragment>
        <tr
          style={{ backgroundColor: 'papayawhip' }}
          onClick={this.handleClick}
        >
          <td>{parentLabel}</td>
          <td>
            <div
              title={`${rowMaxRnaValue} (normalized count)`}
              style={{
                backgroundColor: 'blue',
                width: `${rnaValueToPercent(maxRnaValue, rowMaxRnaValue)}%`,
                height: '12px',
                float: 'right',
              }}
            />
          </td>
          <td>
            <div
              title={proteinLevel(rowMaxProteinLevel)}
              style={{
                backgroundColor: 'blue',
                width: `${proteinLevelToPercent(rowMaxProteinLevel)}%`,
                height: '12px',
              }}
            />
          </td>
        </tr>
        {filteredTissues.map(tissue => {
          const rnaPercent = rnaValueToPercent(maxRnaValue, tissue.rna.value);
          const proteinPercent = proteinLevelToPercent(tissue.protein.level);

          return (
            <tr
              key={tissue.label}
              style={{ display: collapsed ? 'none' : 'table-row' }}
            >
              <td>{tissue.label}</td>
              <td>
                <div
                  title={`${tissue.rna.value} (normalized count)`}
                  style={{
                    backgroundColor: 'blue',
                    width: `${rnaPercent}%`,
                    height: '12px',
                    float: 'right',
                  }}
                />
              </td>
              <td>
                <div
                  title={proteinLevel(tissue.protein.level)}
                  style={{
                    backgroundColor: 'blue',
                    width: `${proteinPercent}%`,
                    height: '12px',
                  }}
                />
              </td>
            </tr>
          );
        })}
      </Fragment>
    );
  }
}

const getParentLabels = (groupBy, tissues) => {
  const labelSet = [];

  tissues.forEach(tissue => {
    const labels = tissue[groupBy];
    labels.forEach(label => {
      labelSet.push(label);
    });
  });

  return _.uniq(labelSet);
};

class SummaryTable extends Component {
  state = { groupBy: 'organs' };

  handleChange = (_, groupBy) => {
    if (groupBy) {
      this.setState({ groupBy });
    }
  };

  render() {
    const { classes, tissues } = this.props;
    const { groupBy } = this.state;

    const parentLabels = getParentLabels(groupBy, tissues);
    const maxRnaValue = _.maxBy(tissues, tissue => tissue.rna.value).rna.value;

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
              <td>RNA</td>
              <td>Protein</td>
            </tr>
            <tr>
              <td />
              <td>High Low</td>
              <td>High Low</td>
            </tr>
          </thead>
          <tbody>
            {parentLabels.map(parentLabel => {
              return (
                <SummaryRow
                  key={parentLabel}
                  parentLabel={parentLabel}
                  maxRnaValue={maxRnaValue}
                  tissues={tissues}
                  groupBy={groupBy}
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

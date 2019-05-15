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

const getOrgans = data => {
  const organSet = [];
  data.forEach(({ organs }) => {
    organs.forEach(organ => {
      organSet.push(organ);
    });
  });
  return _.uniq(organSet);
};

const getLabelsByOrgan = (data, organ) => {
  const labels = [];
  data.forEach(d => {
    if (d.organs.includes(organ)) {
      labels.push(d.label);
    }
  });
  return labels;
};

class OrganRow extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };

  render() {
    const { organ, data } = this.props;
    const { collapsed } = this.state;

    const labels = getLabelsByOrgan(data, organ);

    return (
      <Fragment>
        <tr
          key={organ}
          style={{ backgroundColor: 'papayawhip' }}
          onClick={this.handleClick}
        >
          <td>{organ}</td>
        </tr>
        {labels.map(label => (
          <tr key={label} style={{ display: collapsed ? 'none' : 'table-row' }}>
            <td>{label}</td>
          </tr>
        ))}
      </Fragment>
    );
  }
}

class SummaryTable extends Component {
  state = { groupBy: 'organs' };

  handleChange = (_, groupBy) => {
    this.setState({ groupBy });
  };

  render() {
    const { classes, data } = this.props;
    const { groupBy } = this.state;

    const organs = getOrgans(data);

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
          <ToggleButton value="systems">Anatomical Systems</ToggleButton>
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
            {organs.map(organ => {
              return <OrganRow key={organ} organ={organ} data={data} />;
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTable);

import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

const styles = () => ({
  inlineBlock: {
    display: 'inline-block',
  },
});

class SummaryTable extends Component {
  state = { groupBy: 'organs' };

  render() {
    const { classes, data } = this.props;
    const { groupBy } = this.state;

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
          <tbody />
        </table>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SummaryTable);

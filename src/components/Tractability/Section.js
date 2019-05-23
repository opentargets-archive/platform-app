import React, { Fragment } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { PALETTE } from 'ot-ui';

const styles = () => ({
  table: {
    borderCollapse: 'collapse',
    marginBottom: '8px',
  },
  cell: {
    color: PALETTE.darkgrey,
    border: '1px solid black',
  },
  purpleCell: {
    backgroundColor: PALETTE.purple,
    color: 'white',
  },
});

const Section = ({ classes, ensgId, data }) => {
  const { antibody, smallMolecule } = data;
  return (
    <Fragment>
      <Typography variant="h6">Small molecule</Typography>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Clinical precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="2">
              <Typography variant="subtitle2">Discovery precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Predicted tractable</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {smallMolecule.map(m => {
              return (
                <td
                  className={classNames(classes.cell, {
                    [classes.purpleCell]: m.value,
                  })}
                  key={m.chemblBucket}
                >
                  <Typography color="inherit" variant="caption">
                    {m.description}
                  </Typography>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <Typography variant="h6">Antibody</Typography>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Clinical precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="2">
              <Typography variant="subtitle2">
                Predicted tractable - high confidence
              </Typography>
            </th>
            <th className={classes.cell} colSpan="4">
              <Typography variant="subtitle2">
                Predicted tractable - medium to low confidence
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {antibody.map(ab => {
              return (
                <td
                  className={classNames(classes.cell, {
                    [classes.purpleCell]: ab.value,
                  })}
                  key={ab.chemblBucket}
                >
                  <Typography color="inherit" variant="caption">
                    {ab.description}
                  </Typography>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default withStyles(styles)(Section);

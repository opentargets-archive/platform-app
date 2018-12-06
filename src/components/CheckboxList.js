import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  checkboxListCellNoData: {
    border: '1px solid #E2DFDF',
    color: '#E2DFDF',
  },
  checkboxListCellLabel: {
    padding: '0 4px',
  },
  checkboxListCell: {
    border: '1px solid #5A5F5F',
    color: '#5A5F5F',
  },
  checkboxListCellValue: {
    width: '1.5rem',
    height: '1.5rem',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  checkboxListCellValueActive: {
    backgroundColor: '#7B196A',
    color: 'white',
  },
  checkboxListIcon: {
    fontSize: '1rem',
  },
  checkboxListTable: {
    borderSpacing: 0,
    width: '100%',
  },
});

const CheckboxList = ({ classes, items }) => {
  const noData = !items.some(d => d.value);
  return (
    <table className={classes.checkboxListTable}>
      <tbody>
        {items.map(d => (
          <tr key={d.label}>
            <td
              className={classNames(classes.checkboxListCellValue, {
                [classes.checkboxListCellNoData]: noData,
                [classes.checkboxListCellValueActive]: !noData && d.value,
              })}
            >
              <Icon
                color="inherit"
                className={classNames('fas', classes.checkboxListIcon, {
                  'fa-times': !d.value,
                  'fa-check': d.value,
                })}
              />
            </td>
            <td
              className={classNames(classes.checkboxListCellLabel, {
                [classes.checkboxListCellNoData]: noData,
                [classes.checkboxListCell]: !noData,
              })}
            >
              <Typography color="inherit">{d.label}</Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default withStyles(styles)(CheckboxList);

import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  table: {
    borderSpacing: 0,
    borderCollapse: 'collapse',
    width: '100%',
  },

  cellAny: {
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  cellNoData: {
    borderColor: '#E2DFDF',
    color: '#E2DFDF',
  },
  cellValue: {
    width: '1.5rem',
    height: '1.5rem',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  cellValueUnchecked: {
    borderColor: '#5A5F5F',
    color: '#E2DFDF',
  },
  cellValueChecked: {
    borderColor: '#5A5F5F',
    backgroundColor: '#7B196A',
    color: 'white',
  },
  cellLabel: {
    padding: '0 4px',
    borderLeftWidth: 0,
  },
  cellLabelUnchecked: {
    borderColor: '#5A5F5F',
    color: '#E2DFDF',
  },
  cellLabelChecked: {
    borderColor: '#5A5F5F',
    color: '#5A5F5F',
  },
  icon: {
    fontSize: '0.8rem',
  },

  // checkboxListCellNoData: {
  //   border: '1px solid #E2DFDF',
  //   color: '#E2DFDF',
  // },
  // checkboxListCellLabel: {
  //   padding: '0 4px',
  // },
  // checkboxListCell: {
  //   border: '1px solid #5A5F5F',
  //   color: '#5A5F5F',
  // },
  // checkboxListCellValue: {
  //   width: '1.5rem',
  //   height: '1.5rem',
  //   textAlign: 'center',
  //   verticalAlign: 'middle',
  // },
  // checkboxListCellValueActive: {
  //   backgroundColor: '#7B196A',
  //   color: 'white',
  // },
  // checkboxListIcon: {
  //   fontSize: '1rem',
  // },
  // checkboxListTable: {
  //   borderSpacing: 0,
  //   width: '100%',
  // },
});

const CheckboxList = ({ classes, items }) => {
  const noData = !items.some(d => d.value);
  return (
    <table className={classes.table}>
      <tbody>
        {items.map(d => (
          <tr key={d.label}>
            <td
              className={classNames(classes.cellAny, classes.cellValue, {
                [classes.cellNoData]: noData,
                [classes.cellValueChecked]: !noData && d.value,
                [classes.cellValueUnchecked]: !noData && !d.value,
              })}
            >
              <Icon
                color="inherit"
                className={classNames('fas', classes.icon, {
                  'fa-times': !d.value,
                  'fa-check': d.value,
                })}
              />
            </td>
            <td
              className={classNames(classes.cellAny, classes.cellLabel, {
                [classes.cellNoData]: noData,
                [classes.cellLabelChecked]: !noData && d.value,
                [classes.cellLabelUnchecked]: !noData && !d.value,
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

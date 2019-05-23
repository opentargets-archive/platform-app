import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { PALETTE } from 'ot-ui';

const styles = theme => ({
  table: {
    borderSpacing: 0,
    borderCollapse: 'collapse',
    width: '100%',
  },

  cellAny: {
    borderColor: PALETTE.darkgrey,
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  cellNoData: {
    borderColor: PALETTE.lightgrey,
    color: PALETTE.lightgrey,
  },
  cellValue: {
    width: '1.5rem',
    height: '1.5rem',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  cellValueOne: {
    borderColor: PALETTE.darkgrey,
    backgroundColor: PALETTE.green,
    color: 'white',
  },
  cellValueTwo: {
    borderColor: PALETTE.darkgrey,
    backgroundColor: PALETTE.red,
    color: 'white',
  },
  cellLabel: {
    padding: '0 4px',
    borderLeftWidth: 0,
  },
  cellLabelUnchecked: {
    borderColor: PALETTE.darkgrey,
    color: PALETTE.lightgrey,
  },
  cellLabelChecked: {
    borderColor: PALETTE.darkgrey,
    color: PALETTE.darkgrey,
  },
  icon: {
    fontSize: '0.8rem',
  },
  noWrap: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '1px',
  },
  cellSm: {
    fontSize: '0.8rem',
  },
  cellValueSm: {
    width: '1.2rem',
    height: '1.2rem',
  },
  legendValue: {
    padding: '0.5rem 0.3rem',
  },
  legendValueOne: {
    color: PALETTE.green,
  },
  legendValueTwo: {
    color: PALETTE.red,
  },
});

/**
 * Similar to a CheckboxList, the DoubleCheckboxList creates a table with two checks in the first 2 cols.
 * Col 1 is rendered with a green checkbox cell, col 2 with a red one.
 */
const DoubleCheckboxList = ({ classes, items, variant }) => {
  const noData = !items.some(d => d.valueOne || d.valueTwo);

  return (
    <table className={classes.table}>
      <tbody>
        {items.map(d => (
          <tr key={d.label}>
            <td
              className={classNames(classes.cellAny, classes.cellValue, {
                [classes.cellNoData]: noData,
                [classes.cellValueOne]: !noData && d.valueOne,
                [classes.cellValueSm]: variant && variant === 'sm',
              })}
            >
              <Icon
                color="inherit"
                className={classNames('fas', classes.icon, {
                  'fa-check': d.valueOne,
                })}
              />
            </td>

            <td
              className={classNames(classes.cellAny, classes.cellValue, {
                [classes.cellNoData]: noData,
                [classes.cellValueTwo]: !noData && d.valueTwo,
                [classes.cellValueSm]: variant && variant === 'sm',
              })}
            >
              <Icon
                color="inherit"
                className={classNames('fas', classes.icon, {
                  'fa-check': d.valueTwo,
                })}
              />
            </td>

            <td
              className={classNames(classes.cellAny, classes.cellLabel, {
                [classes.cellNoData]: noData,
                [classes.cellLabelChecked]:
                  !noData && (d.valueOne || d.valueTwo),
                [classes.cellLabelUnchecked]:
                  !noData && !d.valueOne && !d.valueTwo,
                [classes.noWrap]: variant && variant === 'sm',
                [classes.cellSm]: variant && variant === 'sm',
              })}
              title={d.label}
            >
              {d.label}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * Separate legend for double checkbox list.
 * Takes the labels for the 2 columns and a disabled flag
 */
const legend = ({ classes, label1, label2, disabled }) => {
  return (
    <Typography
      variant="caption"
      className={classNames({
        [classes.cellNoData]: disabled,
      })}
    >
      Legend:
      <span
        className={classNames(classes.legendValue, 'fas', 'fa-check-square', {
          [classes.legendValueOne]: !disabled,
          [classes.noData]: disabled,
        })}
      />
      {label1}
      <span
        className={classNames(classes.legendValue, 'fas', 'fa-check-square', {
          [classes.legendValueTwo]: !disabled,
          [classes.noData]: disabled,
        })}
      />
      {label2}
    </Typography>
  );
};

const DoubleCheckboxListLegend = withStyles(styles)(legend);

export default withStyles(styles)(DoubleCheckboxList);
export { DoubleCheckboxListLegend };

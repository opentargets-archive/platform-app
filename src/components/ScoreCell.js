import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  scoreCell: {
    width: '100%',
    height: '1rem',
  },
  scoreCell0: {
    backgroundColor: '#FFFFFF',
  },
  scoreCell1: {
    backgroundColor: '#CBDCE9',
  },
  scoreCell2: {
    backgroundColor: '#98B9D6',
  },
  scoreCell3: {
    backgroundColor: '#6697C2',
  },
  scoreCell4: {
    backgroundColor: '#3375AC',
  },
  scoreCell5: {
    backgroundColor: '#015299',
  },
});

const ScoreCell = ({ classes, score }) => {
  return (
    <div
      className={classNames(
        classes.scoreCell,
        classes[`scoreCell${Math.ceil(score * 5.0)}`]
      )}
    />
  );
};

export default withStyles(styles)(ScoreCell);

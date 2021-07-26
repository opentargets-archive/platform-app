import React from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core';
import Link from './Link';
import { colorRange } from '../constants';

const color = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(colorRange);

const useStyles = makeStyles({
  root: {
    display: 'block',
    height: '20px',
    border: '1px solid #eeefef',
  },
});

/**
 * Creates an element to display values in a heatmap.
 * It generates a <spa> element with backgroud color and a link to an evidence page.
 * Example:
 *  <AssocCell score={score} ensemblId={ensemblId} efoId={efoId} />
 *
 * @param {score} Values 0-1
 * @param {ensemblId} String
 * @param {efoId} String
 */
function AssocCell({ score, ensemblId, efoId }) {
  const classes = useStyles();
  return (
    <Link to={`/evidence/${ensemblId}/${efoId}`}>
      <span
        className={classes.root}
        title={score ? `Score: ${score.toFixed(2)}` : 'No data'}
        style={{ backgroundColor: color(score) }}
      />
    </Link>
  );
}

export default AssocCell;

import React from 'react';
import * as d3 from 'd3';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  legendLabel: {
    marginLeft: 10,
    marginRight: 30,
  },
});

const ClassicAssociationsLegend = ({
  classes,
  theme,
  scaleAssociation,
  scaleModality,
}) => {
  const legendWidth = 100;
  const legendHeight = 20;
  const tickWidth = legendWidth / 100;
  const ticks = d3
    .range(0, 1, tickWidth / legendWidth)
    .map((d) => ({ value: d, x: d * legendWidth, width: tickWidth }));
  return (
    <Grid container justify="flex-start">
      <Grid item>
        <svg width={legendWidth} height={legendHeight}>
          <g>
            {ticks.map((d, i) => (
              <rect
                key={i}
                x={d.x}
                y={0}
                width={d.width}
                height={legendHeight}
                fill={scaleAssociation(d.value)}
              />
            ))}
            <rect
              x={0}
              y={0}
              width={legendWidth}
              height={legendHeight}
              fill="none"
              strokeWidth={2}
              stroke={theme.palette.grey[300]}
            />
          </g>
        </svg>
      </Grid>
      <Grid item className={classes.legendLabel}>
        <Typography inline variant="caption">
          Efficacy
        </Typography>
      </Grid>

      {scaleModality ? (
        <React.Fragment>
          <Grid item>
            <svg width={legendWidth} height={legendHeight}>
              <g>
                {ticks.map((d, i) => (
                  <rect
                    key={i}
                    x={d.x}
                    y={0}
                    width={d.width}
                    height={legendHeight}
                    fill={scaleModality(d.value)}
                  />
                ))}
                <rect
                  x={0}
                  y={0}
                  width={legendWidth}
                  height={legendHeight}
                  fill="none"
                  strokeWidth={2}
                  stroke={theme.palette.grey[300]}
                />
              </g>
            </svg>
          </Grid>
          <Grid item className={classes.legendLabel}>
            <Typography inline variant="caption">
              Tractability
            </Typography>
          </Grid>
        </React.Fragment>
      ) : null}

      <Grid item>
        <svg width={legendHeight} height={legendHeight}>
          <g>
            <rect
              x={0}
              y={0}
              width={legendHeight}
              height={legendHeight}
              fill="none"
              strokeWidth={2}
              stroke={theme.palette.grey[300]}
            />
          </g>
        </svg>
      </Grid>
      <Grid item className={classes.legendLabel}>
        <Typography inline variant="caption">
          No data
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(
  ClassicAssociationsLegend
);

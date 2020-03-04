import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { commaSeparate } from 'ot-ui';

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.grey[300],
  },
});

const Stats = ({ classes }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    fetch('https://platform-api.opentargets.io/v3/platform/public/utils/stats')
      .then(res => res.json())
      .then(data => {
        if (isCurrent) {
          const numDataSources = Object.values(
            data.associations.datatypes
          ).reduce((acc, current) => {
            return acc + Object.keys(current.datasources).length;
          }, 0);

          setStats({
            numTargets: data.targets.total,
            numDiseases: data.diseases.total,
            numAssociations: data.associations.total,
            numDataSources,
          });
        }
      });

    return () => (isCurrent = false);
  }, []);

  return (
    <Grid className={classes.container} container justify="center">
      <Grid item md={6}>
        <Typography variant="h5" align="center">
          Platform Stats
        </Typography>
        <Typography align="center">Data last updated September 2019</Typography>
        {stats && (
          <Grid container justify="space-around">
            <Grid item>
              <Typography>{commaSeparate(stats.numTargets)} targets</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {commaSeparate(stats.numDiseases)} diseases
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {commaSeparate(stats.numAssociations)} associations
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {commaSeparate(stats.numDataSources)} data sources
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Stats);

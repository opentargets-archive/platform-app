import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import LongText from '../../components/LongText';

const summaryStyles = theme => ({
  description: {
    margin: '10px 0',
  },
  synonymText: {
    display: 'inline-block',
  },
  synonym: {
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '10px',
    marginRight: '5px',
    marginBottom: '4px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
});

const TargetDescriptionAndSynonyms = ({ classes, synonyms, description }) => (
  <Grid className={classes.description} container>
    <Grid item xs={12} md={5}>
      <Typography className={classes.synonymText} variant="subtitle2">
        Description
      </Typography>
      <br />
      <Typography variant="body2">
        {description ? (
          <LongText lineLimit={3}>{description}</LongText>
        ) : (
          'No description available.'
        )}
      </Typography>
    </Grid>
    <Hidden smDown>
      <Grid item md={1} />
    </Hidden>
    <Grid item xs={12} md={5}>
      <Typography className={classes.synonymText} variant="subtitle2">
        Synonyms
      </Typography>
      <br />
      {synonyms.map(synonym => (
        <Typography key={synonym} className={classes.synonym} variant="caption">
          {synonym}
        </Typography>
      ))}
    </Grid>
    <Hidden smDown>
      <Grid item md={1} />
    </Hidden>
  </Grid>
);

export default withStyles(summaryStyles)(TargetDescriptionAndSynonyms);

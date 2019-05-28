import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import LongText from './LongText';

const summaryStyles = theme => ({
  description: {
    margin: '30px 0',
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

// const TargetDescriptionAndSynonyms = ({ classes, synonyms, description }) => (
//   <Fragment>
//     <Grid className={classes.description} container>
//       <Typography variant="body2">
//         <LongText lineLimit={3}>{description}</LongText>
//       </Typography>
//     </Grid>
//     <Grid container>
//       <Grid item md={1}>
//         <Typography className={classes.synonymText} variant="subtitle2">
//           Synonyms:
//         </Typography>
//       </Grid>
//       <Grid item md={10}>
//         {synonyms.map(synonym => {
//           return (
//             <Typography
//               key={synonym}
//               className={classes.synonym}
//               variant="caption"
//             >
//               {synonym}
//             </Typography>
//           );
//         })}
//       </Grid>
//     </Grid>
//   </Fragment>
// );

const TargetDescriptionAndSynonyms = ({ classes, synonyms, description }) => (
  <Grid className={classes.description} container>
    <Grid item xs={12} md={6}>
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
    <Grid item xs={12} md={6}>
      <Typography className={classes.synonymText} variant="subtitle2">
        Synonyms
      </Typography>
      <br />
      {synonyms.map(synonym => {
        return (
          <Typography
            key={synonym}
            className={classes.synonym}
            variant="caption"
          >
            {synonym}
          </Typography>
        );
      })}
    </Grid>
  </Grid>
);

export default withStyles(summaryStyles)(TargetDescriptionAndSynonyms);

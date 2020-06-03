import React, { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import LongText from '../common/LongText';
import DiseaseIcon from '../../icons/DiseaseIcon';

const styles = () => ({
  link: {
    display: 'block',
  },
  subtitle: {
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'bottom',
  },
});

const DiseaseDetail = ({ classes, data }) => {
  const {
    id,
    name,
    description,
    associationsOnTheFly: { rows },
    therapeuticAreas,
  } = data;
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/disease/${id}`}>{name}</Link>
      </Typography>
      <Typography color="primary">
        <DiseaseIcon className={classes.icon} /> Disease or phenotype
      </Typography>
      <LongText lineLimit={4}>{description}</LongText>
      {/* temporarily hide top associated targets */}
      {/* rows.length > 0 */ false && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Top associated targets
          </Typography>
          {rows.map(({ id }) => (
            <Link key={id} to={`/target/${id}`}>
              {id}
            </Link>
          ))}
        </>
      )}
      {therapeuticAreas.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Therapeutic areas
          </Typography>
          {therapeuticAreas.map(area => (
            <Link
              key={area.id}
              className={classes.link}
              to={`/disease/${area.id}`}
            >
              {area.name}
            </Link>
          ))}
        </>
      )}
    </CardContent>
  );
};

export default withStyles(styles)(DiseaseDetail);

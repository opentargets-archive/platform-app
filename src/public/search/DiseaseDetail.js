import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import LongText from '../common/LongText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

const styles = () => ({
  link: {
    display: 'block',
  },
  subtitle: {
    fontWeight: 500,
  },
});

const DiseaseDetail = ({ classes, data }) => {
  const { id, name, description, therapeuticAreas } = data;
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/disease/${id}`}>{name}</Link>
      </Typography>
      <Typography color="primary">
        <FontAwesomeIcon icon={faStethoscope} size="md" /> Disease or phenotype
      </Typography>
      <LongText lineLimit={4}>{description}</LongText>
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

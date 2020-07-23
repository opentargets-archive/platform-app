import React from 'react';
import { CardContent, Typography, withStyles } from '@material-ui/core';

import { Link } from 'ot-ui';

import LongText from '../../components/LongText';
import DiseaseIcon from '../../assets/DiseaseIcon';

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
  const { id, name, description, therapeuticAreas } = data;
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/disease/${id}`}>{name}</Link>
      </Typography>
      <Typography color="primary">
        <DiseaseIcon className={classes.icon} /> Disease or phenotype
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

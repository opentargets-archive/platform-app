import React, { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';
import LongText from '../common/LongText';

const DiseaseDetail = ({ data }) => {
  const {
    name,
    description,
    associationsOnTheFly: { rows },
    therapeuticAreas,
  } = data;
  return (
    <CardContent>
      <Typography>{name}</Typography>
      <LongText lineLimit="4">{description}</LongText>
      <Typography variant="h6">Top associated targets</Typography>
      {rows.map(({ id }) => {
        return (
          <Fragment key={id}>
            <Link to={`/target/${id}`}>{id}</Link>{' '}
          </Fragment>
        );
      })}
      <Typography variant="h6">Therapeutic areas</Typography>
      {therapeuticAreas.map(area => {
        return (
          <Fragment key={area.id}>
            <Link to={`/disease/${area.id}`}>{area.name}</Link>{' '}
          </Fragment>
        );
      })}
    </CardContent>
  );
};

export default DiseaseDetail;
